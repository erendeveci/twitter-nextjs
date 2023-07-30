import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const { currentUser } = await serverAuth();

    const { body } = await request.json();

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const userId = await request.url.split("posts?userId=")[1];
    let posts;
    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify(error), {
      status: 402,
    });
  }
}

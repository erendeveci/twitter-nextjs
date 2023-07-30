import prisma from "@/libs/prismadb";

export async function GET(request: Request, res: Response) {
  try {
    const postId = await request.url.split("posts/")[1];

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify(error), { status: 404 });
  }
}

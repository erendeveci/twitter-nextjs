import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextApiRequest } from "next";

export async function POST(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    const postId = await request.url.split("comments/")[1];
    const { body } = await request.json();
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied to your tweet!",
            userId: post.userId,
          },
        });
        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    return new Response(
      JSON.stringify({ message: "Comment created", comment }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 400 });
  }
}

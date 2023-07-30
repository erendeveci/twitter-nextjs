import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const userId = await req.url.split("users/")[1];

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });
    return new Response(
      JSON.stringify({
        ...existingUser,
        followersCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify(error), { status: 404 });
  }
}

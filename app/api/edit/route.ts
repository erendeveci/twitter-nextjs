import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export async function PATCH(req: Request, res: Response) {
  try {
    const { currentUser } = await serverAuth();

    const body = await req.json();
    const { name, username, bio, profileImage, coverImage } = body;

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify(error), { status: 404 });
  }
}

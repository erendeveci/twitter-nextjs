import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

interface RequestBody {
  email: string;
  username: string;
  name: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, username, name, password }: RequestBody =
      await request.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 400 });
  }
}

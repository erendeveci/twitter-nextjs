import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

import prisma from "@/libs/prismadb";

export default async function serverAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma?.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
}

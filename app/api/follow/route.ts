import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function POST(request: Request, response: Response) {
  try {
    const { userId } = await request.json();
    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    updatedFollowingIds.push(userId);

    try {
      await prisma.notification.create({
        data: {
          body: "Someone followed you!",
          userId,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 400 });
  }
}

export async function DELETE(request: Request, response: Response) {
  try {
    const { userId } = await request.json();
    const { currentUser } = await serverAuth();
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];
    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify(error), { status: 400 });
  }
}

import serverAuth from "@/libs/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    console.log("current user here ", currentUser);
    return new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }
}

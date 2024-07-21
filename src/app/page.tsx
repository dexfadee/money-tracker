import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";

export default async function Home() {
  const session = await auth();
  
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen gap-8">
        <SignIn />
        <SignOut />
        {
          session?.user? <div>SignedIn as {session.user.email}</div> : <div>Not Signed In</div>
        }
      </div>
    </>
  );
}

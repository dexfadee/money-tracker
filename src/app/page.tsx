import { auth } from "@/auth";
import AddTransactions from "@/components/AddTransactions";
import Login from "@/components/Login";
import LogoutButton from "@/components/LogoutButton";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  
  return (
    <>
        {
          session?.user? (
            <div className="h-screen w-screen">
            <Navbar />
            <div className="h-[88vh] flex justify-center items-center">
            <AddTransactions />
            </div>
            </div>
          ) : (
            <div className="h-screen w-screen flex justify-center items-center">
            <Login />
            </div>
          )
        }
    </>
  );
}

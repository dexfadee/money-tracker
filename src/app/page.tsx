import { auth } from "@/auth";
import AddTransactions from "@/components/AddTransactions";
import Balance from "@/components/Balance";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await auth();
  
  return (
    <>
        {
          session?.user? (
            <div className="h-screen w-screen">
            <Navbar />
            <div className="h-[88vh] flex flex-col gap-2">
              <h1 className="text-center text-4xl md:text-6xl font-bold pt-4">Welcome, {session.user.name}</h1>
              <Balance />
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

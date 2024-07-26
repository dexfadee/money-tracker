import { auth } from "@/auth";
import AddTransactions from "@/components/AddTransactions";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
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
            <div className="flex md:flex-row flex-col">
            <div className="h-[88vh] md:w-1/2 flex flex-col gap-2">
              <h1 className="text-center text-4xl md:text-6xl font-bold pt-16">Welcome, {session.user.name}</h1>
              <Balance />
              <AddTransactions />
            </div>
            <div className="h-[88vh] md:w-1/2 flex flex-col gap-2">
              <IncomeExpense />
            </div>
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

import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import Transaction from "@/models/transaction.model";

export async function GET() {
    
    const session = await auth();
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }
    
    try {
        await dbConnect();

        
        
        return Response.json(
            { message: 'Status Changed successfully', success: true },
            { status: 200 }
        );

    } catch (error) {
        return Response.json(
            { success: false, message: 'Error Changing Pending Status' },
            { status: 500 }
        );
    }
}
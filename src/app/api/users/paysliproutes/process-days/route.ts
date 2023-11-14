import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bundy from "@/models/bundyclockSchema";

connect();

export async function GET(request: NextRequest) {

        const now = new Date();
        const offset = 8; // Philippines timezone offset in hours
        const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const formattedDate = philippinesTime.toISOString().split('T')[0];
        const fifteenDaysAgo = new Date(philippinesTime);
        fifteenDaysAgo.setDate(philippinesTime.getDate() - 15);
        const searchQuery = request.nextUrl.searchParams.get('employee_id') || "";
        console.log("Search Query:", searchQuery);
        
        const searchFilter = {
            $and: [
                { employee_id: new RegExp(searchQuery) },
                {  date: { $gte: fifteenDaysAgo, $lte: philippinesTime },}
            ]
        };
    try {
        
        console.log("Search Filter:", searchFilter);

        const userBundy = await bundy.find(searchFilter,);
        console.log("User Bundy:", userBundy);

        let daysWithBothInOut = 0;

        userBundy.forEach(user => {
            const timeIn = user.time_in;
            const timeOut = user.time_out;

            // Check if both time_in and time_out are present
            if (timeIn && timeOut) {
                daysWithBothInOut++;
            }
        });

        return NextResponse.json({ message: "Successfully retrieve user data", success: true, days: daysWithBothInOut, user: userBundy });
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

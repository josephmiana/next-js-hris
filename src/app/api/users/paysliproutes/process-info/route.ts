import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import userinformation from '@/models/userinformation';
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
                { employee_id: searchQuery },
                {  date: { $gte: fifteenDaysAgo, $lte: philippinesTime },}
            ]
        };
	try {
		const userDataArray = await userinformation.find();

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

		return NextResponse.json({ message: "Successfully retrieve user data", success: true, user: userDataArray, days: daysWithBothInOut,  data: userBundy});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });

	}
}
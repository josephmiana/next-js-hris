import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import overtimes from "@/models/overtimeSchema"

connect();
export async function GET(request: NextRequest) {
	const now = new Date();
        const offset = 8; // Philippines timezone offset in hours
        const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const formattedDate = philippinesTime.toISOString().split('T')[0];
        const fifteenDaysAgo = new Date(philippinesTime);
        fifteenDaysAgo.setDate(philippinesTime.getDate() - 15);
        const searchQuery = request.nextUrl.searchParams.get('employee_id') || "";
        const searchPeriod = request.nextUrl.searchParams.get('period') || "";
         
         
        let searchFilter ={};
          if(searchPeriod == '1st Period')
          {
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 2);
            const fifteenthDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 16);  
            console.log('1st period here');
            searchFilter = {
                $and: [
                  { employee_id: searchQuery },
                  { date: { $gte: firstDayOfMonth, $lte: fifteenthDayOfMonth } }
                ]
              };
          }
          else if(searchPeriod === '2nd Period')
          {
            const sixteenthDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 16);
            const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 32);  
            console.log('2nd period here');
            
            searchFilter = {
                $and: [
                  { employee_id: searchQuery },
                  { date: { $gte: sixteenthDayOfMonth, $lte: lastDayOfMonth } }
                ]
              };
          }
	try {
        const userBundy = await overtimes.find(searchFilter,);
        const totalHours = userBundy.reduce((acc, overtime) => acc + overtime.overtime, 0);
        console.log(totalHours);
        
        return NextResponse.json({
          message: "Successfully retrieve user data",
          success: true,
          data: { userBundy, totalHours }
        });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });

	}
}

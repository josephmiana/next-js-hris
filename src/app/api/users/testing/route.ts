import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import overtimes from "@/models/overtimeSchema"
import bundy from "@/models/bundyclockSchema";
connect();
export async function GET(request: NextRequest) {
	      const now = new Date();
        const offset = 8; // Philippines timezone offset in hours
        const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const fifteenDaysAgo = new Date(philippinesTime);
        fifteenDaysAgo.setDate(philippinesTime.getDate() - 15);
        const searchQuery = request.nextUrl.searchParams.get('employee_id') || "";
        const searchPeriod = request.nextUrl.searchParams.get('period') || "";
         
         
        let searchFilter ={};
          if(searchPeriod == '1st Period')
          {
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 2);
            const fifteenthDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 16);  
            firstDayOfMonth.setUTCHours(0,0,0,0);
            fifteenthDayOfMonth.setUTCHours(0,0,0,0);
            searchFilter = {
                $and: [
                  { employee_id: searchQuery },
                  { date: { $gte: firstDayOfMonth, $lte: fifteenthDayOfMonth } }
                ]
              };
              console.log(firstDayOfMonth,  ' and the ',  fifteenthDayOfMonth);
              
          }
          else if(searchPeriod === '2nd Period')
          {
            const sixteenthDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 16);
            const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 32);  
            sixteenthDayOfMonth.setUTCHours(0,0,0,0);
            lastDayOfMonth.setUTCHours(0,0,0,0);
            searchFilter = {
                $and: [
                  { employee_id: searchQuery },
                  { date: { $gte: sixteenthDayOfMonth, $lte: lastDayOfMonth } }
                ]
              };
          }
	try {
    let documentCount = 0;
        const userBundy = await bundy
        .find(searchFilter)
        .select('overtime normalhour workedHours holiday tardiness');
        console.log('this is from routes' ,userBundy);
        const totals = {
          totalHours: 0,
          overtime: 0,
          normalhour: 0,
          tardiness:0,
        };

        userBundy.forEach(item => {
          totals.totalHours += parseFloat(item.workedHours) || 0;
          totals.overtime += parseFloat(item.overtime) || 0;
          totals.normalhour += parseFloat(item.normalhour) || 0;
          totals.tardiness += parseFloat(item.tardiness) || 0;
          documentCount++;
        });       
        
        return NextResponse.json({
          message: "Successfully retrieve user data",
          success: true,
          data:  totals,
          totes: documentCount,
          raw: userBundy,
        });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });

	}
}

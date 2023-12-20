import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import userinformation from '@/models/userinformation';
import bundy from '@/models/bundyclockSchema';
connect();

export async function POST(request: NextRequest) {
   try {
    const now = new Date();
    const offset = 8; 
    const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
      philippinesTime.setUTCHours(0,0,0,0);
      console.log(philippinesTime);
      
      const userResults: any[] = await userinformation.find().select('EmployeeInformation Schedule.startshift Schedule.endshift');
        console.log(userResults);
        let total;
      // Iterate over each user result
      for (const userResult of userResults) {
        total = Math.abs(parseFloat(userResult.Schedule.startshift) - parseFloat(userResult.Schedule.endshift));
        const response = await bundy.findOne({
          employee_id: userResult.EmployeeInformation.employee_id,
          date: philippinesTime,
        });
      
        // Check if the record already exists for the user on the given date
        if (!response) {
            console.log('creating new record');
            
          const newRecord = {
            name: userResult.EmployeeInformation.name,
            employee_id: userResult.EmployeeInformation.employee_id,
            date: philippinesTime,
            holiday: total,
          };
          
          // Create a new record for the user
          await bundy.create(newRecord);

          return NextResponse.json({
            success: true,
            result: newRecord,
        }, { status: 200 });
        }else 
        {
            
            response.holiday = total;
        }
      }
      
    return NextResponse.json({
        success: true,
        result: userResults,
    }, { status: 200 });
   } catch (error: any) {
    console.log(error.message);
    
    return NextResponse.json({ error: error.message }, { status: 500 }); 
   }
}
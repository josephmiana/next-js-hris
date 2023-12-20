import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bundy from '@/models/bundyclockSchema';
connect();

export async function GET(request: NextRequest){
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
        const limit = 10;
        const skip = (page - 1) * limit;
        const now = new Date();
        const offset = 8; // Philippines timezone offset in hours
        const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const fifteenDaysAgo = new Date(philippinesTime);
        fifteenDaysAgo.setDate(philippinesTime.getDate() - 15);
        
        const search_Id = request.nextUrl.searchParams.get('name') || "";
        const searchPeriod = request.nextUrl.searchParams.get('period') || "";
        const searchMonth = parseInt(request.nextUrl.searchParams.get('month') || '0', 10);


        
        const nextMonth = new Date(now.getFullYear(), searchMonth , 1);
        const lastDay = new Date(nextMonth.getTime()-600000);
        const sixteenthDayOfMonth = new Date(now.getFullYear(), searchMonth - 1, 17);
        const fifteenthDayOfMonth = new Date(now.getFullYear(), searchMonth - 1, 16);
        const firstDayOfMonth = new Date(now.getFullYear(), searchMonth - 1, 2);
        firstDayOfMonth.setUTCHours(0,0,0,0);
        lastDay.setUTCHours(0, 0, 0, 0);
        sixteenthDayOfMonth.setUTCHours(0,0,0,0);
        firstDayOfMonth.setUTCHours(0,0,0,0);
        
  
    
        
        
        try{
          let searchFilter ={};
        if (search_Id && searchPeriod && searchMonth) {
            if (searchPeriod === '1st Period') {
              
                
              searchFilter = {
                $and: [
                  { name: new RegExp(search_Id) },
                  { date: { $gte: firstDayOfMonth, $lte: fifteenthDayOfMonth } }
                ]
              };
            
              
            }
            
            else if (searchPeriod === '2nd Period') 
            {
                
              searchFilter = {
                $and: [
                  { name: new RegExp(search_Id) },
                  { date: { $gte: sixteenthDayOfMonth, $lte: lastDay } }
                ]
              };
          
            }
            } else if(!search_Id && searchPeriod && searchMonth){
                if(searchPeriod === '1st Period' )
                {
                    searchFilter = {
                        $and: [
                          { name: new RegExp(search_Id) },
                          { date: { $gte: firstDayOfMonth, $lte: fifteenthDayOfMonth } }
                        ]
                      };
                      

                }
                else if(searchPeriod === '2nd Period')
                {
                    
                   
                    searchFilter = {
                        $and: [
                          { name: new RegExp(search_Id) },
                          { date: { $gte: sixteenthDayOfMonth, $lte: lastDay } }
                        ]
                      };
                     
                }
                

            }
            else if(!searchMonth && !searchPeriod && !search_Id)
            {
              searchFilter = {};
            }
            else {
                
                searchFilter = {
                    $or: [
                      { name: new RegExp(search_Id) },
                      
                    ],
                    $and:[
                      { date: { $gte: firstDayOfMonth, $lte: lastDay } }
                    ]
                  };
                  
            }
            
          const userBundy = await bundy
          .find(searchFilter)
          .limit(limit)
          .skip(skip);
      
          return NextResponse.json({
            message: "Successfully retrieve user data",
            success: true,
            data: userBundy
          });
        }
	 catch (error:any) {
        
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import employeePayslip from '@/models/payslipSchema';
connect();

export async function GET(request: NextRequest){
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;
    const searchMonth = request.nextUrl.searchParams.get('month') || "";
    const searchPeriod = request.nextUrl.searchParams.get('period') || "";
    const searchName = request.nextUrl.searchParams.get('name') || "";
    let searchFilter ={};
    try {
        if (searchName && searchPeriod && searchMonth) {
            if (searchPeriod === '1st Period') {
              
                
              searchFilter = {
                $and: [
                  { 'employeeinformation.name': new RegExp(searchName) },
                  { date: searchMonth},
                  { periodcovered: searchPeriod},
                ]
              };
         
              
            }
            
            else if (searchPeriod === '2nd Period') 
            {
               
                searchFilter = {
                    $and: [
                      { 'employeeinformation.name': new RegExp(searchName) },
                      { date: searchMonth },
                      { periodcovered: searchPeriod },
                    ]
                  };
                  
            }
            } else if(!searchName && searchPeriod && searchMonth){
                if(searchPeriod === '1st Period' )
                {
                    searchFilter = {
                        $and: [
                            { 'employeeinformation.name': new RegExp(searchName) },
                            { date: searchMonth},
                            { periodcovered: searchPeriod},
                        ]
                      };

                }
                else if(searchPeriod === '2nd Period')
                {
                    
                  
                    searchFilter = {
                        $and: [
                            { 'employeeinformation.name': new RegExp(searchName) },
                            { date: searchMonth},
                            { periodcovered: searchPeriod},
                        ]
                      };
                }
                

            }
            else if(!searchMonth && !searchPeriod && !searchName)
            {
              searchFilter = {};
            }
            else {
              
                
                searchFilter = {
                    $or: [
                      { 'employeeinformation.name': new RegExp(searchName) },
                      
                    ],
                    $and:[
                        { date: searchMonth},
                        { periodcovered: searchPeriod},
                    ]
                  };
                  
            }
            const userBundy = await employeePayslip
            .find(searchFilter)
            .limit(limit)
            .select('date periodcovered employeeinformation taxableincome deduction.totalcontribution')
            .skip(skip);
          return NextResponse.json({
            message: "Successfully retrieve user data",
            success: true,
            data: userBundy
          });

    } catch (error:any) {
       
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}
import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestedfiles from '@/models/requestSchema';
connect();

export async function GET(request: NextRequest){
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;
    const searchName = request.nextUrl.searchParams.get('name') || "";
    let searchFilter ={};
    try {

        if(searchName)
        {
            searchFilter={name:searchName}
        }
        else{
            searchFilter= {}
        }
            const userFiles = await requestedfiles
            .find(searchFilter)
            .select('name requestfile date isVerified')
            .limit(limit)
            .skip(skip);
          return NextResponse.json({
            message: "Successfully retrieve user data",
            success: true,
            data: userFiles
          });

    } catch (error:any) {
     
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}
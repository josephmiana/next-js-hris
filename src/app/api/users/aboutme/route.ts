import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import employeeinformation from "@/models/personalinfo"
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
connect();

export async function GET(request: NextRequest){
    const token = getUserFromToken(request);
    try {
        const information = await employeeinformation.find({employee_id: token})
       
        return NextResponse.json({ success: true, userData: information, }, { status: 200 });
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const _id = reqBody._id;
  
    try {
      const updatedInformation = await employeeinformation.findByIdAndUpdate(
        _id,
        reqBody,
        { new: true } // This option returns the modified document
      );
  
      if (!updatedInformation) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
      }
      
     
      return NextResponse.json({ success: true, updatedInformation }, { status: 200 });
    } catch (error:any) {
      
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
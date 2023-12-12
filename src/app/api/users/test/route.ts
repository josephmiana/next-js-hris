import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import requestfile from "@/models/requestSchema";
connect();

export async function POST(request: NextRequest) {

    const reqBody = {
        information: {
            pagibig: "asd ",
            hireddate: ''
        }, // Replace with the desired name
      };
    try {
      const updatedInformation = await requestfile.findOneAndUpdate(
        {name: "names"},
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
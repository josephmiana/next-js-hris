import { connect } from "@/dbConfig/dbConfig";
import files from "@/models/filesSchema";
import { NextRequest, NextResponse } from "next/server";
import requestedfiles from "@/models/requestSchema";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, employee_id, date, isVerified, requestfile,...rest}= reqBody
    
    
    if(reqBody.requestfile === 'coe')
    {
        await requestedfiles.findByIdAndUpdate(
            reqBody._id,
            { isVerified: true },
            { new: true }
          );
    }
    else{

        await files.findOneAndUpdate(
            { employee_id: employee_id },
            { name: name, ...rest.information },
            { new: true } // This option returns the modified document
        );
        

        await requestedfiles.findByIdAndUpdate(
            reqBody._id,
            {isVerified: true },
            {new: true },
        )
        
    }
      return NextResponse.json({
        message: "Request approved!",
        success: true,
        }, {status:201})
          } catch (error: any) {
  
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

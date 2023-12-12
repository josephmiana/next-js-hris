import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import updatedUser from "@/models/updateduserSchema";

connect();

export async function POST(request: NextRequest){
    try{
        const {email} = await request.json()
        const user = await updatedUser.findOne({email: email});
        if (!user) {
          throw new Error('No user found with that email.');
        }
       
       //send verification email
       const hashed = await sendEmail({email, emailType: "RESET", userId: user._id})
       console.log(hashed);
            const env = process.env.DOMAIN
       return NextResponse.json({
        message: "Link created successfully!",
        success: true,
        env: env,
        tokenforreset: hashed,
        }, {status:200})

    }catch (error: any){
        return NextResponse.json({error: error.message},
        {status: 500})
    }
}
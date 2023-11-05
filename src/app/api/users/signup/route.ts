import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email, password,} = reqBody
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})
        
        if(user){
            return NextResponse.json({error: "Email already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            Religion: "Bisaya",
            Birthplace: "rhodessa",
            status: "Single",
            gender: "Male",
            Phone:  "1234",
            blk :   "134",
            street: "navy rd",
            barangay: "south signal",
            city:   "Taguig", 
            region: "NCR",
            zip:    "1630",
            height: "5'6",
            weight: "95",
            blood:  "O+",
            medHistory: "siraulo",
            skills: "asd",
            hobbies: "asd",
        })  

       const savedUser = await newUser.save();
       console.log(savedUser);
       
       //send verification email
       await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
       
       return NextResponse.json({
        message: "User created successfully!",
        success: true,
        savedUser
        }, {status:201})
        
    }catch (error: any){
        return NextResponse.json({error: error.message},
        {status: 500})
    }
}
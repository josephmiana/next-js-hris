import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bundy from '@/models/bundyclockSchema';
import { getUsernameFromToken } from '@/helpers/getUsernameTokenFromToken';
import { getUserFromToken } from '@/helpers/getCustomTokenFromToken';
connect();

export async function POST(request: NextRequest) {
    try {
        const now = new Date();
        const offset = 8; // Philippines timezone offset in hours
        const philippinesTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const date = philippinesTime.toISOString().split('T')[0];


        const time  = await request.json();

        
        const formattedTime = time.time;
        const employee_id = getUserFromToken(request);
        const name = getUsernameFromToken(request);
        // Get the current date
        console.log('this is the bundy inserted', employee_id, time, date );

        // Find the document
        const result = await bundy.findOne({ employee_id: employee_id, date: date });
        console.log(result)
        if (!result) {
            // If the user does not exist for the current date, create a new record
            const newRecord = new bundy({
                name: name,
                employee_id:employee_id,
                time_in: formattedTime,
                time_out: null, // Initialize time_out to null
                date: date,
            });

            const savedRecord = await newRecord.save();
            return NextResponse.json({
                message: "User created successfully!",
                success: true,
                result: savedRecord,
            }, { status: 201 });
        } else {
            // If both time_in and time_out are already set, update only time_out
            if (result.time_in && result.time_out) {
                result.time_out = formattedTime;
            } else {
                // If time_in is not set, update time_in
                if (!result.time_in) {
                    result.time_in = formattedTime;
                } else {
                    // If time_in is already set, update time_out
                    result.time_out = formattedTime;
                }
            }

            const updatedRecord = await result.save();

            return NextResponse.json({
                message: "Time in/out updated successfully!",
                success: true,
                result: updatedRecord,
            }, { status: 200 });
        }
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
        
        
    }
}
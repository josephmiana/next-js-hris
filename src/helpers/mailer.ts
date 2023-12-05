import nodemailer from 'nodemailer';
import update from '@/models/updateduserSchema';
import bcryptjs from 'bcryptjs';
import React, { useRef } from 'react';
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const hashedEmail = await bcryptjs.hash(email.toString(), 10);

        if (emailType === "VERIFY") {
            await update.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await update.findByIdAndUpdate(userId, { forgotPasswordToken: hashedEmail, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}

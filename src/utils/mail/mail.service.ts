import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
    private readonly transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            pool: true,
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_TRANSPORT_NAME,
                pass: process.env.MAIL_TRANSPORT_PASSWORD
            }
        })
    }

    async sendMail(
        { email, text, html, subject }: { email: string, text: string, html: string, subject: string }
    ) {
        return await this.transporter.sendMail({
            from: process.env.MAIL_TRANSPORT_NAME,
            to: email,
            subject,
            text,
            html
        })
    }
}
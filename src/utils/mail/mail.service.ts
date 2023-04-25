import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
    private readonly transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_TRANSPORT_NAME,
                pass: process.env.MAIL_TRANSPORT_PASSWORD
            }
        })
    }

    async sendMail(
        { email, text, html, subject }: { email: string, text: string, html: string, subject: string }
    ) {
        let info = await this.transporter.sendMail({
            from: process.env.MAIL_TRANSPORT_NAME,
            to: email,
            subject,
            text: text,
            html: html
        })
    }
}
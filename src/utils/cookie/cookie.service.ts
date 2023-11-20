import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { CookieOptions } from 'express'
import * as jwt from 'jsonwebtoken'
import {Response} from 'express'
import { promisify } from 'util'
import {Request} from 'express'

@Injectable()
export class CookieService {
    constructor() {}

    addCookie(res: Response, name: string, value: any) {
        const token = jwt.sign(value, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
        })
        const cookieOptions: CookieOptions = {
            httpOnly: true,
        }
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.domain = process.env.ROOT_DOMAIN
            cookieOptions.path = '/'
        }
        cookieOptions.expires = new Date(Date.now() + +process.env.JWT_COOKIES_EXPIRES_IN * 24 * 3600 * 1000)

        res.cookie(name, token, cookieOptions)
    }

    removeCookie(res: Response, name: string) {
        res.clearCookie(name)
    }

    async getFromCookie (req: Request, name: string) {
        return await promisify(jwt.verify)(req.cookies[name], process.env.JWT_SECRET)
    }
}
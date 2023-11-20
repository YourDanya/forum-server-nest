import { Injectable } from '@nestjs/common'
import { NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/user/user.schema'
import { CookieService } from 'src/utils/cookie/cookie.service'
import { Request } from 'express'
import { Response } from 'express'

@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    constructor(@InjectModel('User') private userModel: Model<User>,
                private cookieService: CookieService
    ) {}

    async use(req: Request & {user: User}, res: Response, next: NextFunction) {
        const decoded = await this.cookieService.getFromCookie(req, 'user')
        if (!decoded) {
            return next()
        }

         req.user = await this.userModel.findById(decoded._id)
        // const user = new this.userModel()
        // await user.

        next()
    }
}

@Injectable()
export class NotLoginedMiddleware implements NestMiddleware {
    constructor() {}

    async use(req: Request & {user: User}, res: Response, next: NextFunction) {
        if (!req.user) {
            return res.status(400).json({message: 'Not logged in.'})
        }
        next()
    }
}




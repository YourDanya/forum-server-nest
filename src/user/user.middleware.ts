import {Injectable} from '@nestjs/common'
import {NestMiddleware} from '@nestjs/common'
import {NextFunction} from 'express'
import {Request} from 'express'
import {Response} from 'express'
import {User} from 'src/user/user.schema'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {UserService} from 'src/user/user.service'

@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    constructor(
        private cookieService: CookieService,
        private userService: UserService
    ) {}

    async use(req: Request & { user: User }, res: Response, next: NextFunction) {
        const decoded: User = await this.cookieService.getFromCookie(req, 'user')
        if (!decoded) {
            return next()
        }

        req.user = await this.userService.findOne({_id: decoded._id})
        // req.user = await this.userModel.findById(decoded._id)
        // const user = new this.userModel()
        // await user
        next()
    }
}

@Injectable()
export class NotLoginedMiddleware implements NestMiddleware {
    constructor() {}

    async use(req: Request & { user: User }, res: Response, next: NextFunction) {
        if (!req.user) {
            return res.status(400).json({message: 'Not logged in.'})
        }
        next()
    }
}




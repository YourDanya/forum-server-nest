import {Injectable} from '@nestjs/common'
import {NestMiddleware} from '@nestjs/common'
import {NextFunction} from 'express'
import {Request} from 'express'
import {Response} from 'express'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {User} from 'src/user/user.entity'
import {UserService} from 'src/user/user.service'
import {UserRequest} from 'src/user/user.types'

@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    constructor(
        private cookieService: CookieService,
        private userService: UserService
    ) {}

    async use(req: UserRequest, res: Response, next: NextFunction) {
        const decoded: {_id: string, changeEmail: string} = await this.cookieService.getFromCookie(req, 'user')
        if (!decoded) {
            return next()
        }

        req.user = await this.userService.findOne({_id: decoded._id})

        if (decoded.changeEmail) {
            req.user.changeEmail = decoded.changeEmail
        }

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

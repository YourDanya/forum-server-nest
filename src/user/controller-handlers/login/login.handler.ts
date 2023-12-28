import * as crypto from 'crypto'
import {Request, Response} from 'express'
import {LoginBody} from 'src/user/controller-handlers/login/login.types'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {Injectable} from '@nestjs/common'
import {User} from 'src/user/user.entity'
import {UserService} from 'src/user/user.service'
import {FilteredUser} from 'src/user/user.types'
import {filterObject} from 'src/utils/helpers/filter-object/filter-object'
import {filterUser} from 'src/user/utils/filter-user'

@Injectable()
export class LoginHandler {

    constructor(
        private userService: UserService,
        private cookieService: CookieService
    ) {}

    async handle(req: Request & {body: LoginBody}, res: Response) {
        const {email, password} = req.body
        const user = await this.userService.findOne({email})

        if (!user) {
            return this.sendUserDoesntExistError(res)
        }

        if (!user.active) {
            return this.sendUserNotActivatedError(res)
        }

        const isMatch = user.password === crypto.createHash('sha256').update(password).digest('hex')

        if (!isMatch) {
            this.sendIncorrectPasswordError(res)
        }

        this.cookieService.addCookie(res, 'user', {_id: user._id})

        this.sendSuccess(res, filterUser(user))
    }

    sendUserDoesntExistError(res: Response) {
        res.status(400).json({
            message: {
                en: 'User does not exist.',
                ru: 'Пользователь не существует.'
            }
        })
    }

    sendUserNotActivatedError(res: Response) {
        res.status(400).json({
            message: {
                en: 'User was not activated.',
                ru: 'Пользователь не активирован.'
            }
        })
    }

    sendIncorrectPasswordError(res: Response) {
        res.status(400).json({
            message: {
                en: 'User password is not correct.',
                ru: 'Пароль пользователя неверный.'
            }
        })
    }

    sendSuccess(res: Response, user: FilteredUser) {
        res.status(200).json({
            message: {
                en: 'Logged in successfully.',
                ru: 'Вы успешно вошли.'
            },
            user
        })
    }
}
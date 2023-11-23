import {Injectable} from '@nestjs/common'
import {CookieService} from 'src/utils/cookie/cookie.service'
import {UserService} from 'src/user/user.service'
import {RegisterBody} from 'src/user/controller-handlers/register/register.types'
import {Response, Request} from 'express'
import {User} from 'src/user/user.entity'

@Injectable()
export class RegisterHandler {
    constructor(
        private cookieService: CookieService,
        private userService: UserService
    ) {}
    async handle (req: Request & {body: RegisterBody}, res: Response) {
        const {body} = req

        if (body.password !== body.passwordConfirm) {
            return this.sendNoMatchError(res)
        }

        let user = await this.userService.findOne({email: body.email})

        if (user && user.active) {
            return this.sendEmailInUseError(res)
        }

        if (!user) {
            user = await this.userService.create(body)
        } else {
            user = await this.userService.updateOne({_id: user._id, ...body})
        }

        this.cookieService.addCookie(res, 'user', {_id: user._id})

        this.sendSuccess(res, user)
    }

    sendNoMatchError(res: Response) {
        res.status(400).json({
            message: {
                en: 'Password and password confirm do not match.',
                ru: 'Пароль и подтверждение пароля не совпадают.'
            }
        })
    }

    sendEmailInUseError(res: Response) {
        return res.status(400).json({
            message: {
                en: 'Provided email already in use.',
                ru: 'Предоставленная почта уже занята.'
            }
        })
    }

    sendSuccess(res: Response, user: User) {
        res.status(200).json({
            message: 'Registered successfully',
            user
        })
    }
}
import crypto from 'crypto'
import {Request, Response} from 'express'
import {LoginBody} from 'src/user/controller-handlers/login/login.types'
import {UserService} from 'src/user/user.service'
import {CookieService} from 'src/utils/cookie/cookie.service'

export class LoginHandler {

    constructor(
        private userService: UserService,
        private cookieService: CookieService
    ) {}

    async handle(req: Request & {body: LoginBody}, res: Response) {
        const {email, password} = req.body
        const user = await this.userService.findOne({email})

        if (!user) {
            return res.status(400).json({
                message: {
                    en: 'User does not exist.',
                    ru: 'Пользователь не существует.'
                }
            })
        }

        if (!user.active) {
            return res.status(400).json({
                message: {
                    en: 'User was not activated.',
                    ru: 'Пользователь не активирован.'
                }
            })
        }

        const isMatch = user.password === crypto.createHash('sha256').update(password).digest('hex')

        if (!isMatch) {
            return res.status(400).json({
                message: {
                    en: 'User password is not correct.',
                    ru: 'Пароль пользователя неверный.'
                }
            })
        }

        this.cookieService.addCookie(res, 'user', user)

        res.status(200).json({
            message: {
                en: 'Logged in successfully.',
                ru: 'Вы успешно вошли.'
            },
            user
        })
    }
}
import {Injectable} from '@nestjs/common'
import {UserService} from 'src/user/user.service'
import {Response} from 'express'
import * as crypto from 'crypto'
import {filterUser} from 'src/user/utils/filter-user/filter-user'
import {FilteredUser} from 'src/user/user.types'
import {UpdatePasswordRequest} from 'src/user/controller-handlers/update-password/update-password.types'

@Injectable()
export class UpdatePasswordHandler {
    constructor(
        private userService: UserService
    ) {}
    async handle (req: UpdatePasswordRequest, res: Response) {

        const {body: {currentPassword, newPasswordConfirm, newPassword}, user} = req

        if (!user || !user.active) {
            return this.sendUserDoesntExistError(res)
        }

        const isMatch = user.password === crypto.createHash('sha256').update(currentPassword).digest('hex')
        if (!isMatch) {
            return this.sendIncorrectPasswordError(res)
        }

        if (newPassword !== newPasswordConfirm) {
            return this.sendNewPasswordConfirmError(res)
        }

        const newHashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex')

        await this.userService.updateOne({
            _id: req.user._id, password: newHashedPassword
        })

        this.sendSuccess(res,  filterUser(user))
    }

    sendUserDoesntExistError(res: Response) {
        res.status(400).json({
            message: {
                en: 'User does not exist.',
                ru: 'Пользователь не существует.'
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

    sendNewPasswordConfirmError(res: Response) {
        res.status(400).json({
            message: {
                en: 'Password and password confirm do not match.',
                ru: 'Пароль и подтверждение пароля не совпадают.'
            }
        })
    }

    sendSuccess(res: Response, user: FilteredUser) {
        res.status(200).json({
            message: {
                en: 'Password changed successfully',
                ru: 'Пароль успешно изменен'
            },
            user
        })
    }
}
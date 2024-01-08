import {Injectable} from '@nestjs/common'
import {UserRequest} from 'src/user/user.types'
import {Response} from 'express'

@Injectable()
export class GetMeHandler {
    constructor() {}

    async handle(req: UserRequest, res: Response) {
        const user = req.user ?? null

        res.status(200).json({
            message: {
                en: 'User fetched.',
                ru: 'Пользователь получен.'
            },
            user
        })
    }
}
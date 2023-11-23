import {Request} from 'express'
import {User} from 'src/user/user.entity'
import {Response} from 'express'
import {UserService} from 'src/user/user.service'

export class UpdateUserHandler {
    constructor(private userService: UserService) {}
    async handle(req: Request & {user: User}, res: Response) {
        const allowedOptions = {'name': true, 'birthDate': true, 'description': true}

        let {body, user} = req

        for (let prop in body) {
            if (!(prop in allowedOptions)) {
                delete body[prop]
            }
        }

        await this.userService.updateOne({_id: user._id, ...body})

        res.status(200).json({
            user,
            message: 'User data was updated.'
        })
    }
}
import {Controller} from '@nestjs/common'
import {Get} from '@nestjs/common'
import {Res} from '@nestjs/common'
import {Req} from '@nestjs/common'
import {Response} from 'express'
import {Request} from 'express'
import {Post} from '@nestjs/common'
import {Delete} from '@nestjs/common'
import {User} from 'src/user/user.entity'
import {RegisterBody} from 'src/user/controller-handlers/register/register.types'
import {RegisterHandler} from 'src/user/controller-handlers/register/register.handler'
import {SendRegisterCodeHandler} from 'src/user/controller-handlers/send-register-code/send-register-code.handler'
import {
    ConfirmRegisterEmailHandler
} from 'src/user/controller-handlers/confirm-register-email/confirm-register-email.handler'
import {UpdateUserHandler} from 'src/user/controller-handlers/update-user/update-user.handler'
import {LoginBody} from 'src/user/controller-handlers/login/login.types'
import {LoginHandler} from 'src/user/controller-handlers/login/login.handler'
import {UserRequest} from 'src/user/user.types'

@Controller('/user')
export class UserController {

    constructor(
        private registerHandler: RegisterHandler,
        private sendRegisterCodeHandler: SendRegisterCodeHandler,
        private confirmRegisterEmailHandler: ConfirmRegisterEmailHandler,
        private updateUserHandler: UpdateUserHandler,
        private loginHandler: LoginHandler
    ) {}

    @Get('/data')
    getUser(@Req() {user}: Response & { user: User }, @Res() res: Response) {
        res.status(200).json({
            message: 'Get user data successfully',
            user
        })
    }

    @Post('/login')
    async login(@Req() req: Request & {body: LoginBody}, @Res() res: Response) {
        await this.loginHandler.handle(req, res)
    }

    @Post('/register')
    async register(@Req() req: Request & {body: RegisterBody}, @Res() res: Response) {
        await this.registerHandler.handle(req, res)
    }

    @Get('/send-register-code')
    async sendRegisterCode(@Req() req: UserRequest, @Res() res: Response) {
        await this.sendRegisterCodeHandler.handle(req, res)
    }

    @Post('/confirm-register-email')
    async confirmRegisterEmail(@Req() req: UserRequest, @Res() res: Response) {
        await this.confirmRegisterEmailHandler.handle(req, res)
    }

    @Post('/data')
    async updateUser(@Req() req: Request & { user: User }, @Res() res: Response) {
        await this.updateUserHandler.handle(req, res)
    }

    @Delete('/')
    async deleteMany(@Res() res: Response) {}

    @Get('/')
    async getAll(@Res() res: Response) {}
}
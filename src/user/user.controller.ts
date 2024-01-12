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
import {GetMeHandler} from 'src/user/controller-handlers/get-me/get-me.handler'
import {ChangeEmailHandler} from 'src/user/controller-handlers/change-email/change-email.handler'
import {SendChangeEmailCodeHandler} from 'src/user/controller-handlers/send-change-email-code/send-change-email-code.handler'
import {ConfirmChangeEmailHandler} from 'src/user/controller-handlers/confirm-change-email/confirm-change-email.handler'
import {UpdatePasswordRequest} from 'src/user/controller-handlers/update-password/update-password.types'
import {UpdatePasswordHandler} from 'src/user/controller-handlers/update-password/update-password.handler'
import {LogoutHandler} from 'src/user/controller-handlers/logout/logout.handler'

@Controller('/user')
export class UserController {

    constructor(
        private registerHandler: RegisterHandler,
        private sendRegisterCodeHandler: SendRegisterCodeHandler,
        private confirmRegisterEmailHandler: ConfirmRegisterEmailHandler,
        private updateUserHandler: UpdateUserHandler,
        private loginHandler: LoginHandler,
        private getMeHandler: GetMeHandler,
        private changeEmailHandler: ChangeEmailHandler,
        private sendChangeEmailCodeHandler: SendChangeEmailCodeHandler,
        private confirmChangeEmailHandler : ConfirmChangeEmailHandler,
        private updatePasswordHandler: UpdatePasswordHandler,
        private logoutHandler: LogoutHandler
    ) {}

    @Get('/get-me')
    async getMe(@Req() req: UserRequest, @Res() res: Response) {
        await this.getMeHandler.handle(req, res)
    }

    @Post('/logout')
    async logout(@Req() req: UserRequest, @Res() res: Response) {
        await this.logoutHandler.handle(req, res)
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
    @Post('/change-email')
    async changeEmail(@Req() req: Request & { user: User }, @Res() res: Response) {
        await this.changeEmailHandler.handle(req, res)
    }
    @Get('/send-change-email-code')
    async sendChangeEmailCode(@Req() req: Request & { user: User }, @Res() res: Response) {
        await this.sendChangeEmailCodeHandler.handle(req, res)
    }
    @Post('/confirm-change-email')
    async confirmChangeEmail(@Req() req: Request & { user: User }, @Res() res: Response) {
        await this.confirmChangeEmailHandler.handle(req, res)
    }
    @Post('/update-password')
    async updatePassword(@Req() req: UpdatePasswordRequest, @Res() res: Response) {
        await this.updatePasswordHandler.handle(req, res)
    }
    @Delete('/')
    async deleteMany(@Res() res: Response) {

    }
    @Get('/')
    async getAll(@Res() res: Response) {}
}
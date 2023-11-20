import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { Res } from '@nestjs/common'
import { Req } from '@nestjs/common'
import { Response } from 'express'
import { Request } from 'express'
import { Post } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/user/user.schema'
import { Body } from '@nestjs/common'
import { MailService } from 'src/utils/mail/mail.service'
import * as crypto from 'crypto'
import * as pug from 'pug'
import { CookieService } from 'src/utils/cookie/cookie.service'
import { Delete } from '@nestjs/common'
import { UserDocument } from 'src/user/user.schema'

@Controller('/user')
export class UserController {

    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private mailService: MailService,
        private cookieService: CookieService
    ) {}

    @Get('/data')
    getUser(@Req() {user}: {user: User}, @Res() res) {
        res.status(200).json({
            message: 'Get user data successfully',
            user
        })
    }

    @Post('/login')
    async login(@Body() body: {email: string, password: string}, @Res() res) {
        const {email, password} = body
        const user = await this.userModel.findOne({email})

        if (!user) {
            return res.status(400).json({message: 'User does not exist.'})
        }

        if (!user.active) {
            return res.status(400).json({message: 'User was not activated.'})
        }

        const isMatch = user.password === crypto.createHash('sha256').update(password).digest('hex')

        if (!isMatch) {
            return res.status(400).json({message: 'User password is not correct'})
        }

        this.cookieService.addCookie(res, 'user', user)

        res.status(200).json({
            message: 'Logged in successfully.',
            user
        })
    }

    @Post('/register')
    async register(
        @Body() body: { email: string, password: string, passwordConfirm: string, name: string },
        @Res() res
    ) {
        for (let prop in body) {
            if (!body[prop]) {
                return res.status(400).json({ message: 'Correct data was not provided' })
            }
        }

        if (body.password !== body.passwordConfirm) {
            return res.status(400).json({ message: 'Password and password confirm do not match.' })
        }

        let user = await this.userModel.findOne({ email: body.email })

        if (user && user.active) {
            return res.status(400).json({ message: 'Provided email already in use.' })
        }

        console.log('user', user)

        if (!user) {
            user = await this.userModel.create(body)
        }

        this.cookieService.addCookie(res, 'user', {_id: user._id})

        res.status(200).json({
            messge: 'Registered successfully',
            user
        })
    }

    @Post('/send-register-code')
    async sendRegisterCode(@Req() req: Request, @Res() res) {
        const decoded = await this.cookieService.getFromCookie(req, 'user')
        const user = await this.userModel.findById(decoded._id)

        if (!user) {
            res.status(400).json({ message: 'There\'s no user.' })
        }
        if (user.active) {
            res.status(400).json({message: 'User already activated.'})
        }

        const activateCode = crypto.randomInt(10000, 99999).toString()
        user.activateUserCode = crypto.createHash('sha256').update(activateCode).digest('hex')
        user.activateUserExpires = Date.now() + 60 * 60 * 1000

        const html = pug.renderFile(`src/user/content/send-register-code.pug`, { activateCode })

        if (user.resendActivateUser > Date.now()) {
            const timer = user.resendActivateUser - Date.now()
            return res.status(400).json({ message: `Wait ${timer}`, timer })
        }

        user.resendActivateUser = Date.now() + 2 * 60 * 1000

        await this.mailService.sendMail({
            email: user.email, subject: 'User activation', html, text: ''
        })

        await user.save()

        res.status(200).json({ message: 'Send code successfully', timer: 2 * 60 * 1000 })
    }

    @Post('/activate')
    async activateUser(@Req() req: Request, @Res() res) {
        const {code} = req.body
        const decoded = await this.cookieService.getFromCookie(req, 'user')

        const user = await this.userModel.findById(decoded._id)

        const isMatch = crypto.createHash('sha256').update(code).digest('hex') === user.activateUserCode
        const isValid = user.activateUserExpires > Date.now()

        if (!(isValid && isMatch)) {
            return res.status(400).json({ message: `The code is invalid or has expired` })
        }

        user.password = crypto.createHash('sha256').update(user.password).digest('hex')
        user.active = true

        await user.save()

        this.cookieService.addCookie(res, 'user', {_id: user._id})

        res.status(200).json({
            message: 'User activated successfully',
            user
        })
    }

    @Post('/data')
    async updateUser(@Req() req: Request & {user: UserDocument}, @Res() res: Response) {
        const allowedOptions = {'name': true, 'birthDate': true, 'description': true}

        let {body, user} = req

        for (let prop in body) {
            if (prop in allowedOptions) {
                user[prop] = body[prop]
            }
        }

        await user.save()

        res.status(200).json({
            user,
            message: 'User data was updated.'
        })
    }

    @Delete('/')
    async deleteMany(@Res() res) {
        await this.userModel.deleteMany()
        res.status(200).json({
            message: 'Deleted users successfully'
        })
    }

    @Get('/')
    async getAll(@Res() res) {
        const users = await this.userModel.find()
        res.status(200).json({
            users,
            message: 'Find users successfully.'
        })
    }
}
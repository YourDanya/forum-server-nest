import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { Res } from '@nestjs/common'
import { Req } from '@nestjs/common'
import { Response } from 'express'
import { Post } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/user/user.schema'
import { Body } from '@nestjs/common'
import { getValues } from 'src/utils/typescript/typescript'

@Controller('/user')
export class UserController {

    constructor(@InjectModel('User') private userModel: Model<User>) {}

    @Post('/get-user')
    getUser(@Res() res) {
        const user = {}
        res.status(200).json({
            message: 'Logged in successfully.',
            user
        })
    }

    @Post('/login')
    login(@Body() body : {}, @Res() res) {
        res.status(200).json({
            message: 'Logged in successfully.',
        })
    }

    @Post('/register')
    async register(
        @Body() body: { email: string, password: string, passwordConfirm: string, name: string},
        @Res() res
    ) {

        for (let prop in body) {
            if (!body[prop]) {
                return res.status(200).json({message: 'Correct data was not provided'})
            }
        }

        if (body.password !== body.passwordConfirm) {
            return res.status(200).json({message: 'Password and password confirm do not match.'})
        }

        const user = await this.userModel.findOne({email: body.email})

        if (user && user.active) {
            return res.status(200).json({message: 'Provided email already in use.'})
        }

        if (user && !user.active) {
            this.userModel.create(body)
        }

        res.status(200).json({
            messge: 'Registered successfully',
            user
        })
    }

    @Post('/send-register-code')
    sendRegisterCode(@Req() req, @Res() res) {
        this.userModel.findOne({email: ''})

        res.status(200).json({
            message: 'Send code successfully',
        })
    }

    @Post('/activate-user')
    activateUser(@Body() body, @Res() res) {

    }

    @Post('/update-user')
    updateUser(@Req() req, @Res() res) {

    }

    @Post('/delete')
    delete( @Res() res) {
        this.userModel.deleteMany()
        res.status(200).json({
            message: 'deleted user successfully'
        })
    }
}
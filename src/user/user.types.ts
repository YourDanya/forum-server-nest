import {Request} from 'express'
import {User} from 'src/user/user.entity'
import * as core from 'express-serve-static-core'

export type FilteredUser = {
    _id: string
    name: string
    description: string | null
    birthDate: string | null
    email: string
    password: string
    photoUrl: string | null
}

export type UserRequest = Request & {user: User}

export type WithUserRequest<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>>
    = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {user: User}
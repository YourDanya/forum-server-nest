import {Request} from 'express'
import {User} from 'src/user/user.entity'

export type FilteredUser = {
    _id: string
    name: string
    description: string | null
    birthDate: string | null
    email: string
    password: string
    photoUrl: string | null
}

export type UserRequest = Request & {user: User, filteredUser: FilteredUser}


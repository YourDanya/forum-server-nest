import {Injectable} from '@nestjs/common'
import {User} from 'src/user/user.entity'
import {DeepPartial} from 'typeorm'

@Injectable()
export abstract class UserService {
    abstract findOne(data: DeepPartial<User>): Promise<User>

    abstract create(data: DeepPartial<User>): Promise<User>

    abstract updateOne(updateBody: DeepPartial<User>): Promise<User>
}
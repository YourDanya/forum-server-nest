import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'
import {Repository} from 'typeorm'
import {User} from 'src/user/user.entity'
import {FindOptionsWhere} from 'typeorm'
import {DeepPartial} from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>
    ) {}

    async findOne(data: DeepPartial<User>) {
        return await this.userRepository.findOneBy(data)
    }
    
    async create(data: DeepPartial<User>) {
        return await this.userRepository.save(data)
    }
    
    async updateOne (updateBody: DeepPartial<User>) {
        return await this.userRepository.save(updateBody)
    }
}
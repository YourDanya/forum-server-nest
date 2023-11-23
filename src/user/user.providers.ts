import {DataSource} from 'typeorm'
import {User} from 'src/user/user.entity'
import {RegisterHandler} from 'src/user/controller-handlers/register/register.handler'
import {UserService} from 'src/user/user.service'
import {SendRegisterCodeHandler} from 'src/user/controller-handlers/send-register-code/send-register-code.handler'
import {
    ConfirmRegisterEmailHandler
} from 'src/user/controller-handlers/confirm-register-email/confirm-register-email.handler'
import {UpdateUserHandler} from 'src/user/controller-handlers/update-user/update-user.handler'
import {LoginHandler} from 'src/user/controller-handlers/login/login.handler'

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE']
    },
    RegisterHandler,
    SendRegisterCodeHandler,
    ConfirmRegisterEmailHandler,
    UpdateUserHandler,
    LoginHandler,
    UserService
]
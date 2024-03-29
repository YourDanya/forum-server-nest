import {DataSource} from 'typeorm'
import {User} from 'src/user/user.entity'
import {RegisterHandler} from 'src/user/controller-handlers/register/register.handler'
import {SendRegisterCodeHandler} from 'src/user/controller-handlers/send-register-code/send-register-code.handler'
import {
    ConfirmRegisterEmailHandler
} from 'src/user/controller-handlers/confirm-register-email/confirm-register-email.handler'
import {UpdateUserHandler} from 'src/user/controller-handlers/update-user/update-user.handler'
import {LoginHandler} from 'src/user/controller-handlers/login/login.handler'
import {UserService} from 'src/user/user.service'
import {UserPgService} from 'src/user/services/user-pg.service'
import {GetMeHandler} from 'src/user/controller-handlers/get-me/get-me.handler'
import {SendCodeService} from 'src/user/utils/send-code/send-code.service'
import {ChangeEmailHandler} from 'src/user/controller-handlers/change-email/change-email.handler'
import {SendChangeEmailCodeHandler} from 'src/user/controller-handlers/send-change-email-code/send-change-email-code.handler'
import {ConfirmChangeEmailHandler} from 'src/user/controller-handlers/confirm-change-email/confirm-change-email.handler'
import {UpdatePasswordHandler} from 'src/user/controller-handlers/update-password/update-password.handler'
import {LogoutHandler} from 'src/user/controller-handlers/logout/logout.handler'

export const userProviders = [
    // {
    //     provide: 'USER_REPOSITORY',
    //     useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    //     inject: ['DATA_SOURCE']
    // },
    {
        provide: UserService,
        useClass: UserPgService,
        useFactory: null
    },
    SendCodeService,
    GetMeHandler,
    RegisterHandler,
    SendRegisterCodeHandler,
    ConfirmRegisterEmailHandler,
    ChangeEmailHandler,
    SendChangeEmailCodeHandler,
    ConfirmChangeEmailHandler,
    UpdatePasswordHandler,
    UpdateUserHandler,
    LoginHandler,
    LogoutHandler
]
import { Module } from '@nestjs/common'
import {ThreadModule} from 'src/thread/thread.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        ThreadModule,
        UserModule
    ]
})

export class AppModule {}

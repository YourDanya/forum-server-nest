import { CookieService } from 'src/utils/cookie/cookie.service'
import { Module } from '@nestjs/common'

@Module({
    providers: [CookieService],
    exports: [CookieService]
})

export class CookieModule {}

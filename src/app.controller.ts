import { AppService } from 'src/app.service'
import { Get } from '@nestjs/common'
import { Controller } from '@nestjs/common'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}

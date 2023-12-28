import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { Post } from '@nestjs/common'
import { Req } from '@nestjs/common'
import { Res } from '@nestjs/common'
import { Response, Request} from 'express'
import { ThreadService } from 'src/thread/thread.service'

@Controller('/thread')
export class ThreadController {
    constructor(private threadService: ThreadService) {}

    @Get('/')
    getThreads(@Res() res) {
        // const threads = this.threadSerice.findAll()
        // res.status(200).json({
        //     threads
        // })
    }

    @Get('/:id')
    getThread(@Req() req, @Res() res: Response<{ data: string }>) {
        res.status(200).json()
    }

    @Post('/')
    createThread(@Req() req, @Res() res) {
        console.log('req.body', req.body)
        res.status(200).json({
            message: 'thread created successfully',
        })
    }

}

import {Controller} from '@nestjs/common'
import {Get} from '@nestjs/common'
import {Res} from '@nestjs/common'
import {Response} from 'express'
import {Req} from '@nestjs/common'
import {Request} from 'express'
import {ParallelQueriesService} from 'src/mock/parallel-queries/parallel-queries.service'

@Controller('/parallel-queries')
export class ParallelQueriesController {
    constructor(private parallelQueriesService: ParallelQueriesService) {}

    @Get('/test')
    async test(@Res() res: Response, @Req() req: Request) {

        const resp = await this.parallelQueriesService.test()

        console.log('resp', resp)

        res.status(200).json({
            message: 'test made',
            i: req.query.i,
            ...resp
        })
    }

    @Get('/test-many')
    async testStart(@Res() res: Response, @Req() req: Request) {
        // const time = Date.now()
        for (let i = 0; i < 6; i++) {
            fetch(`http://localhost:5000/parallel-queries/test?i=${i}`)
        }

        res.status(200).json({
            message: 'test completed',
        })
    }

}
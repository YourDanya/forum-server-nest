import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadService {
    private readonly threads: {data: string}[] = []

    create({data}: {data: string}) {
        console.log('data', data)
        this.threads.push({data})
    }

    findAll() {
        return this.threads
    }
}
import {Injectable} from '@nestjs/common'
import {Inject} from '@nestjs/common'
import {Pool} from 'pg'
import {getQuery} from 'src/mock/parallel-queries/parallel-queries.queries'
import {Client} from 'pg'
import {PoolClient} from 'pg'

@Injectable()
export class ParallelQueriesService {
    // client: PoolClient
    constructor (@Inject('PG_CONNECTION') private pool: Pool) {}

    async test() {
        const startTime = Date.now()
        const client = await this.pool.connect()

        // if (!this.client) {
        //     this.client = await this.pool.connect()
        // }
        
        const res = await client.query(getQuery,[1])
        // client.release()

        const endTime = Date.now()
        const took = endTime - startTime

        return {
            took,
            res: res.rows
        }
    }

}

//
// console.log(Date.now() - time)
// console.log(res)
// for (let i = 0; i < 1; i++) {
//     const name = `'name${i}'`
//     const price = Math.round((Math.random() * 9000) + 1000)
//     let color = ['red', 'green', 'blue', 'black', 'white', 'yellow'][Math.round(Math.random() * 5)]
//     color = `'${color}'`
//     const sizesList = ["s", "xs", "m", "l"]
//     const sizesArr = []
//
//     let j = Math.round( Math.random() * (sizesList.length - 1))
//     while (j < sizesList.length) {
//         sizesArr.push(sizesList[j])
//         j+= Math.max(Math.round(Math.random() * (sizesList.length - j)), 1)
//     }
//
//     const sizes = "Array[" + sizesArr.reduce((str, elem, index, arr) => {
//         str += `'${elem}'`
//         if (index !== arr.length - 1) {
//             str+= ', '
//         }
//         return str
//     }, '') + "]"
//
//     // const json = JSON.stringify({name, price, color, sizes})
//
//     // const query = `&name=${name} &color=${color} &price=${price} &sizes=${sizes}`
//
//     // console.log(query)
//
//     // const execQuery = insertItemQuery(name, color, price, sizes, query)
//
//     // console.log('execQuery', execQuery)
//
//     console.log('sizes', sizes)
//
//     const time = Date.now()
//
//     const query = insertItemQuery2(name, color, price, sizes)
//
//     await this.pool.query(query)
//
//     // await this.pool.query(insertItemQuery3)
//     console.log(Date.now() - time)
// }
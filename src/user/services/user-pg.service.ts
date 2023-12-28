import {Inject} from '@nestjs/common'
import {Pool} from 'pg'
import {UserService} from 'src/user/user.service'
import {DeepPartial} from 'typeorm'
import {User} from 'src/user/user.entity'
import {getUserQuery} from 'src/user/user.queries'
import {createUserQuery} from 'src/user/user.queries'
import {updateUserQuery} from 'src/user/user.queries'
import {snakeToCamel} from 'src/utils/helpers/snake-to-camel/snake-to-camel'

export class UserPgService implements UserService{
    constructor(@Inject('PG_CONNECTION') private pool: Pool) {}

    async findOne(data: DeepPartial<User>) {
        const client = await this.pool.connect()

        let columnName: string
        let columnValue: string

        for (columnName in data) {
            columnValue = data[columnName]
        }

        const query = getUserQuery(columnName)
        const res = await client.query(query, [columnValue])
        client.release()

        return snakeToCamel<User>(res.rows[0])
    }

    async create(data: DeepPartial<User>) {
        const client = await this.pool.connect()

        const res = await client.query(createUserQuery, [data.name, data.email, data.password])

        client.release()

        return snakeToCamel<User>(res.rows[0])
    }

    async updateOne(data: DeepPartial<User>) {
        const client = await this.pool.connect()

        const names = []
        const values = []

        for (let name in data) {
            if (name === '_id') continue
            names.push(name)
            values.push(data[name])
        }

        values.push(data._id)

        const query = updateUserQuery(names, '_id')

        const res = await client.query(query, values)

        client.release()

        return snakeToCamel<User>(res.rows[0])
    }

}
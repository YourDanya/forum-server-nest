import {Pool} from 'pg'
import {User} from 'src/user/user.entity'
import {DataSource} from 'typeorm'

export const databaseProviders = [
    {
        provide: 'PG_CONNECTION',
        useValue: new Pool({
            host: 'localhost',
            port: 5432,
            user: 'root',
            password: 'pass',
            database: 'forum',
            max: 100
        })
    },
    // {
    //     provide: 'DATA_SOURCE',
    //     useFactory: async () => {
    //         const dataSource = new DataSource({
    //             type: 'postgres',
    //             host: 'localhost',
    //             port: 5432,
    //             username: 'root',
    //             password: 'pass',
    //             database: 'forum',
    //             synchronize: true,
    //             entities: [User]
    //         })
    //         return dataSource.initialize();
    //     },
    // }
]
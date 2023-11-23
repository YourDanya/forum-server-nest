import {DataSource} from 'typeorm'
import {User} from 'src/user/user.entity'

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'root',
                password: 'pass',
                database: 'forum',
                synchronize: true,
                entities: [User]
            })

            return dataSource.initialize();
        },
    }
]
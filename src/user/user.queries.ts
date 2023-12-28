import {createUpdateQuery} from 'src/utils/db/create-update-query/create-update-query'

export const createUserQuery = `
    insert into users (name, email, password)
    values ($1, $2, $3)
    returning _id, name, email
`

export const getUserQuery = (column: string) => `
    select * from users
    where ${column} = $1
`

export const updateUserQuery = (updateColumns: string[], whereColumn: string) => {
    return createUpdateQuery('users', updateColumns, whereColumn, ['_id', 'name', 'email'])
}

// export const updateUserCodeDataQuery = `
//     update users set () = ($1, $2, $3)
//     where _id = $4
//     returning _id, name, email,
// `
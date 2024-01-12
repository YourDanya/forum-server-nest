import {camelToSnake} from 'src/utils/helpers/camel-to-snake/camel-to-snake'

export const createUpdateQuery = (tableName: string, updateColumns: string[], whereColumn: string, returnColumns: string[]) => {
    let paramCount: number
    let columnNames = ''
    let params = ''

    for (paramCount = 1; paramCount <= updateColumns.length; paramCount++) {
        const name = updateColumns[paramCount - 1]
        columnNames += camelToSnake(name)
        params += `$${paramCount}`
        if (paramCount !== updateColumns.length) {
            columnNames += `, `
            params += ', '
        }
    }

    let setValue: string

    if (paramCount > 2) {
        setValue = `(${columnNames}) = (${params})`
    } else {
        setValue = `${columnNames} = ${params}`
    }

    return `
        update ${tableName} set ${setValue}
        where ${whereColumn} = $${paramCount}
        returning ${returnColumns.join(', ')}
    `
}
export const insertItemQuery = `
    INSERT INTO _item (name, color, price, sizes)
    VALUES ($1, $2, $3, $4)
`
export const insertItemQuery2 = (name: string, color: string, price: number, sizes: string) => `
    INSERT INTO _item (name, color, price, sizes)
    VALUES (${name}, ${color}, ${price}, ${sizes})
`
export const insertItemQuery3 = `
    INSERT INTO _item (name, color, price, sizes)
    VALUES ('name', 'green', 3807, Array['x', 'l'])
`
export const getQuery = `
    EXPLAIN ANALYZE SELECT COUNT(*) FROM item
    WHERE id > $1
`


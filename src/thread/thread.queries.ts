export const createThreadQuery = `
    INSERT INTO threads (name, description, authorId)
    VALUES ($1, $2, $3) RETURNING _id, name, description, authourId, createdAt`

export const getThreadQuery = `
    SELECT _id, name, description, authourId, createdAt FROM threads
    WHERE _id = $1 LIMIT 1
`
export const getThreadsQuery = `
    SELECT name, description, authourId, createdAt FROM threads
    WHERE _id > $1
    LIMIT $2
`

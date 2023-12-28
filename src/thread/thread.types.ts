export type CreateThreadData = {name: string, description: string, authorId: string}

export type GetThreadData = {_id: string}

export type GetThreadsData = {prevId: number, perPage: number}
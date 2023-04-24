export const getEntries = <ObjT extends object>(obj: ObjT) => {
    return Object.entries(obj) as { [KeyT in keyof ObjT]: [KeyT, ObjT[KeyT]] }[keyof ObjT][]
}

export const getValues = <ObjT extends object>(obj: ObjT) => {
    return Object.values(obj) as (ObjT[keyof ObjT])[]
}

export const getKeys = <ObjT extends object>(obj: ObjT) => {
    return Object.keys(obj) as (keyof ObjT) []
}
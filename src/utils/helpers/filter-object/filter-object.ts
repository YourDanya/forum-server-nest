export const filterObject = <T extends object,> (obj: object, names: string[]) => {
    const excluded = {}
    for (const name of names) {
        delete excluded[name]
    }

    const filteredObject = {}
    for (let prop in obj) {
        if (!excluded[prop]) {
            filteredObject[prop] = obj[prop]
        }
    }

    return filteredObject as T
}
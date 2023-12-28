export const snakeToCamel = <T extends object> (obj: object) => {
    const newObj = {}

    for (let prop in obj) {
        if (prop === '_id') {
            newObj[prop] = obj[prop]
            continue
        }

        const propWords = prop.split('_')
        let newProp = ''

        for (let i = 0; i < propWords.length; i++) {
            const propWord = propWords[i]

            if (i > 0) {
                newProp += propWord[0].toUpperCase() + propWord.substring(1)
            } else {
                newProp += propWord
            }
        }

        newObj[newProp] = obj[prop]
    }

    return newObj as T
}
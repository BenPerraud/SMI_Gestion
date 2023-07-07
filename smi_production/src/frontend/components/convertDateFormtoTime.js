function convertDateFormToTime (x) {
    const array = x.split("-")
    const date = new Date(array[0], array[1]-1, array[2], 0, 0, 0)
    const result = date.getTime()
    return result
}

export default convertDateFormToTime
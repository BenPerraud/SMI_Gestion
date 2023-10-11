function defaultDate () {
    const date= new Date()
    const dateOfTheDay = new Date (date.getFullYear(), date.getMonth(), date.getDate())
    const oneDayMills = 86400000

    function dateMonth (x) {
        const month = x.getMonth()+1
        if (month < 10) {
            return String("0"+month)
        }else {
            return month
        }}

    function dateDay (x) {
        const day = x.getDate()
        if (day < 10) {
            return String("0"+day)
        }else {
            return day
        }}
    
    if (date.getDay() === 1) {
        const newDate = new Date(dateOfTheDay.getTime()-3*oneDayMills)
        const defaultDate = [newDate.getFullYear(), dateMonth(newDate), dateDay(newDate)].join("-")
        return defaultDate
    } else {
        const newDate = new Date(dateOfTheDay.getTime()-oneDayMills)
        const defaultDate = [newDate.getFullYear(), dateMonth(newDate), dateDay(newDate)].join("-")
        return defaultDate
    }
}

export default defaultDate
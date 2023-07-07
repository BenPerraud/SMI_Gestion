import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import defaultDate from "../../components/defaultDate"

function RedirectToToday () {
    const date = defaultDate ()
    const form = date.split("-")
    const newDate = (new Date(form[0], form[1]-1, form[2], 0, 0, 0)).getTime()
    const navigate = useNavigate()

    useEffect (() => {
        navigate("/date/"+newDate)
    })
   
    return (
        <div></div>
    )
}

export default RedirectToToday
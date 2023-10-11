import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CardsProduction from "./cardsProduction.js"
import TrsDaily from "./trsDaily"
import {productionAPI} from "./../../components/routesApi"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function DailyProd () {

    function createDayProd (y, w) {
        for (let i of y) {
            const productionOfTheDay = i.production.filter((x) => x.date === w)
            i.productionOfTheDay = productionOfTheDay
        }
        return y
    }

    function createNewObjectProd (x) {
        const newProd = []
        for (let i of x) {
            for (let j of i.productionOfTheDay) {
                const newObject = {
                    pi: i.pi,
                    client: i.client,
                    designation: i.designation,
                    quantityTheorical: i.quantityTheorical,
                    comments: j.comments,
                    date: j.date,
                    prodTime: j.prodTime,
                    operator: j.operator,
                    quantityProd: j.quantityProd,
                    quantityWaste: j.quantityWaste,
                    _id: j._id
                }
                newProd.push(newObject)
            }
        }
        return newProd
    }
    
    /* Fonction pour renvoyer sur une nouvelle page au changement du form */
    const navigate = useNavigate()
    const params = (useLocation().pathname).substring(6)
    const [dateURL, setdateURL] = useState(params)
    const oneDay = 86400000

    function dayBefore () {
        const newDate = parseInt(dateURL)-oneDay
        const redirect = "/date/"+newDate
        navigate(redirect)
        setdateURL(newDate)
    }

    function dayAfter() {
        const newDate = parseInt(dateURL)+oneDay
        const redirect = "/date/"+newDate
        navigate(redirect)
        setdateURL(newDate)
    }

    function convertParams () {
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

        const newDate = new Date(parseInt(params))
        const value = [newDate.getFullYear(), dateMonth(newDate), dateDay(newDate)].join("-")
        return value
    }


    function formDate (e) {
        e.preventDefault()
        if (e.target.valueAsDate === null) {
            return    
        } else {
            const form = (e.target.value).split("-")
            const date = (new Date(form[0], form[1]-1, form[2], 0, 0, 0)).getTime()
            const redirect = "/date/"+date
            navigate(redirect)
            setdateURL(date)
        }
    }

    /* Fonction fetch pour récupérer les productions et les modifier avec uniquement les productions du jour */
    const [productions, setProductions] = useState([])
    
    useEffect(() => {
        const reqDate = parseInt(dateURL)
        fetch(
            productionAPI+"/date/"+dateURL, 
            {
                method: "GET",
                headers: {
                    "Accept": "*",
                    "Content-Type": "*/*",
                    "Origin": "*",
                    }
            })
            .then(res => res.json())
            .then(res => setProductions(createNewObjectProd(createDayProd(res, reqDate))))
            .catch(error => alert("Erreur : " + error))
    }, [dateURL])
    

    return (
        <div className="flexColumnGeneral rowGap20px">
            <div className="dateTRSdaily">
                <div className="trsDailyFlex">
                    <h1 className="titleH1">Production de la journée : </h1>
                    <div className="dayBeforeAfter">
                        <form>
                            <label className="cardsOperatorElement bold">Date : <input onChange={formDate} value={convertParams()} className="formElement widthDate" type="date" id="date" /></label>
                        </form>
                        <div className="chevronDay">
                            <FontAwesomeIcon onClick={() => dayBefore()} className="chevron" icon={faChevronLeft} />
                            <FontAwesomeIcon onClick={() => dayAfter()} className="chevron" icon={faChevronRight} />
                        </div>
                    </div>
                </div>
                <TrsDaily productions={productions}/>
            </div>
            <div className="rowGap20px">
                {productions.map(production => <CardsProduction production={production} key={production._id}/>)}
            </div>
        </div>
    )
}

export default DailyProd
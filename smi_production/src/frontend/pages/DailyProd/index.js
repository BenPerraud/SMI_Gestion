import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import defaultDate from "../../components/defaultDate"
import CardsProduction from "./cardsProduction.js"
import TrsDaily from "./trsDaily"


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

    function formDate (e) {
        e.preventDefault()

        const form = (e.target.value).split("-")
        const date = (new Date(form[0], form[1]-1, form[2], 0, 0, 0)).getTime()
        const redirect = "/date/"+date
        navigate(redirect)
        setdateURL(date)
    }

    /* Fonction fetch pour récupérer les productions et les modifier avec uniquement les productions du jour */
    const [productions, setProductions] = useState([])
    
    useEffect(() => {
        const reqDate = parseInt(dateURL)
        fetch("http://localhost:3000/api/production/date/"+dateURL,
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                'Access-Control-Allow-Origin': '*'
                },
            })
            .then(res => res.json())
            .then(res => setProductions(createNewObjectProd(createDayProd(res, reqDate))))
            .catch(error => alert("Erreur : " + error))
    }, [dateURL])
    

    return (
        <div className="flexColumnGeneral rowGap20px">
            <div className="trsDailyFlex">
                <h1 className="titleH1">Production de la journée : </h1>
                <TrsDaily productions={productions}/>
            </div>
            <form>
                <label className="cardsOperatorElement bold">Date : <input onChange={formDate} className="formElement widthDate" type="date" id="date" defaultValue={defaultDate()} /></label>
            </form>
            <div className="rowGap20px">
                {productions.map(production => <CardsProduction production={production} key={production._id}/>)}
            </div>
        </div>
    )
}

export default DailyProd
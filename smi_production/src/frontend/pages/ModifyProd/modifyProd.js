import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ModifyProd () {
    const [production, setProduction] = useState({})
    const params = useParams()
    const [operators, setOperators] = useState([])
    const fullNameOperators = operators.map(operator => [operator.firstname, operator.name].join(" "))
    const navigate = useNavigate()

    /* On récupère les opérateurs */
    useEffect (() => {
        fetch(
            "http://192.168.74.1:3001/api/operator",
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                "Origin": "*",
            }})
            .then(res => res.json())
            .then(datas => setOperators(datas))
            .catch(error => alert("Erreur : " + error))
    }, [])
    
    /* On récupère le PI et on filtre avec la production recherchée */
    useEffect (() => {
        function filterProd (x) {

            function dateOfProd (x) {
                const date= new Date(x)
            
                function dateMonth () {
                    const month = date.getMonth()+1
                    if (month < 10) {
                        return String("0"+month)
                    }else {
                        return month
                    }}
                
                function dateDay () {
                    const day = date.getDate()
                    if (day < 10) {
                        return String("0"+day)
                    }else {
                        return day
                    }}
            
                return [date.getFullYear(), dateMonth(), dateDay()].join("-")
            }

            function hours (x) {
                return Math.floor(x/60)
            }
        
            function minutes (x) {
                return x - Math.floor(x/60)*60
            }

            function operator (x) {
                return x.split(",") 
            }

            const result = x.production.filter(prod => prod._id === params._id)

            const newProd = {
                pi: x.pi,
                client: x.client,
                designation: x.designation,
                quantityTheorical: x.quantityTheorical,
                date: dateOfProd(result[0].date),
                comments: result[0].comments,
                ope0: operator(result[0].operator[0])[0],
                ope1: operator(result[0].operator[0])[1],
                ope2: operator(result[0].operator[0])[2],
                hours: hours(result[0].prodTime),
                minutes: minutes(result[0].prodTime),
                quantityProd: result[0].quantityProd,
                quantityWaste: result[0].quantityWaste,
                _idProd: result[0]._id
            }
            return newProd
        }

        fetch(
            "http://192.168.74.1:3001/api/production/"+params.pi,
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                "Origin": "*",
            }})
            .then(res => res.json())
            .then(res => setProduction(filterProd(res)))
            .catch(error => alert("Erreur : " + error))
    }, [params])

    /* On envoi le form pour updater la production */
    function updateProd (e) {
        e.preventDefault()
        const dateInput = (document.getElementById("date").value).split("-")
        const date = Date.parse(new Date(dateInput[0], dateInput[1]-1, dateInput[2], 0, 0, 0))
        
        const ope0 = document.getElementById("operator0").value
        const ope1 = document.getElementById("operator1").value
        const ope2 = document.getElementById("operator2").value
        const operators = [ope0, ope1, ope2]
        const operator = operators.filter(Boolean)

        const h = Number(document.getElementById("heures").value)
        const m = Number(document.getElementById("minutes").value)
        const totTimeProd = (h*60 + m)
        
        const form = e.target
        const formData = new FormData(form)
        
        formData.append("date", date)
        formData.append("prodTime", totTimeProd)
        formData.append("operator", operator)
        
        for (let value of formData.values()) {    
            if (h === 0 || m === 0) {
                alert("Les heures ou les minutes ne sont pas renseignées, veuillez recommencer")
                break
            } else {
                if (value === "") {
                    alert("Un des champs du questionnaire n'est pas rempli")
                    break
                } else { 
                    if( operator.length > new Set(operator).size) {
                        alert("Un(e) opérateur/trice a été renseigné au moins deux fois, veuillez recommencer.")
                        break
                    } else {
                    fetch(
                        "http://192.168.74.1:3001/api/production/"+params.pi+"/"+params._id,
                        {method: 'PUT',
                        body: formData,
                        headers: {
                            "Accept": "*",
                            "Content-Type": "*/*",
                            "Origin": "*",
                        }})
                        .then(res => res.json())
                        .then(res => alert(res+params.pi))
                        .catch(error => alert("Erreur : " + error))
                    form.reset()
                    navigate("/")
                    break
                    }
                }
            }
        }
    }

    return (
        <div className="flexColumnGeneral">
            <h1 className="titleH1">Modifier le PI suivant : {production.pi} / {production.client} / {production.designation}</h1>
            <form className="form" name="updateProd" onSubmit={updateProd}>
                <label>Date : <input className="formElement widthDate" type="date" id="date" defaultValue={production.date}/></label>
                <label>Opérateur/trice #1 : 
                    <select className="formElement widthOperator" type="text" id="operator0">
                        <option>{production.ope0}</option>
                        {fullNameOperators.map(fullNameOperator => <option key={fullNameOperators.indexOf(fullNameOperator)}>{fullNameOperator}</option>)}
                    </select>
                </label>
                <label>Opérateur/trice #2 : 
                    <select className="formElement widthOperator" type="text" id="operator1">
                        <option>{production.ope1}</option>
                        {fullNameOperators.map(fullNameOperator => <option key={fullNameOperators.indexOf(fullNameOperator)}>{fullNameOperator}</option>)}
                    </select>
                </label>
                <label>Opérateur/trice #3 : 
                    <select className="formElement widthOperator" type="text" id="operator2">
                        <option>{production.ope2}</option>
                        {fullNameOperators.map(fullNameOperator => <option key={fullNameOperators.indexOf(fullNameOperator)}>{fullNameOperator}</option>)}
                    </select>
                </label>
                <label>Temps de production : <input className="formElement widthTimeProd" type="number" id="heures" defaultValue={production.hours}/> heures et <input className="formElement widthTimeProd" type="number" id="minutes" defaultValue={production.minutes}/> minutes</label>
                <label>Quantité produite : <input className="formElement widthProdQuantity" type="text" name="quantityProd" defaultValue={production.quantityProd}/></label>
                <label>Quantité rebut : <input className="formElement widthProdWaste" type="text" name="quantityWaste" defaultValue={production.quantityWaste}/></label>
                <label>Commentaires : <input id="formComments" className="formElement widthComments" type="text" name="comments" defaultValue={production.comments}/></label>
                <button className="formBtn" type="submit">Ajouter à la base de données</button>
            </form>
        </div>
    )
}

export default ModifyProd
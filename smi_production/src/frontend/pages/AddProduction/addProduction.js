import { useEffect, useState } from "react"
import defaultDate from "../../components/defaultDate"
import "./index.css"

function AddProduction ({pi, client, designation, setCount}) {
    
    /* Fonction pour récupérer les opérateurs pour les options de selection du form */
    const [operators, setOperators] = useState([])
    const fullNameOperators = operators.map(operator => [operator.firstname, operator.name].join(" "))
    
    useEffect (() => {
        fetch(
            "http://localhost:3001/api/operator",
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                "Origin": "*",
            }})
            .then(res => res.json())
            .then(datas => setOperators(datas))
            .catch(error => alert("Erreur : " + error))
    }, [])

    
    /* Fonction appelée pour envoi du questionnaire */
    function postProduction (e) {
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
                        fetch("http://localhost:3000/api/production/"+pi, {method: 'POST', body: formData})
                            .then(res => res.json())
                            .then(res => alert(res+pi))
                            .catch(error => alert("Erreur : " + error))
                        form.reset()
                        setCount(0)
                        break
                    }
                }
            }
        }
    }

    return (
        <div className="rowGap20px">
            <h1 className="titleH1">Etape 2 : ajouter une nouvelle production au PI suivant : {pi} / {client} / {designation}</h1>
            <form className="form" name="createOperatorForm" method="post" encType="multipart/form-data" onSubmit={postProduction}>
                <label>Date : <input className="formElement widthDate" type="date" id="date" defaultValue={defaultDate()} /></label>
                <label>Opérateur/trice #1 : 
                    <select className="formElement widthOperator" type="text" id="operator0">
                        <option value=""> -- Choisir un(e) opérateur/trice -- </option>
                        {fullNameOperators.map(fullNameOperator => <option key={fullNameOperators.indexOf(fullNameOperator)}>{fullNameOperator}</option>)}
                    </select>
                </label>
                <label>Opérateur/trice #2 : 
                    <select className="formElement widthOperator" type="text" id="operator1">
                        <option value=""> -- Choisir un(e) opérateur/trice -- </option>
                        {fullNameOperators.map(fullNameOperator => <option key={fullNameOperators.indexOf(fullNameOperator)}>{fullNameOperator}</option>)}
                    </select>
                </label>
                <label>Opérateur/trice #3 : 
                    <select className="formElement widthOperator" type="text" id="operator2">
                        <option value=""> -- Choisir un(e) opérateur/trice -- </option>
                        {fullNameOperators.map(fullNameOperator => <option key={fullNameOperators.indexOf(fullNameOperator)}>{fullNameOperator}</option>)}
                    </select>
                </label>
                <label>Temps de production : <input className="formElement widthTimeProd" type="number" id="heures"/> heures et <input className="formElement widthTimeProd" type="number" id="minutes"/> minutes</label>
                <label>Quantité produite : <input className="formElement widthProdQuantity" type="text" name="quantityProd" /></label>
                <label>Quantité rebut : <input className="formElement widthProdWaste" type="text" name="quantityWaste" /></label>
                <label>Commentaires : <input id="formComments" className="formElement widthComments" type="text" name="comments" defaultValue="Pas de commentaires"/></label>
                <button className="formBtn" type="submit">Ajouter à la base de données</button>
            </form>
        </div>
    )
}

export default AddProduction


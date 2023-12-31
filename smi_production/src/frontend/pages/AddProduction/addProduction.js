import { useEffect, useState } from "react"
import defaultDate from "../../components/defaultDate"
import "./index.css"
import { productionAPI } from "../../components/routesApi"
import { operatorAPI } from "../../components/routesApi"

function AddProduction ({pi, client, designation, setCount}) {
    
    /* Fonction pour récupérer les opérateurs pour les options de selection du form */
    const [operators, setOperators] = useState([])
    const fullNameOperators = operators.map(operator => [operator.firstname, operator.name].join(" "))
    
    useEffect (() => {
        fetch(
            operatorAPI,
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
        
        if ((h === 0 && m === 0) || formData.get("quantityProd") === "" || formData.get("quantityWaste") === "" || formData.get("operator") === "") {
            alert("Un des champs du questionnaire n'est pas rempli, veuillez recommencer")
        } else { 
            if( operator.length > new Set(operator).size) {
                alert("Un(e) opérateur/trice a été renseigné au moins deux fois, veuillez recommencer.")
            } else {
                fetch(
                    productionAPI+"/"+pi,
                    {method: 'POST',
                    body: formData,
                    headers: {
                        "Origin": "*",
                    }})
                    .then(res => res.json())
                    .then(res => alert(res+"00"+pi+" \nClient : "+client+"\nDésignation : "+designation+"\nOpérateur/trice : "+operator+"\nQte Produite : "+formData.get("quantityProd")+"\nQte rebut : "+formData.get("quantityWaste")+"\nTemps de production : "+h+" heures "+m+" min\nCommentaires : "+formData.get("comments")))
                    .catch(error => alert("Erreur : " + error))
                form.reset()
                setCount(0)
            }
        }
        
    }

    return (
        <div className="rowGap20px">
            <h1 className="titleH1">Etape 2 : ajouter une nouvelle production au PI suivant : 00{pi} / {client} / {designation}</h1>
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


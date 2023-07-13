import { useEffect, useState } from "react"
import CardsOperator from "./cardsOperator"
import CreateOperator from "./createOperator"
import { operatorAPI } from "../../../components/routesApi"

function OpeMonitoring () {
    const [operators, setOperators] = useState([])
    const [formState, setFormState] = useState(0)
    
    useEffect (() => {
        fetch(
            {operatorAPI},
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                "Origin": "*",
            }})
            .then(res => res.json())
            .then(datas => setOperators(datas))
            .catch(error => alert("Erreur : " + error))
    }, [formState])

    return (
        <div className="rowGap50px">
            <CreateOperator formState={formState} setFormState={setFormState}/>
            <div className="rowGap20px">
                <h1 className="titleH1">Modifier ou supprimer un(e) opérateur/trice</h1>
                <div className="operatorsFlex">{operators.map(operator => CardsOperator(operator, {formState, setFormState}))}</div>
            </div>
        </div>
    )
}

export default OpeMonitoring
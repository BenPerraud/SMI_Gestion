import DeleteOperator from "./deleteOperator"
import { NavLink } from "react-router-dom"
import "./../../AddProduction/index.css"

function CardsOperator (x, {formState, setFormState}) {
    const urlModify = ["/Modifier-un-operateur/", x._id].join("")
    return (
        <div key={x._id} className="cards">
            <div className="cardsOperator">
                <p className="cardsOperatorElement bold">Prénom : {x.firstname}</p>
                <p className="cardsOperatorElement">Nom : {x.name}</p>
            </div>
            <div className="btnOperatorFlex">
                <NavLink to={urlModify} className="navLinkModify">Modifier</NavLink>
                <button onClick={() => DeleteOperator(x, {formState, setFormState})} className="btnOperator red">Supprimer</button>
            </div>
        </div>
    )
}

export default CardsOperator
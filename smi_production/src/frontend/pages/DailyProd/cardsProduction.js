import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { NavLink } from 'react-router-dom'
import "./index.css"

function CardsProduction ({production}) {
    const [isOpen, setIsOpen] = useState(false)

    function convertToHours (x) {
        const hours = Math.floor(x/60)
        const reste = (x-hours*60)
        const result = [hours, "h", reste, "min"].join(" ")
        return result
    }

    function arrayOperators (x) {
        const operators = x[0].split(",")
        return operators
    }

    function handleChange () {
        setIsOpen(!isOpen)
    }

    const chevron = (isOpen ? <FontAwesomeIcon onClick={() => handleChange()} className="chevron" icon={faChevronDown} /> : <FontAwesomeIcon onClick={() => handleChange()} className="chevron" icon={faChevronUp} />)
    const urlModify = production.pi+"/"+production._id
    
    return (
        <div key={production._id} className="cardsProdFlex">
            <div className="cardsProdDetails">
                <div className="cardsProdFlexDesi underline">{production.client} / {production.designation} (PI : 00{production.pi})</div>
                {chevron}
            </div>
            <div className="cardsProdFlexProd">
                <div className="cardsProdFlexProdElement">Qte produite : {production.quantityProd.toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElement">Qte rebut : {production.quantityWaste.toLocaleString()} pcs ({((production.quantityWaste/production.quantityProd)*100).toFixed(1)}%)</div>
                <div className="cardsProdFlexProdElement validProd">Qte validée : {(production.quantityProd-production.quantityWaste).toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElementTheo">(Qte théorique : {Math.floor(((production.quantityTheorical/420)*production.prodTime)).toLocaleString()} pcs)</div>
            </div>
            <div className={isOpen ? "cardsProdFlexDetails"  : "closed"}>
                <div className="cardsProdFlexDesi">Détails de la production :</div>
                <div className="cardsDetailsElement">- Temps de production : {convertToHours(production.prodTime)} (prod hors rebut/h : {Math.trunc(((production.quantityProd-production.quantityWaste)/(production.prodTime/60))).toLocaleString()} pcs)</div>
                <div>
                    <div className="cardsDetailsElement">- Opérateur/trice :</div>
                    {(arrayOperators(production.operator)).map(operator => <div className="cardsProdFlexProdElementTheo padding" key={operator}>{operator}</div>)}
                </div>
                <div className="cardsDetailsElement">- Commentaires : {production.comments}</div>
                <NavLink to={urlModify} className="navLinkModify">Modifier</NavLink>
            </div>
        </div>
    )
}

export default CardsProduction
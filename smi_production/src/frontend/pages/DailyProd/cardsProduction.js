import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { NavLink } from 'react-router-dom'
import "./index.css"
import { useNavigate } from "react-router-dom"

function CardsProduction ({production}) {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const pi = {pi : production.pi}

    function redirect () {
        navigate("/Analyse-par-Pi", {state: pi})
    }

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

    const chevron = (isOpen ? <FontAwesomeIcon onClick={() => handleChange()} className="chevron" icon={faChevronUp} /> : <FontAwesomeIcon onClick={() => handleChange()} className="chevron" icon={faChevronDown} />)
    const urlModify = production.pi+"/"+production._id
    
    return (
        <div key={production._id} className="cardsProdFlex">
            <div className="cardsProdDetails">
                <div className='cardsProdFlexTitle'>
                    <div className="cardsProdFlexDesi underline">{production.client} / {production.designation} (PI : 00{production.pi})</div>
                    <FontAwesomeIcon onClick={() => redirect()} className="chevron" icon={faChartLine} /> 
                </div>
                {chevron}
            </div>
            <div className="cardsProdFlexProd">
                <div className="cardsProdFlexProdElement">Qte compteur : {production.quantityProd.toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElement">Qte rebut : {production.quantityWaste.toLocaleString()} pcs ({((production.quantityWaste/production.quantityProd)*100).toFixed(1)}%)</div>
                <div className="cardsProdFlexProdElement validProd">Qte bonne : {(production.quantityProd-production.quantityWaste).toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElement theo">(Qte théorique : {Math.floor(((production.quantityTheorical/420)*production.prodTime)).toLocaleString()} pcs)</div>
                <div className="cardsProdFlexProdElement validProd">TRS : {(((production.quantityProd-production.quantityWaste)/((production.quantityTheorical/420)*production.prodTime))*100).toFixed(1)} %</div>
            </div>
            <div className={isOpen ? "cardsProdFlexDetails"  : "closed"}>
                <div className="cardsProdFlexDesi">Détails de la production :</div>
                <div className="cardsDetailsElement">- Temps de production : {convertToHours(production.prodTime)}</div>
                <div className="cardsDetailsElement">- Cadence / h : {Math.trunc(((production.quantityProd)/(production.prodTime/60))).toLocaleString()} pcs ({Math.trunc(production.quantityTheorical/7).toLocaleString()} pcs théoriques)</div>
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
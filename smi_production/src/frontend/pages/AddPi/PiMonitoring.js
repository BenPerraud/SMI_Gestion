import "./index.css"

function PiMonitoring({allPi}) {
    return (
        <div>
            <h1 className="titleH1">Liste de tous les PI renseignés dnas la base de données</h1>
            <div className="allPi">{allPi.map(elem => 
                <div className="cardsPi">
                    <p className="piElement bold">PI : 00{elem.pi}</p>
                    <p className="piElement">Client : {elem.client}</p>
                    <p className="piElement">Désignation : {elem.designation}</p>
                    <p className="piElement">Qte Théorique : {elem.qteTheorical} pcs</p>
                </div>)}
            </div>
        </div>
    )
}

export default PiMonitoring
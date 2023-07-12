import "./index.css"

function PiMonitoring({allPiDesi}) {
    return (
        <div>
            <h1 className="titleH1">Liste de tous les PI renseignés dans la base de données</h1>
            <div className="allPi">{allPiDesi.map(elem => 
                <div key={allPiDesi.pi} className="cardsPi">
                    <p className="piElement bold">PI : 00{elem.pi}</p>
                    <p className="piElement">{elem.designation}</p>
                    <p className="piElement">{elem.client}</p>
                </div>)}
            </div>
        </div>
    )
}

export default PiMonitoring
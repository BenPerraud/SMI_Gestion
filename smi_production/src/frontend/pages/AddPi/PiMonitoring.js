function PiMonitoring({allPi}) {
    return (
        <div>
            <h1 className="titleH1">Liste de tous les PI renseignés dnas la base de données</h1>
            <div>{allPi.map(elem => 
                <div>
                    <p>PI : 00{elem.pi}</p>
                    <p>Client : {elem.client}</p>
                    <p>Désignation : {elem.designation}</p>
                    <p>Qte Théorique : {elem.qteTheorical} pcs</p>
                </div>)}
            </div>
        </div>
    )
}

export default PiMonitoring
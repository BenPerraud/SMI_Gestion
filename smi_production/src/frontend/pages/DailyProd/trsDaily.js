function TrsDaily ({productions}) {

    /* Calcul de la somme des pièces produites */
    const sumProd = productions.map(production => (production.quantityProd-production.quantityWaste)).reduce((prev, curr) => prev + curr, 0)
    const sumProdAll = productions.map(production => (production.quantityProd)).reduce((prev, curr) => prev + curr, 0)
    
    /* Calcul du TRS journalier : somme des TRS individuels divisée par le nombre de production */
    const sumIndividualTRS = productions.map(production => ((production.quantityProd-production.quantityWaste)/((production.quantityTheorical/420)*production.prodTime))*(production.quantityProd-production.quantityWaste)).reduce((prev, curr) => prev + curr, 0)
    const dailyTRS = ((sumIndividualTRS/sumProd)*100).toFixed(1)
    

    /* Calcul du taux de rebut journalier : somme des taux de rebut individuels divisée par le nombre de production */
    const sumIndividualWaste = productions.map(production => ((production.quantityWaste/production.quantityProd))*production.quantityProd).reduce((prev, curr) => prev + curr, 0)
    const dailyWaste = ((sumIndividualWaste/sumProdAll)*100).toFixed(1)
    
    return (
        <div className="daily">
            <div className="trsDaily titleH1">TRS de la journée : {isNaN(dailyTRS) ? "-- " : dailyTRS}%</div>
            <div className="othersDaily titleH1">Taux de rebut : {isNaN(dailyWaste) ? "-- " : dailyWaste}%</div>
        </div>
    )
}

export default TrsDaily
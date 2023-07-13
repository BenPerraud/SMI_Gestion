function TrsDaily ({productions}) {
    
    const sumTheorical = productions.map(production => production.quantityTheorical).reduce((prev, curr) => prev + curr, 0)
    const sumWaste = productions.map(production => production.quantityWaste).reduce((prev, curr) => prev + curr, 0)
    const sumProd = productions.map(production => production.quantityProd).reduce((prev, curr) => prev + curr, 0)
    const sumProdTime = productions.map(production => production.prodTime).reduce((prev, curr) => prev + curr, 0)
    const cadenceTheorical = sumTheorical/sumProdTime
    const cadenceReal = (sumProd-sumWaste)/sumProdTime
    const trsGlobal = ((cadenceReal/cadenceTheorical)*100).toFixed(1)
    
    return (
        <div className="trsDaily titleH1">TRS de la journée : {isNaN(trsGlobal) ? "-- " : trsGlobal}%</div>
    )
}

export default TrsDaily
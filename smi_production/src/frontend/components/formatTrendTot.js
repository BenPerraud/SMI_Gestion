import createTrend from "./createTrend"

function formatTrendTot (x) {
    /* Calcul tendance rebut */
    const timestamps = x.map((data) => data.date)
    const xMax = Math.max(...timestamps)
    const xMin = Math.min(...timestamps)

    const trendWaste = () => {
        const trend = createTrend(x, "date", "tauxRebutTot");

        return [
            { taux_de_rebut: trend.calcY(xMin), date: xMin },
            { taux_de_rebut: trend.calcY(xMax), date: xMax }
        ]
        }    

    const wasteRebut = trendWaste()

    /* Calcul tendance cadence */
    const trendCadence = () => {
        const trend = createTrend(x, "date", "cadenceRealTot");

        return [
            { cadence: trend.calcY(xMin), date: xMin },
            { cadence: trend.calcY(xMax), date: xMax }
        ]
        }

    const cadenceTrend = trendCadence()

    /* Calcul tendance trs */
    const trendTrs = () => {
        const trend = createTrend(x, "date", "trsTot");

        return [
            { trs: trend.calcY(xMin), date: xMin },
            { trs: trend.calcY(xMax), date: xMax }
        ]
        }

    const trsTrend = trendTrs()

    x[0].taux_de_rebut_trend = wasteRebut[0].taux_de_rebut
    x[x.length-1].taux_de_rebut_trend = wasteRebut[1].taux_de_rebut
    x[0].cadence_trend = cadenceTrend[0].cadence
    x[x.length-1].cadence_trend = cadenceTrend[1].cadence
    x[0].trs_trend = trsTrend[0].trs
    x[x.length-1].trs_trend = trsTrend[1].trs
    return x
}

export default formatTrendTot
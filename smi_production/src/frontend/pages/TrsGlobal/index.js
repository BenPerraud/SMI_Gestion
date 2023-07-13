import { useState, useEffect } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import CustomTooltipWasteTot from "./tooltipWasteTot"
import CustomTooltipTrsTot from "./tooltipTrsTot"
import CustomTooltipCadenceTot from "./tooltipCadenceTot"
import convertDateFormToTime from "../../components/convertDateFormtoTime"
import formatTrendTot from "../../components/formatTrendTot"
import { productionAPI } from "../../components/routesApi"

function TrsGlobal () {
    const [trs, setTrs] = useState({})
    const [count, setCount] = useState (0)

    function getDate (e) {
        try{
            e.preventDefault()

            const firstDateInput = convertDateFormToTime(document.getElementById("dateBegin").value)
            const lastDateInput = convertDateFormToTime(document.getElementById("dateEnd").value)
            
            const result = trs.filter(element => element.date >= firstDateInput && element.date <= lastDateInput)
            formatTrendTot(result)
            setTrs(result)
        } catch {
            alert("Les dates renseignées ne correspondent pas")
        }
    }

    function reinitiate () {
        setCount(count+1)
        document.getElementById('formDate').reset()
    }

    

    function formatDatas (x) {
        /* On crée un tableau avec toutes les productions */
        const array = []
        for (let i of x) {
            for (let j of i.production) {
                const newObject = {
                    qteTheo : i.quantityTheorical,
                    qteRebut: j.quantityWaste,
                    qteProd: j.quantityProd,
                    date: j.date,
                    prodTime: j.prodTime
                }
                array.push(newObject)
            }
        }


        /* On crée un tableau avec toutes les dates uniques */ 
        const arrayDate = []
        for (let k of array) {
            arrayDate.push(k.date)
        }
        const arrayDateUnique = [...new Set(arrayDate)]
        

        /* On crée un tableau avec pour chaque Date unique, les valeurs de production */
        const result = []
        for (let l of arrayDateUnique) {
            
            /* Bloc des dates */
            function dateMonth (x) {
                const month = x+1
                if (month < 10) {
                    return String("0"+month)
                }else {
                    return month
                }}
            
            function dateDay (x) {
                const day = x
                if (day < 10) {
                    return String("0"+day)
                }else {
                    return day
                }}
            const date = new Date(l)
            const dateProd = [dateDay(date.getDate()), dateMonth(date.getMonth()), date.getFullYear()-2000].join("/")

            const test = array.filter(x => x.date === l)
            const numberOfProd = test.length
            const qteTheo = test.map(test => test.qteTheo).reduce((prev, curr) => prev + curr, 0)
            const qteRebut = test.map(test => test.qteRebut).reduce((prev, curr) => prev + curr, 0)
            const qteProd = test.map(test => test.qteProd).reduce((prev, curr) => prev + curr, 0)
            const prodTime = test.map(test => test.prodTime).reduce((prev, curr) => prev + curr, 0)
            const objectFormatted = {
                date: l,
                dateProd: dateProd,
                qteTheoTot: qteTheo,
                qteRebutTot: qteRebut,
                qteProdTot: qteProd,
                prodTimeTot: prodTime,
                prodTimeTheorical: numberOfProd*60*7,
                cadenceRealTot: (qteProd-qteRebut)/(prodTime/60),
                cadenceTheoTot: (qteTheo/(numberOfProd*7)),
                tauxRebutTot: (qteRebut/qteProd)*100,
                trsTot: ((qteProd-qteRebut)/qteTheo)*100,
                trsTheoTot: 100,
                numberOfProd: numberOfProd
            }
            result.push(objectFormatted)
            result.sort((a, b) => a.date - b.date)
        }
        formatTrendTot(result)
        return result
    }

    useEffect(() => {
        fetch(
            {productionAPI},
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                "Origin": "*",
                }})
            .then(res => res.json())
            .then(res => setTrs(formatDatas(res)))
            .catch(error => alert("Erreur : " + error))
    }, [count])
    
    const toPercent = (decimal) => `${(decimal).toFixed(1)}%`

    return (
        <div className="flexColumnGeneral">
            <div className="rowGap20px">
                <h1 className="titleH1">Analyse globale de toutes les productions cumulées</h1>
                <div className="formDateFlex">
                    <form className="formDate" id="formDate" onSubmit={getDate}>
                        <label>Date de début : <input className="formElement widthDate" type="date" id="dateBegin" /></label>
                        <label>Date de fin : <input className="formElement widthDate" type="date" id="dateEnd" /></label>
                        <button className="formBtn" type="submit">Filtrer selon les dates</button>
                    </form>
                    <button className="reinitiate" onClick={reinitiate}>Réinitialiser les dates</button>
                </div>
                <div className="rowGap15px">
                    <h2 className="titleH2">Cadence globale par heure (hors rebuts)</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={trs}>
                                <CartesianGrid stroke="#9ba9c6" strokeDasharray="3 3"/>
                                <XAxis dataKey="dateProd" tick={{fontSize: 15}} height={65} angle={-45} textAnchor="end" tickSize={12}/>
                                <YAxis yAxisId="left"/>
                                <Line yAxisId="left" type="monotone" dataKey="cadenceRealTot" stroke="#203864" strokeWidth={2} dot={false}/>
                                <Line yAxisId="left" type="monotone" dataKey="cadenceTheoTot" stroke="#882e3d" strokeWidth={2} dot={false}/>
                                <Line yAxisId="left" type="monotone" dataKey="cadence_trend" connectNulls={true} stroke="#e52fd7" strokeWidth={2} dot={false}/>
                                <Tooltip content={<CustomTooltipCadenceTot />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rowGap15px">
                    <h2 className="titleH2">Taux de rebut global</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={trs}>
                                <CartesianGrid stroke="#9ba9c6" strokeDasharray="3 3"/>
                                <XAxis dataKey="dateProd" tick={{fontSize: 15}} height={65} angle={-45} textAnchor="end" tickSize={12}/>
                                <YAxis yAxisId="left" tickFormatter={toPercent}/>
                                <Line yAxisId="left" type="monotone" dataKey="tauxRebutTot" stroke="#203864" strokeWidth={2} dot={false}/>
                                <Line yAxisId="left" type="monotone" dataKey="taux_de_rebut_trend" connectNulls={true} stroke="#e52fd7" strokeWidth={2} dot={false} />
                                <Tooltip content={<CustomTooltipWasteTot />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rowGap15px">
                    <h2 className="titleH2">TRS global</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={trs}>
                                <CartesianGrid stroke="#9ba9c6" strokeDasharray="3 3"/>
                                <XAxis dataKey="dateProd" tick={{fontSize: 15}} height={65} angle={-45} textAnchor="end" tickSize={12}/>
                                <YAxis yAxisId="left" tickFormatter={toPercent}/>
                                <Line yAxisId="left" type="monotone" dataKey="trsTot" stroke="#203864" strokeWidth={2} dot={false}/>
                                <Line yAxisId="left" type="monotone" dataKey="trsTheoTot" stroke="#882e3d" strokeWidth={2} dot={false}/>
                                <Line yAxisId="left" type="monotone" dataKey="trs_trend" connectNulls={true} stroke="#e52fd7" strokeWidth={2} dot={false} />
                                <Tooltip content={<CustomTooltipTrsTot />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrsGlobal
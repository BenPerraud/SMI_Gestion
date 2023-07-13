import OpeMonitoring from "./Operator/opeMonitoring"
import PiMonitoring from "./PiMonitoring"
import { useState, useEffect} from "react"
import { productionAPI } from "../../components/routesApi"

function AddPi () {
    const [allPiDesi, setAllPiDesi] = useState([])
    const [allPi, setAllPi] = useState([])
    const [count, setCount] = useState(0)

    function createPi (e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        
        if (formData.get("pi") === "" || formData.get("client") === "" || formData.get("designation") === "" || formData.get("quantityTheorical") === "") {
            alert("Un des champs du questionnaire n'est pas rempli")
        } else {
            if (allPi.includes(formData.get("pi"))) {
                alert("Le PI renseigné existe déjà dans la base de données")
                form.reset()
            } else {
                fetch(
                    {productionAPI},
                    {method: 'POST', 
                    body: formData,
                    headers: {
                        "Origin": "*",
                    }})
                        .then(res => res.json())
                        .then(res => alert(res))
                        .catch(error => alert("Erreur : " + error))
                setCount(count+1)
                form.reset()
            }
        }
    }

    function formatDatas (x) {
        const newArray = []
        const newArrayPi = []
        for (let i of x) {
            const newObject = {
            pi: i.pi,
            client: i.client,
            designation: i.designation,
            qteTheorical: i.quantityTheorical
            }
            newArray.push(newObject)
            newArrayPi.push(i.pi)
        }
        newArray.sort((a, b) => b.pi - a.pi)
        setAllPiDesi(newArray)
        setAllPi(newArrayPi)
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
            .then(res => formatDatas(res))
            .catch(error => alert("Erreur : " + error))
    }, [count])
    

    return (
        <div className="flexColumnGeneral">
            <div className="rowGap20px">
                <h1 className="titleH1">Ajouter un nouveau PI</h1>
                <form className="form" name="form" method="post" encType="multipart/form-data" onSubmit={createPi}>
                    <label>PI : 00<input className="formElement widthPi" type="text" name="pi" /></label>
                    <label>Client : <input className="formElement widthClient" type="text" name="client" /></label>
                    <label>Désignation projet : <input className="formElement widthDesignation" type="text" name="designation" /></label>
                    <label>Quantité théorique : <input className="formElement widthProdTheo" type="text" name="quantityTheorical" /> pièces théoriques sur base 7 heures</label>
                    <button className="formBtn" type="submit">Ajouter à la base de données</button>
                </form>
            </div>
            <OpeMonitoring />
            <PiMonitoring allPiDesi={allPiDesi}/>
        </div>
    )
}

export default AddPi
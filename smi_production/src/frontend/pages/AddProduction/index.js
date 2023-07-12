import { useState } from "react"
import AddProduction from "./addProduction"
import "./index.css"

function ProdMonitoring () {
    const [production, setProduction] = useState([])
    const [count, setCount] = useState(0)
        
    function getOneProduction (e) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const pi = formData.get("pi")

        fetch(
            "http://192.168.74.1:3001/api/production/"+pi,
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                "Origin": "*",
            }})
            .then(res => res.json())
            .then(datas => {
                if (datas === null) {
                    alert("Le PI renseigné n'existe pas, veuillez recommencer")
                } else {
                    setProduction(datas)
                    setCount(count+1)
                }
                })
            .catch(error => alert("Erreur : " + error))

        form.reset()
    }

    return (
        <div className="flexColumnGeneral">
            <div className={count === 1 ? "closed" : "rowGap20px"}>
                <h1 className="titleH1">Etape 1 : rechercher le PI</h1>
                <form className="form" name="createOperatorForm" onSubmit={getOneProduction}>
                    <label>Indiquer le PI : <input className="formElement" type="text" name="pi" id="pi" /></label>
                    <button className="formBtn" type="submit">Rechercher</button>
                </form>
            </div>
            <div className={count === 0 ? "closed" : "open"}>
                <AddProduction pi={production.pi} client={production.client} designation={production.designation} prodTheorical={production.prodTheorical} setCount={setCount} />
            </div>
        </div>
    )
}

export default ProdMonitoring

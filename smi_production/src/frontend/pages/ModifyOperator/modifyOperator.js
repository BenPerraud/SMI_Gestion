import "./modifyOperator.css"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function ModifyOperator () {
    const [operator, setOperator] = useState([])
    const params = useParams()
    const urlFetch = ["http://192.168.74.1:3001/api/operator/", params.id].join("")
    const navigate = useNavigate()

    useEffect (() => {
        fetch(
            urlFetch,
            {headers: {
                "Accept": "*",
                "Content-Type": "*/*",
                "Origin": "*",
            }})
            .then(res => res.json())
            .then(operator => setOperator(operator))
            .catch(error => alert("Erreur : " + error))
    }, [urlFetch])

    function updateOperator (e) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        if (formData.get("name") === "") {
            alert("Veuillez renseigner le nom")
            } else if (formData.get("firstname") === "") {
                alert("Veuillez renseigner le prénom")
                } else {
                    fetch(
                        urlFetch,
                        {method: "PUT",
                        body: formData,
                        headers: {
                            "Accept": "*",
                            "Content-Type": "*/*",
                            "Origin": "*",
                        }})
                        .then(res => res.json())
                        .then(res => alert(res))
                        .catch(error => alert("Erreur : " + error))
                }
        form.reset()
        navigate("/")
    }

    return (
        <div className="flexColumnGeneral">
            <h1 className="titleH1">Modifier l'opérateur/trice suivant(e) : {operator.firstname} {operator.name} </h1>
            <form className="form" name="modifyForm" encType="multipart/form-data" onSubmit={updateOperator}>
                <label>Prénom : <input className="formElement" defaultValue={operator.firstname} type="text" name="firstname" /></label>
                <label>Nom : <input className="formElement" defaultValue={operator.name} type="text" name="name" /></label>
                <button className="formBtn" type="submit">Modifier</button>
            </form>
        </div>
    )
}

export default ModifyOperator
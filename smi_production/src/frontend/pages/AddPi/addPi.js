import OpeMonitoring from "./Operator/opeMonitoring"

function AddPi () {
    function createPi (e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        for (let value of formData.values()) {
            if (value === "") {
                alert("Un des champs du questionnaire n'est pas rempli")
                break
            } else {
                fetch("http://192.168.74.1:3001/api/production",
                {method: 'POST', 
                body: formData,
                headers: {
                    "Origin": "*",
                }})
                    .then(res => res.json())
                    .then(res => alert(res))
                    .catch(error => alert("Erreur : " + error))
                form.reset()
                break
            }
        }
    }

    return (
        <div className="flexColumnGeneral">
            <div className="rowGap20px">
                <h1 className="titleH1">Ajouter un nouveau PI</h1>
                <form className="form" name="form" method="post" encType="multipart/form-data" onSubmit={createPi}>
                    <label>PI : <input className="formElement widthPi" type="text" name="pi" /></label>
                    <label>Client : <input className="formElement widthClient" type="text" name="client" /></label>
                    <label>Désignation projet : <input className="formElement widthDesignation" type="text" name="designation" /></label>
                    <label>Quantité théorique : <input className="formElement widthProdTheo" type="text" name="quantityTheorical" /> pièces théoriques sur base 7 heures</label>
                    <button className="formBtn" type="submit">Ajouter à la base de données</button>
                </form>
            </div>
            <OpeMonitoring />
        </div>
    )
}

export default AddPi
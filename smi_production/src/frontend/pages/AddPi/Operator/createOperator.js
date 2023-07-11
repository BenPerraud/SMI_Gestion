function CreateOperator ({formState, setFormState}) {
    
    function postOperator (e) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        if (formData.get("name") === "") {
            alert("Veuillez renseigner le nom")
            } else if (formData.get("firstname") === "") {
                alert("Veuillez renseigner le prénom")
                } else {
                    fetch(
                        "http://192.168.74.1:3001/api/operator",
                        {method: form.method,
                        body: formData,
                        headers: {
                            "Origin": "*",
                            }})
                        .then(res => res.json())
                        .then(res => alert(res))
                        .then(() => setFormState(formState+1))
                        .catch(error => alert("Erreur : " + error))
                }
        form.reset()
    }

    return (
        <div className="rowGap20px">
            <h1 className="titleH1">Ajouter un(e) opérateur/trice</h1>
            <form className="form" name="form" method="post" encType="multipart/form-data" onSubmit={postOperator}>
                <label>Prénom : <input className="formElement" type="text" name="firstname" /></label>
                <label>Nom : <input className="formElement" type="text" name="name" /></label>
                <button className="formBtn" type="submit">Ajouter à la base de données</button>
            </form>
        </div>
    )
}

export default CreateOperator
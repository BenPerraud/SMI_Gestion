function DeleteOperator (x, {formState, setFormState}) {
    const id = x._id

    fetch(
        "http://192.168.74.1:3001/api/operator/"+id,
        {method: "DELETE",
        headers: {
            "Accept": "*",
            "Content-Type": "*/*",
            "Origin": "*",
            }})
            .then(res => res.json())
            .then(res => alert(res))
            .then(() => setFormState(formState+1))
            .catch(error => alert("Erreur : " + error))      
}

export default DeleteOperator
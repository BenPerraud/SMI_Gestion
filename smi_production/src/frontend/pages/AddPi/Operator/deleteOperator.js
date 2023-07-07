function DeleteOperator (x, {formState, setFormState}) {
    const id = x._id

    fetch("http://localhost:3000/api/operator/"+id, {method: "DELETE"})
            .then(res => res.json())
            .then(res => alert(res))
            .then(() => setFormState(formState+1))
            .catch(error => alert("Erreur : " + error))      
}

export default DeleteOperator
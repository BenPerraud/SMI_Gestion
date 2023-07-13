import { operatorAPI } from "../../../components/routesApi"

function DeleteOperator (x, {formState, setFormState}) {
    const id = x._id

    fetch(
        {operatorAPI}+"/"+id,
        {method: "DELETE",
        headers: {
            "Origin": "*",
            }})
            .then(res => res.json())
            .then(res => alert(res))
            .then(() => setFormState(formState+1))
            .catch(error => alert("Erreur : " + error))      
}

export default DeleteOperator
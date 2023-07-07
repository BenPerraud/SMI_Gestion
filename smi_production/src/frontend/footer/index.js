import "./index.css"
import smi_logo from "../data/images/SMI_logo.jpg"

function Footer () {
    return (
        <div className="footer">
            <img className="footer_logo" src={smi_logo} alt="Logo de SMI"></img>
            <p className="footer_alert bold">Toutes les données présentées sont à caractère confidentiel et propriété exclusive de l'entreprise SMI</p>
        </div>
    )
}

export default Footer
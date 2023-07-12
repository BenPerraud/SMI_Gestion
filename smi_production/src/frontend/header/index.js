import { NavLink, useLocation } from "react-router-dom"
import smi_logo from "../data/images/SMI_logo.jpg"
import "./index.css"

function Header () {
    const date= new Date()
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1, 0, 0, 0)
    const todayURL = "/date/"+today.getTime()
    const currentLocation = useLocation()
    return (
        <div className="navBar">
            <NavLink to="/" className="Navlink_logo"><img src={smi_logo} alt="Logo de SMI" className="SMI_Logo"></img></NavLink>
            <div className="navBar_link">
                <NavLink to="/Ajouter-une-production" className={currentLocation.pathname === "/Ajouter-une-production" ? "navBar_link_element_current" : "navBar_link_element" }>Saisie journalière</NavLink>
                <NavLink to={todayURL} className={currentLocation.pathname === todayURL ? "navBar_link_element_current" : "navBar_link_element" }>Production à la journée</NavLink>
                <NavLink to="/Analyse-par-Pi" className={currentLocation.pathname === "/Analyse-par-Pi" ? "navBar_link_element_current" : "navBar_link_element" }>Analyse par PI</NavLink>
                <NavLink to="/Analyse-globale" className={currentLocation.pathname === "/Analyse-globale" ? "navBar_link_element_current" : "navBar_link_element" }>Analyse globale</NavLink>
                <NavLink to="/Ajouter-un-Pi" className={currentLocation.pathname === "/Ajouter-un-Pi" ? "navBar_link_element_current" : "navBar_link_element" }>Ajouter un PI</NavLink>
            </div>
        </div>
    )
}

export default Header
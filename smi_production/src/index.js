import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "../src/frontend/header/index"
import DailyProd from "../src/frontend/pages/DailyProd/index"
import Analyse from "../src/frontend/pages/Analyse/index"
import ProdMonitoring from './frontend/pages/AddProduction'
import ModifyOperator from './frontend/pages/ModifyOperator/modifyOperator'
import RedirectToToday from './frontend/pages/DailyProd/redirectToToday'
import Footer from "../src/frontend/footer/index"
import AddPi from './frontend/pages/AddPi/addPi'
import ModifyProd from './frontend/pages/ModifyProd/modifyProd'
import TrsGlobal from './frontend/pages/TrsGlobal'
import { Helmet } from 'react-helmet-async';


const root = ReactDOM.createRoot(document.getElementById('root'))

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self' data:;
`

console.log({ csp })

root.render(
    <React.StrictMode>
      <Router>
        <Helmet>
          <Header />
        </Helmet>
        <Helmet>
          <Routes>
              <Route path='/' element={<RedirectToToday />} />
              <Route path='/date/:date' element={<DailyProd />} />
              <Route path='/date/:date/:pi/:_id' element={<ModifyProd />} />
              <Route path='/Analyse-par-Pi' element={<Analyse />} />
              <Route path='Ajouter-un-Pi' element={<AddPi />} />
              <Route path='/Analyse-globale' element={<TrsGlobal />} />
              <Route path='/Ajouter-une-production' element={<ProdMonitoring />} />
              <Route path='/Modifier-un-operateur/:id' element={<ModifyOperator />} />
          </Routes>
        </Helmet>
        <Helmet>
          <Footer />
        </Helmet>
      </Router>
    </React.StrictMode>
)


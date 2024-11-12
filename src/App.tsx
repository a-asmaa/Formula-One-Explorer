import React from 'react';
import SeasonsList from './pages/SeasonsList';
import RaceDetails from './pages/RaceDetails';
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom";
import RaceList from './pages/RaceList';
import { Chart, registerables } from 'chart.js';

const App: React.FC = () => {

  Chart.register(...registerables);
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navigate to="/seasons" />} />   {/* default path */}
        <Route path="/seasons" element={<SeasonsList/> }/>
        <Route path="/seasons/:seasonId/races/:round" element={<RaceDetails />}/>
        <Route path="/seasons/:seasonId/races" element={<RaceList /> }/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;


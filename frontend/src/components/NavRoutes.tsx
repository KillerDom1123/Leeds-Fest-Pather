import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import SelectAct from '../pages/SelectAct';
import SubmitSelection from '../pages/SubmitSelection';
import Results from '../pages/Results';

const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/select-acts" element={<SelectAct />} />
            <Route path="/submit-acts" element={<SubmitSelection />} />
            <Route path="/results/:roomId" element={<Results />} />
        </Routes>
    );
};

export default NavRoutes;

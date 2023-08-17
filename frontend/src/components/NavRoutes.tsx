import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import SelectAct from '../pages/SelectAct';

const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/select-acts" element={<SelectAct />} />
        </Routes>
    );
};

export default NavRoutes;

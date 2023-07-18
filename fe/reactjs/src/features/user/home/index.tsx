import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

export function HomeFeature() {
    return (
        <>
            <Routes>
                <Route path="" element={<HomePage />} />
            </Routes>
        </>
    );
}

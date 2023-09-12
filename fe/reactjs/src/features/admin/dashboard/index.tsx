import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';

export interface IDashboardProps {
}

export function DashboardFeature (props: IDashboardProps) {
    return (
        <>
          <Routes>
            <Route path="" element={<DashboardPage />}></Route>
          </Routes>
        </>
      );
}

import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserSettingPage } from './pages/UserSettingPage';


export function UserSettingFeature() {
    return (
        <Routes>
            <Route path='' element={<UserSettingPage />} />
        </Routes>
    );
}

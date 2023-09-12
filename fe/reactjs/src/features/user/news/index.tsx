import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NewsPage } from './pages/NewsPage';


export function NewsFeature () {
  return (
    <Routes>
        <Route path='' element={<NewsPage />} />
    </Routes>
  );
}

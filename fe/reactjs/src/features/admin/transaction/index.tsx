import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ListPage } from './pages/ListPage';

export interface ITransactionProps {
}

export function TransactionFeature (props: ITransactionProps) {
  return (
       <Routes>
            <Route path="" element={<ListPage />}></Route>
        </Routes>
  );
}

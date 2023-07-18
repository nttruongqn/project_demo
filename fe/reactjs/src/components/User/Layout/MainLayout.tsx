import * as React from 'react';
import { Header } from '../Common/Header';
import { Footer } from '../Common/Footer';
import { Extra } from '../Common/Extra';
import { UserMain } from '../../../pages/UserMain';

export function MainLayout () {
  return (
    <>
      <Header />
      <UserMain />
      <Footer />
      <Extra />
    </>
);
}

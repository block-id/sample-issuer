import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Container from 'apps/Container';
import Home from 'apps/home/Home';
import AdhaarApply from 'apps/adhaar/pages/Apply';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Container />}>
        <Route index element={<Home />} />
        <Route path="/issuers/adhaar" element={<AdhaarApply />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

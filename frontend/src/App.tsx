import React from 'react';
import {
  BrowserRouter, Routes, Route, Outlet,
} from 'react-router-dom';

import Container from 'apps/Container';
import Home from 'apps/home/Home';
import AdhaarApply from 'apps/adhaar/pages/Apply';
import Solve from 'apps/sign-challenge/pages/Solve';
import Request from 'apps/verifier/pages/Request';
import ViewRequest from 'apps/verifier/pages/ViewRequest';
import SSOHome from 'apps/sso/pages/Home';
import Success from 'apps/verifier/pages/Success';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Container />}>
        <Route index element={<Home />} />
        <Route path="/issuers/adhaar" element={<AdhaarApply isFake={false} />} />
        <Route path="/issuers/adhaar-fake" element={<AdhaarApply isFake />} />
        <Route path="/sign-challenge/:id/" element={<Solve />} />
        <Route path="/verifiers/adhaar-request" element={<Outlet />}>
          <Route index element={<Request />} />
          <Route path=":id" element={<ViewRequest />} />
        </Route>
        <Route path="/verifiers/sso-example/" element={<SSOHome />} />
        <Route path="/verifiers/adhaar-request/success/" element={<Success />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

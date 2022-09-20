import { memo } from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import Checkout from 'pages/Checkout';
import CreditCard from 'pages/CreditCard';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Ticket from 'pages/Ticket';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles/:id" element={<Checkout />} />
        <Route path="/creditCard/:id" element={<CreditCard />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(Routes);

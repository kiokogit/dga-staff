import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import { RoutingMain } from './routing/Routing';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RoutingMain />
    </BrowserRouter>
  );
}

export default App;

function ScrollToTop(){

  const {pathname} = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
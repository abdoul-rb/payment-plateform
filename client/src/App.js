import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home';
import { TokenProvider } from './contexts/TokenContext'

function App() {

  return (<Router>
    <TokenProvider>
      <Home />
    </TokenProvider>
  </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

class App extends React.Component {

  state = {
    suppliers: [
      { id: 1, name: "Mark Zuk" },
    ],
    newSupplier: 'Rahim'
  };


  render() {

    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <h2 className="text-base font-medium tracking-wider text-gray-500">Bienvenue sur notre plateforme</h2>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-300 sm:text-4xl space-y-5 max-w-2xl">
            <span className="block">La meilleur façon d'effectuer des paiments en ligne <span className="text-indigo-600">.</span></span>
            <span className="block text-indigo-600">Faites toutes vos transactions en sécurité.</span>
          </h2>
          <div className="mt-12">
          <h2 className="text-base font-medium tracking-wider text-gray-500">Vous êtes un  marchand ?</h2>
            <div className="mt-4">
              <Router>
                <div className="inline-flex space-x-4">
                  <Link to="/login" className="inline-flex items-center justify-center px-12 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600">
                    Connectez-vous 
                  </Link>

                  <Link to="/register" className="inline-flex items-center justify-center px-12 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100">
                    Créer votre compte
                  </Link>
                </div>

                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                </Switch>
              </Router>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

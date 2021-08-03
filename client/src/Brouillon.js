import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

class Brouillon extends React.Component {

   state = {
      suppliers: [
         { id: 1, name: "Mark Zuk" },
      ],
      newSupplier: 'Rahim'
   };

   addRandomSupplier() {
      const suppliers = this.state.suppliers.slice();
      suppliers.push({ id: 3, name: "Taylor Otwell" });

      this.setState({ suppliers })
   }

   addSupplier = (event) => {
      event.preventDefault();


   }

   deleteSupplier = (supplier) => {
      const suppliers = this.state.suppliers.slice();
      suppliers.filter((s) => s.id !== supplier.id)

      this.setState({ suppliers })

      console.log(supplier);
   }

   render() {

      return (
         <div class="py-12 max-w-7xl mx-auto">
            <h1>Plateforme de paiement en ligne</h1>

            <button class="block px-4 py-1 rounded bg-gray-200 focus:outline-none my-3" onClick={() => this.addRandomSupplier()}>
               Ajouter
            </button>

            <ul class="my-6">
               {this.state.suppliers.map(supplier => (
                  <li key={supplier.id} class="py-2">{supplier.name}
                     <button class="ml-2 px-3 py-0.5 rounded bg-red-600 text-white" onClick={() => this.deleteSupplier(supplier)}>x</button>
                  </li>
               ))}
            </ul>

            <form onSubmit={this.addSupplier} class="space-x-2">
               <input type="text" class="px-2 py-1 rounded border border-gray-300" value={this.state.newSupplier} />
               <button class=" px-6 py-1.5 rounded bg-gray-200 focus:outline-none">
                  Ajouter
               </button>
            </form>
         </div>
      )
   }
}

export default Brouillon;

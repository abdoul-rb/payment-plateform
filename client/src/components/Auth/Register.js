import React from "react";
import { Link } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env

export default class Register extends React.Component {

   constructor(props) {
      super(props);
      this.state = { name: '', company: '', phone_number: '', email: '', password: '', currency: '', kbis: null };

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      Object.keys(this.state).forEach((key) => {
         formData.append(key,this.state[key])
      })
      console.log(REACT_APP_API_URL)
      const response = await fetch(REACT_APP_API_URL+'/auth/register/supplier', {
         method: 'POST',
         body: formData
      });

      const data = await response.json()
      console.log(data)
   }


   handleChange = (event) => {
      if (event.target.name !== 'kbis')
         this.setState({ [event.target.name]: event.target.value })
      else {
         // this.setState({ kbis: event.target.files[0] })
         this.setState({ kbis: event.target.files[0] })
      }
   }
   render() {
      return (
         <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
               <div className="bg-white pt-8 pb-20 px-4 shadow sm:rounded-lg sm:px-10">
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">Créer votre compte</h2>
                  <form className="" onSubmit={this.handleSubmit}>
                     <div className="grid grid-cols-6 gap-4">
                        <div className="sm:col-span-4">
                           <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                              Prénom & Nom
                           </label>
                           <div className="mt-1 rounded-md shadow-sm">
                              <input type="text" value={this.state.name} onChange={this.handleChange} id="name" name="name" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                           </div>
                        </div>

                        <div className="sm:col-span-3">
                           <label htmlFor="company" className="block text-sm font-medium leading-5 text-gray-700">
                              Société
                           </label>
                           <div className="mt-1 rounded-md shadow-sm">
                              <input type="text" value={this.state.company} onChange={this.handleChange} id="company" name="company" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                           </div>
                        </div>

                        <div className="sm:col-span-3">
                           <label htmlFor="phone_number" className="block text-sm font-medium leading-5 text-gray-700">
                              Téléphone
                           </label>
                           <div className="mt-1 rounded-md shadow-sm">
                              <input type="text" value={this.state.phone_number} onChange={this.handleChange} id="phone_number" name="phone_number" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                           </div>
                        </div>

                        <div className="sm:col-span-3">
                           <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                              Adresse email
                           </label>
                           <div className="mt-1 rounded-md shadow-sm">
                              <input type="email" value={this.state.email} onChange={this.handleChange} id="email" name="email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" autoComplete="email" />
                           </div>
                        </div>

                        <div className="sm:col-span-3">
                           <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                              Mot de passe
                           </label>
                           <div className="mt-1 rounded-md shadow-sm">
                              <input type="password" value={this.state.password} onChange={this.handleChange} id="password" name="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" autoComplete="current-password" />
                           </div>
                        </div>



                        <div className="sm:col-span-3">
                           <label htmlFor="currency" className="block text-sm font-medium leading-5 text-gray-700">
                              Devise
                           </label>
                           <div className="mt-1 rounded-md shadow-sm">
                              <input type="text" value={this.state.currency} onChange={this.handleChange} id="currency" name="currency" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                           </div>
                        </div>

                        <div className="sm:col-span-6">
                           <div className="">
                              <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-md tracking-wide uppercase border border-dashed border-gray-400 cursor-pointer">
                                 <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                 </svg>
                                 <span className="mt-2 text-base leading-normal">Selectionner le kbis</span>
                                 <input type='file' onChange={this.handleChange} name="kbis" id="kbis" className="hidden" />
                              </label>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 flex">
                        <button
                           type="submit"
                           className="flex justify-center py-2 px-10 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900"
                        >
                           S'inscrire
                        </button>
                        <Link to="/login" className="inline-flex items-center justify-center px-8 py-2 text-base text-blue-600 font-medium space-x-1">
                           <span className="text-black">Vous avez déjà un compte ? </span> <span>Connectez-vous.</span>
                        </Link>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

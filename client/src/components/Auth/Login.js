import React, { Component } from "react";

export default class Login extends Component {


   render() {
      return (
         <div>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
               <div className="row">
                  <div className="col-md-7 mrgnbtm">
                     <h2>Create User</h2>

                  </div>
               </div>

               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                     <form className="">
                        <div>
                           <label htmlFor="email" class="block text-sm font-medium leading-5 text-gray-700">
                              Adresse email
                           </label>
                           <div class="mt-1 rounded-md shadow-sm">
                              <input type="email" id="email" name="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                           </div>
                        </div>

                        <div className="mt-6">
                           <label htmlFor="password" class="block text-sm font-medium leading-5 text-gray-700">
                              Adresse email
                           </label>
                           <div class="mt-1 rounded-md shadow-sm">
                              <input type="password" id="password" name="password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                           </div>
                        </div>

                        <button type="button" onClick={(e) => {} } className="btn btn-danger">Create</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
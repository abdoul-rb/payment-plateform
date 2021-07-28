import React, { useState } from "react";

const handleSubmit = async (event) => {
   event.preventDefault();

   const data = new FormData(event.target);
   const response = await fetch('http://127.0.0.1/auth/register/supplier', {
      method: 'POST',
      body: data,
      headers: {
         Accept: 'application/json'
      }
   })
}


export default function Register() {

   //const [user, setUser] = useState(null);

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
                  <form className="" onSubmit={handleSubmit}>
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

                     <div>
                        <button
                           type="submit"
                           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           Connexion
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

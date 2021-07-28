import React from "react";

export default class Login extends React.Component {

   constructor(props) {
      super(props);
      this.state = { value: '' };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange = (event) => {
      this.setState({ value: event.target.value });
   }

   handleSubmit = async (event) => {
      event.preventDefault();

      const data = new FormData(event.target);
      const response = await fetch('http://localhost/3000/auth/login', {
         method: 'POST',
         body: data,
         credentials: 'include',
         headers: {
            Accept: 'application/json'
         }
      });

      console.log('Response');
      console.log(response);
   }

   render() {
      return (
         <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
               <div className="bg-white pt-8 pb-20 px-4 shadow sm:rounded-lg sm:px-10">
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">Connectez-vous à votre compte</h2>
                  <form className="" onSubmit={this.handleSubmit}>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                           Adresse email
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                           <input type="email" id="email" name="email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                        </div>
                     </div>

                     <div className="mt-6">
                        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                           Mot de passe
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                           <input type="password" id="password" name="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                        </div>
                     </div>

                     <div className="mt-8">
                        <button
                           type="submit"
                           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900"
                        >
                           Connexion
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

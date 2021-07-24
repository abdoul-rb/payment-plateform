exports.prettifyErrors = (e) => 
   (e.name === 'ValidationError' ? Object.values(e.errors) : e.errors).reduce(
      (acc, err) => {
         acc[err.path] =err.message;
         return acc;
      },
      {}
   )
;
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3NIsImV4cCI6MTYyNzEyMjcxNSwiaWF0IjoxNjI3MTIyNzE1fQ.Bexhh';

exports.generatedUserToken = (user) => {
   return jwt.sign({
      id: user.id,
      role: user.roles,
      time: new Date().getTime() / 1000
   }, 
   JWT_SIGN_SECRET,
   {
      expiresIn: '1h'
   });
}
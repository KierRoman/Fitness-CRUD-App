// middleware/is-signed-in.js

// const isSignedIn = (req, res, next) => {
//     if (req.session.user) return next();
//     res.redirect('/auth/sign-in');
//   };
  
//   module.exports = isSignedIn;
  


function isSignedIn(req, res, next) {
  if (!req.session.user) {
    // If user is not logged in, redirect to login page
    return res.redirect('/auth/sign-in');
  }
  next();  // If user is logged in, proceed to the next middleware or route
}

module.exports = isSignedIn;
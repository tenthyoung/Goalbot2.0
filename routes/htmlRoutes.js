var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Goal.findAll({}).then(function (dbGoals) {
      res.render("index", {
        msg: "Welcome!",
        goals: dbGoals
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/goal/:id", function (req, res) {
    db.Goal.findOne({ where: { id: req.params.id } }).then(function (dbGoal) {
      res.render("example", { //Question about this one!!!!!
        goal: dbGoal
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

// // Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../public/js/isAuthenticated.js");

// module.exports = function (app) {

//   // Sign up
//   app.get("/", function (req, res) {
//     console.log(req.user)
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/userHome");
//     }
//     res.render("userHome");
//   });

//   app.get('/logout', function (req, res) {
//     // req.logout();
//     res.redirect("/");
//     // res.render("index")
//   });



//   app.get("/login", function (req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/userHome");
//     }
//     res.render("", "../public/login.html");
//   });

//   app.get("/", function (req, res) {
//     res.render("", "../public/login.html");
//   });

//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/members", isAuthenticated, function (req, res) {
//     res.render("", "../public/members.html");
//   });

// };



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                 !!!!     Passport stuff !!!!
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




// // Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../public/js/isAuthenticated");

// module.exports = function(app) {

//   app.get("/", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.render("index");
//     }
//     res.sendFile(path.join(__dirname, "../public/signup.html"));
//   });

//   app.get("/login", function(req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.sendFile(path.join(__dirname, "../public/login.html"));
//   });

//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/login.html"));
//   });

//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/members", isAuthenticated, function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/members.html"));
//   });

// };
var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/goals", function(req, res) {
    db.Goal.findAll({}).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  // Create a new Goal
  app.post("/api/goals", function(req, res) {
    db.Goal.create(req.body).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });

  // Delete an Goal by id
  app.delete("/api/goals/:id", function(req, res) {
    db.Goal.destroy({ where: { id: req.params.id } }).then(function(dbGoal) {
      res.json(dbGoal);
    });
  });
};

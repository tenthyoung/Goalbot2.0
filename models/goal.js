module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    goal: DataTypes.STRING,
    completetionDate: DataTypes.TEXT,
    ms1: DataTypes.STRING,
    ms2: DataTypes.STRING,
    ms3: DataTypes.STRING,
    ms4: DataTypes.STRING,
    ms5: DataTypes.STRING
  });
  return Goal;
};

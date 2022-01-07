const DataTypes = require("sequelize").DataTypes;
const _Books = require("./books");
const _Payments = require("./payments");
const _Records = require("./records");
const _Roles = require("./roles");
const _Subjects = require("./subjects");
const _Users = require("./users");

function initModels(sequelize) {
  const Books = _Books(sequelize, DataTypes);
  const Payments = _Payments(sequelize, DataTypes);
  const Records = _Records(sequelize, DataTypes);
  const Roles = _Roles(sequelize, DataTypes);
  const Subjects = _Subjects(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);

  Records.belongsTo(Books, { as: "book", foreignKey: "book_id"});
  Books.hasMany(Records, { as: "Records", foreignKey: "book_id"});
  Payments.belongsTo(Records, { as: "record", foreignKey: "record_id"});
  Records.hasMany(Payments, { as: "Payments", foreignKey: "record_id"});
  Users.belongsTo(Roles, { as: "role_Role", foreignKey: "role"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "role"});
  Books.belongsTo(Subjects, { as: "subject_Subject", foreignKey: "subject"});
  Subjects.hasMany(Books, { as: "Books", foreignKey: "subject"});
  Payments.belongsTo(Users, { as: "updated_by_User", foreignKey: "updated_by"});
  Users.hasMany(Payments, { as: "Payments", foreignKey: "updated_by"});
  Records.belongsTo(Users, { as: "updated_by_User", foreignKey: "updated_by"});
  Users.hasMany(Records, { as: "Records", foreignKey: "updated_by"});
  Records.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Records, { as: "user_Records", foreignKey: "user_id"});

  return {
    Books,
    Payments,
    Records,
    Roles,
    Subjects,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

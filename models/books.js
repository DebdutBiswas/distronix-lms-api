const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "isbn"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(510),
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING(510),
      allowNull: true
    },
    reg_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    available: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    lent: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    subject: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'Subjects',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Books',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "isbn",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "isbn" },
        ]
      },
      {
        name: "Subject_Attribute_On_Subjects",
        using: "BTREE",
        fields: [
          { name: "subject" },
        ]
      },
    ]
  });
};

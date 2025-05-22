const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    Nik: { type: DataTypes.STRING(50), allowNull: false },
    Name: { type: DataTypes.STRING(255), allowNull: false },
    Email: { type: DataTypes.STRING(255), allowNull: false },
    OldPosition: { type: DataTypes.STRING(255), allowNull: true },
    NewPosition: { type: DataTypes.STRING(255), allowNull: true },
    OldLevel: { type: DataTypes.STRING(10), allowNull: true },
    NewLevel: { type: DataTypes.STRING(10), allowNull: true },
    SendEmailDate: { type: DataTypes.DATE, allowNull: true },
    SendEmailStatus: { type: DataTypes.STRING(50), allowNull: true },
  };

  const options = {
    freezeTableName: true,
    //add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
  };

  return sequelize.define("LeadersipKits", attributes, options);
}

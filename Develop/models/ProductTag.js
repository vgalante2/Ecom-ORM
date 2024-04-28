const { Model, DataTypes } = require('sequelize');

const client = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
   id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
   },
   product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', // This refers to the table name
        key: 'product_id', // This is the column name in the category table
      }
   },
   tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tag', // This refers to the table name
      key: 'tag_id', // This is the column name in the category table
    }
 }

  },
  {
    sequelize: client,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

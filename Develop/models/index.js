// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongs to Category
Product.belongsTo(Category, {
  foreignKey: 'product_id',  
  
});

// Category has many Products
Category.hasMany(Product, {
  foreignKey: 'product_id',
  as: 'products'  
});

// Product belongs to many Tags through ProductTag
Product.belongsToMany(Tag, {
  through: ProductTag, 
  foreignKey: 'product_id',  
  otherKey: 'tag_id'  
});

// Tag belongs to many Products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'products', 
  foreignKey: 'tag_id', 
  otherKey: 'product_id'  
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
};

 



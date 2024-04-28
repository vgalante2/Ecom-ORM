const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/categories', async (req, res) => {
  // find all categories
  try {
    const category = await Category.findAll({
      include: Product
      
    })
    res.json(category)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const id = req.params.id
    const category = await Category.findByPk(id, {
        include: Product
    })
    
    if(!category) {
       return res.json({
        message: 'not found'
       })
    } 
    res.json(category)
} catch (err) {
    console.error(err);
    res.status(500).send('Server error');  
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)

    res.json(newCategory)
  } catch (err) {
    const errors = err.errors.map(eObj => {
      return {
        message: eObj.message
      }
    })

    res.json({
      message: 'Your request failed.',
      errors: errors
    })
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryName = req.body.category_name; // Accessing data from body, not params
    const newCategory = req.body.new_category; 

    const updated = await Category.update({ category_name: newCategory }, {
      where: {
        category_name: categoryName
      }
    });

    if (updated[0] > 0) { // Checking how many rows were updated
      res.send({ message: "Category updated successfully" });
    } else {
      res.status(404).send({ message: "Category not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const id = req.params.id

    const category = await Category.findByPk(id)

    if(category) {
      await category.destroy()

      return res.json({
        message: 'Category deleted successfully'
      })
    }

    res.status(404).json({
      message: 'Category with that ID not found'
    })
  } catch (err) {
    handleValidationError(err, res);
  }
});

module.exports = router;

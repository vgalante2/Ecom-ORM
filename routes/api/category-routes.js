const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const cats = await Category.findAll({
      include: Product
    })
    return res.json(cats)

  }
  catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

router.get('/:id', async (req, res) => {
  let id = req.params.id
  try {
    const cats = await Category.findByPk(id, {
      include: Product
    })
    return res.json(cats)

  }
  catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    let newCat = req.body

    const cat = await Category.create(newCat)
    return res.json(cat)

  } catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    let newCat = req.body
    let id = req.params.id
    const cat = await Category.findByPk(id)
    cat.update(newCat)
    return res.json({
      message: `Category with ID ${id} name changed`
    })

  } catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});
router.delete('/:id', async (req, res) => {
  let id = req.params.id
  try {
    const cat = await Category.findByPk(id, {
      include: Product
    })
    await cat.destroy()
    return res.json({
      message: `Category with ID ${id} removed from Database`
    })

  }
  catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

module.exports = router;
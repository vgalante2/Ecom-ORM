const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: Product
    })
    return res.json(tags)

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
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let id = req.params.id
  try {
    const tag = await Tag.findByPk(id, {
      include: Product
    })
    return res.json(tag)

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
  // create a new tag
  try {
    let newTag = req.body

    const tag = await Tag.create(newTag)
    return res.json(tag)

  } catch (err) {
    console.log(err)
    return res.json({
      message: 'Bad Request',
      error: err
    })
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let newTag = req.body
    let id = req.params.id
    const tag = await Tag.findByPk(id)
    tag.update(newTag)
    return res.json({
      message: `Tag with ID ${id} name changed`
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
  // delete on tag by its `id` value
  let id = req.params.id
  try {
    const tag = await Tag.findByPk(id, {
      include: Product
    })
    await tag.destroy()
    return res.json({
      message: `Tag with ID ${id} removed from Database`
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

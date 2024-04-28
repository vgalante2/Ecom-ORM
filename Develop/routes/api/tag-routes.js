const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/tags', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: {
        model: Product,
        through: {attributes: [ProductTag] }
        
      }
    })
    res.json(tags)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const id = req.params.id
    const tag = await Tag.findByPk(id, {
        include: Product
    })
    
    if(!tag) {
       return res.json({
        message: 'not found'
       })
    } 
    res.json(tag)
} catch (err) {
    console.error(err);
    res.status(500).send('Server error');  
}

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)

    res.json(newTag)
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
  // update a tag's name by its `id` value
  try {
    const tag_name = req.body.tag_name; // Accessing data from body, not params
    const newTag = req.body.new_tag; 

    const updated = await Tag.update({ tag_name: newTag }, {
      where: {
        tag: tag_name
      }
    });

    if (updated[0] > 0) { // Checking how many rows were updated
      res.send({ message: "Tag updated successfully" });
    } else {
      res.status(404).send({ message: "Tag not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.delete('/:id', async (req, res) => {
  // delete one tag by its `id` value
  try {
    const id = req.params.id

    const tag = await Tag.findByPk(id)

    if(tag) {
      await tag.destroy()

      return res.json({
        message: 'Tag deleted successfully'
      })
    }

    res.status(404).json({
      message: 'Tag with that ID not found'
    })
  } catch (err) {
    handleValidationError(err, res);
  }
});

module.exports = router;

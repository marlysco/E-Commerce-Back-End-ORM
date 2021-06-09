const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Get all the categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData)
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    //Search for a single instance by its primary key
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoryData) {
      //Not found
      res.status(404).json({message: 'There is no Category with that id!'});
      return
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update a category by its `id` value
router.put('/:id', async (req, res) => {
  Category.update(
      {id: req.body.id},
      {category_name: req.body.category_name},
      {returning: true, where: {id: req.params.id}}
  ).then(function([rowsUpdated, [updatedCategory]]) {
     res.status(200).json(updatedCategory)
  }).catch ((err)=>{
    res.status(500).json(err);
})
})

//Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'There is no Category with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

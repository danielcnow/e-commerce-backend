const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryByID = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (categoryByID) {
      res.json(categoryByID);
    } else {
      res.status(404).json({ error: "No category found with this ID" });
    }
  } catch (error) {
    res.status(501).json(error);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const newCat = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCat);
  } catch (error) {
    res.status(502).json(error);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updatedCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedCat) {
      res.json(updatedCat);
    } else {
      res.status(404).json({ error: "No category found with this ID" });
    }
  } catch (error) {
    res.status(503).json(error);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedCat) {
      res.json(deletedCat);
    } else {
      res.status(404).json({ error: "No category with this ID" });
    }
  } catch (error) {
    res.status(503).json(error);
  }
  
});

module.exports = router;
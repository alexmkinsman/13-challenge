const router = require('express').Router();
//importing /models/category.js 
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    })
    .then ((categoryData) => {
      res.status(200).json(categoryData);
    })
    .catch ((err) => {
      res.status(500).json(err);
    })
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // Category.update(req.body, {
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((categories) => {
  //     // find all associated tags from ProductTag
  //     return Category.findAll({ where: { category_id: req.params.id } });
  //   })
  //   .then((category) => {
  //     // get list of current tag_ids
  //     const categoryIds = category.map(({ tag_id }) => tag_id);
  //     // create filtered list of new tag_ids
  //     const newCategoryTags = req.body.categoryIds
  //       .filter((category_id) => !categoryIds.includes(tag_id))
  //       .map((category_id) => {
  //         return {
  //           category_id: req.params.id,
  //         };
  //       });
  //     // figure out which ones to remove
  //     const categoriesToRemove = category
  //       .filter(({ category_id }) => !req.body.categoryIds.includes(category_id))
  //       .map(({ id }) => id);

  //     // run both actions
  //     return Promise.all([
  //       Category.destroy({ where: { id: categoriesToRemove } }),
  //       Category.bulkCreate(newCategoryTags),
  //     ]);
  //   })
  //   .then((updatedCategoryTags) => res.json(updatedCategoryTags))
  //   .catch((err) => {
  //     // console.log(err);
  //     res.status(400).json(err);
  //   });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

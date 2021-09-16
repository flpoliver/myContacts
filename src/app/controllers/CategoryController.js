const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;

    console.log(orderBy);

    const categories = await CategoryRepository.findAll(orderBy);

    return res.json(categories);
  }

  show() {}

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'name is required!' });
    }

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ message: 'This category already exists!' });
    }

    const category = await CategoryRepository.create(name);

    res.json(category);
  }

  update() {}

  delete() {}
}

module.exports = new CategoryController();

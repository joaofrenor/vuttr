const Tool = require("../models/Tool");

class ToolController {
  async index(req, res) {
    const filters = {};

    if (req.body.tag) {
      filters.tags = req.body.tag;
    }

    const tool = await Tool.paginate(filters, {
      page: req.query.page || 1,
      limit: 20
    });

    return res.json(tool);
  }
  async show(req, res) {
    const tool = await Tool.find(req.params.id);

    return res.json(tool);
  }
  async store(req, res) {
    const { link } = req.body;

    if (await Tool.findOne({ link })) {
      return res
        .status(400)
        .json({ error: "You already remembered this tool" });
    }

    const tool = await Tool.create(req.body);

    return res.json(tool);
  }
  async destroy(req, res) {
    await Tool.findByIdAndDelete(req.params.id);

    return res.json({});
  }
}

module.exports = new ToolController();

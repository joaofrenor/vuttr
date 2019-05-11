const Tool = require("../models/Tool");

class ToolController {
  async index(req, res) {
    if (req.query.tag) {
      const tool = await Tool.find({ tags: req.query.tag });
      return res.json(tool);
    } else {
      const tool = await Tool.find();
      return res.json(tool);
    }
  }
  async show(req, res) {
    const tool = await Tool.find(req.params.id);

    return res.json(tool);
  }
  async store(req, res) {
    const { link } = req.body;

    if (await Tool.findOne({ link })) {
      return res
        .status(401)
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

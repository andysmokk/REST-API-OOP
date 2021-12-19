const Joi = require("joi");

const addContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    const [{ path }] = error.details;
    return res.status(400).json({ message: `Missing required ${path} field` });
  }

  next();
};

const updateContactValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
  }).or("name", "email", "phone");

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    const [{ type }] = error.details;
    console.log(error.details);
    if (type === "object.unknown") {
      return res.status(400).json({ message: error.message.replace(/"/g, "") });
    }
    return res.status(400).json({ message: "Missing fields" });
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
};

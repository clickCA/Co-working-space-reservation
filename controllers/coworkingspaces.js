const CoworkingSpace = require("../models/CoworkingSpace");

// @desc    Get all coworking spaces
// @route   GET /api/v1/coworkingspaces
// @access  Public
exports.getCoworkingSpaces = async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  // fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // loop over remove fields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // finding resource
  query = CoworkingSpace.find(JSON.parse(queryStr)).populate("reservations");

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await CoworkingSpace.countDocuments();
    query = query.skip(startIndex).limit(limit);
    const CoworkingSpaces = await query;
    console.log(req.query);

    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: CoworkingSpaces.length,
      data: CoworkingSpaces,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message});
  }
};


// @desc    Get single coworking space
// @route   GET /api/v1/coworkingspaces/:id
// @access  Public
exports.getCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingSpace = await CoworkingSpace.findById(req.params.id);
    if (!coworkingSpace) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: coworkingSpace });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message});
  }
};


// @desc    Create new coworking space
// @route   POST /api/v1/coworkingspaces
// @access  Private
exports.createCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingSpace = await CoworkingSpace.create(req.body);
    res.status(201).json({ success: true, data: coworkingSpace });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message});
  }
};

// @desc    Update coworking space
// @route   PUT /api/v1/coworkingspaces/:id
// @access  Private
exports.updateCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingSpace = await CoworkingSpace.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!CoworkingSpace) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: coworkingSpace });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message});
  }
};

// @desc    Delete coworking space
// @route   DELETE /api/v1/coworkingspaces/:id
// @access  Private
exports.deleteCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingSpace = await CoworkingSpace.findById(req.params.id);
    if (!CoworkingSpace) {
      return res.status(400).json({
        success: false,
      });
    }
    coworkingSpace.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message});
  }
};

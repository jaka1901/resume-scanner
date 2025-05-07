const fs = require('fs');
const path = require('path');
const parserService = require('../services/parserService');

exports.parseResume = async (req, res) => {
  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();

  try {
    const data = await parserService.parse(filePath, ext);
    fs.unlinkSync(filePath); // Clean up
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse resume' });
  }
};

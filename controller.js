const express = require('express');
const router = express.Router();
const Model = require('../models/Model.js');

// Getting all
router.get('/', async (req, res) => {
  try {
    const data = await Model.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getModel, (req, res) => {
  res.json(res.data)
})

// Creating one
router.post('/', async (req, res) => {
  const data = new Model(req.body)
  try {
    const newModel = await data.save()
    res.status(201).json(newModel)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const data = new Model(req.body);
  await data.save();
  res.redirect('/');
});

// Updating One
router.put('/:id', getModel, async (req, res) => {
  try {
    const updatedModel = await res.data.update(req.body)
    res.json(updatedModel)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getModel, async (req, res) => {
  try {
    await res.data.remove()
    res.json({ message: 'Deleted Model' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getModel(req, res, next) {
  let data
  try {
    data = await Model.findById(req.params.id)
    if (data == null) {
      return res.status(404).json({ message: 'Cannot find data' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.data = data
  next()
}

module.exports = router
/** Cat routes for express-pg-oo */

const express = require("express");
const db = require("../db");

const Cat = require("../models/cat");

const router = new express.Router();

/** get all cats: [{id, name, age}, ...] */

router.get("/", async function (req, res, next) {
  try {
    const cats = await Cat.getAll();

    return res.json(cats)
  } catch (err) {
    return next(err);
  }
});


router.get('/:id', async (req, res, next)=>{
  try {
    const cat = await Cat.getCatById(req.params.id);
  
    return res.json(cat);
  } catch (err) {
    return next(err);
  }
})

router.post('/', async (req, res, next)=>{
  try {
    const {name, age} = req.body;
    const cat = await Cat.createCat(name, age);
    return res.json(cat);
  } catch (err) {
    return next(err);
  }
})

router.delete('/:id', async (req, res, next)=>{
  try {
    await Cat.delete(id);
    return res.json({ msg:'deleted!'});
  } catch (err) {
    return next(err);
  }
})

module.exports = router;
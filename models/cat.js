/** Cat model.
 *
 * These is an example of a simple "collection-of-static-methods"
 * model. It helps get SQL out of routes, but doesn't provide
 * state. You never actually instantiate a Cat.
 *
 * */

const db = require("../db");
const ExpressError = require('../expressError');

class Cat{
  static async getAll(){
    const res = await db.query(`SELECT * FROM cats`);
    
    return res.rows;
  }
  static async getCatById(id){
    const res = await db.query(`SELECT id, name, age FROM cats WHERE id = $1`, [id]);
    if (res.rows.length===0){
      throw new ExpressError("Cat not found", 404);
    }
    return res.rows[0];
  }
  static async createCat(name, age){
    if (!name || !age){
      throw new ExpressError("Missing required fields", 400);
    }
    const res = await db.query(`INSERT INTO cats (name, age)
    VALUES ($1, $2) RETURNING id, name, age`, [name, age]);
    return res.rows[0];
  }
  static async delete(id){
    const res = await db.query(`DELETE FROM cats WHERE id = $1 RETURNING id`,[id]);
    if (res.rows.length===0){
      throw new ExpressError("Cat not found", 404);
    }
  }
}

module.exports = Cat;
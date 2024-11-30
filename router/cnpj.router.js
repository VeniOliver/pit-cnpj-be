import express from 'express';
import CNPJ from '../model/cnpj.class.js';
import Error from '../model/error.class.js';

const router = express.Router()

/**
 * Router find all cnpj
 * 
 * This route handler is responsible for fetching all CNPJ records from the database. 
 * It uses the `CNPJ.findAll()` method to retrieve the data and returns the results as a JSON response.
 * 
 * @route GET /find
 * @returns {Object[]} 200 - An array of CNPJ records
 * @throws {Error} 500 - If an error occurs while fetching the data
 */
router.get('/find', async (req, res) => {
  try {
    const cnpj = new CNPJ()
    return res.status(200).send(await CNPJ.findAll())
  } catch (e) {
    res.status(500).send(new Error(e.message, e.code))
  }
})

/**
 * Search cnpj
 * 
 * This route handler is responsible for searching a CNPJ by its number. 
 * It uses the `CNPJ.search()` method to perform the search, passing the request body as parameters. 
 * The results are returned in the response.
 * 
 * @route POST /search
 * @param {Object} req.body - The body of the request contains the CNPJ number and captcha response.
 * @returns {Object} 201 - The found CNPJ record or the data from RFB
 * @throws {Error} 500 - If an error occurs while processing the search
 */
router.post('/search', async (req, res) => {
  try {
    const cnpj = new CNPJ()
    return res.status(201).send(await CNPJ.search(req?.body))
  } catch (e) {
    res.status(500).send(new Error(e.message, e.code))
  }
})

export default router

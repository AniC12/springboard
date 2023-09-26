const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const result = await db.query(`SELECT * FROM companies`);
        return res.json({ companies: result.rows });
    } catch (e) {
        return next(e);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const result = await db.query(`SELECT * FROM companies WHERE code = $1`, [code]);
        if (result.rows.length === 0) {
            throw new ExpressError(`Can't find company with code of ${code}`, 404);
        }
        return res.json({ company: result.rows[0] })
    } catch (e) {
        return next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const result = await db.query(
            `INSERT INTO companies (code, name, description) 
            VALUES ($1, $2, $3) 
            RETURNING code, name, description`,
            [code, name, description]);
        return res.status(201).json({ company: result.rows[0] });
    } catch (e) {
        return next(e);
    }
});


router.put('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const { name, description } = req.body;
        const result = await db.query(
            `UPDATE companies 
            SET name=$1, description=$2 
            WHERE code=$3 
            RETURNING code, name, description`,
            [name, description, code]);
        if (result.rows.length === 0) {
            throw new ExpressError(`Can't update company with code of ${code}`, 404);
        }
        return res.status(201).json({ company: result.rows[0] });
    } catch (e) {
        return next(e);
    }
});

router.delete('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const result = await db.query('DELETE FROM companies WHERE code = $1', [code]);

        if (result.rowCount === 0) {
            throw new ExpressError(`Can't delete company with code of ${code}`, 404);
        }

        return res.send({ status: "DELETED!" })
    } catch (e) {
        return next(e)
    }
});

module.exports = router;
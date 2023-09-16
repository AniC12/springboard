const express = require('express');
const items = require('./fakeDB');

router = express.Router();

//GET /items - this should render a list of shopping items.
router.get('/', (req, res, next) => {
    try {
        return res.json(items);        
    } catch (err) {
        return next(err);
    }
});


//POST /items - this route should accept JSON data and add it to the shopping list.
router.post('/', (req, res, next) => {
    try {
        let newItem = req.body;
        items.push(newItem);
        return res.json({item: newItem});
    } catch (err) {
        return next(err);
    }
});

//GET /items/:name - this route should display a single item’s name and price.
router.get('/:name', (req, res, next) => {
    try {
        let itemName = req.params.name;
        let foundItem = items.find((item) => item.name === itemName);
        if (!foundItem)
            return res.status(404).json({ error: 'Item not found' });
        
        return res.json({item: foundItem}); 
    } catch (err) {
        return next(err);
    }
});

//PATCH /items/:name, this route should modify a single item’s name and/or price.
router.patch('/:name', (req, res, next) => {
    try {
        let itemName = req.params.name;
        let updatedItem = req.body;
        let foundItem = items.find((item) => item.name === itemName);
        if (!foundItem)
            return res.status(404).json({ error: 'Item not found' });
        foundItem = {...foundItem, ...updatedItem};
        return res.json({item: foundItem})
    } catch (err) {
        return next(err);
    }
});

//DELETE /items/:name - this route should allow you to delete a specific item from the array.
router.delete('/:name', (req, res, next) => {
    try {
        let itemName = req.params.name;
        let index = items.findIndex((item) => item.name === itemName);
        
        if (index === -1) {
            throw {message: "Not Found", status: 404}
        }
        items.splice(index, 1);
        return res.json({message: 'Deleted'})
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

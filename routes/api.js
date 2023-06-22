var express = require('express');
var router = express.Router();
const models = require('../models')

/* GET users listing. */
router.get('/phonebooks', async (req, res, next) => {
    try {
        const users = await models.Api.findAll()
        res.status(200).json({users})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error Showing Data User" })
    }
});

router.post('/phonebooks', async (req, res, next) => {
    try {
        const { name, phone } = req.body
        const users = await models.Api.create({
            name: name,
            phone: phone
        })
        res.status(201).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error Creating Data User" })
    }
});
router.put('/phonebooks/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, phone } = req.body
        const users = await models.Api.update({
            name: name,
            phone: phone
        },{
            where: {
                id
            },
            returning: true,
            plain: true
        })
        res.status(201).json(users[1])
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error Updating Data User" })
    }
});

router.delete('/phonebooks/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const users = await models.Api.destroy({
            where: {
                id
            }
        })
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error Deleting Data User" })
    }
});

module.exports = router;

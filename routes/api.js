var express = require('express');
var router = express.Router();
const models = require('../models')

/* GET users listing. */
router.get('/phonebooks', async (req, res, next) => {
    try {
        const total = await models.Api.count()
        const page = parseInt(req.query.page) || 1
        const limit = 5
        const offset = (page - 1) * limit
        const pages = Math.ceil(total / limit)
        const users = await models.Api.findAll({
            order: [['id', 'asc']],
            limit,
            offset
        })
        res.status(200).json({
            users,
            page,
            limit,
            pages,
            total
        })
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
        }, {
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

router.put('/phonebooks/:id/avatar', async (req, res, next) => {
    try {
        const { id } = req.params
        const { avatar } = req.body
        const users = await models.Api.update({
            avatar: avatar
        }, {
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

router.get('/phonebooks/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const users = await models.Api.findAll({
            where: {
                id
            },
            returning: true,
            plain: true
        })
        res.status(201).json(users)
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

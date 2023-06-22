var express = require('express');
var router = express.Router();
const models = require('../models');
const path  = require('path');

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
            total,
            status: 'Succes Showing Data Users'
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
        res.status(201).json({
            users,
            status: 'Succes Creating Data User'
        })
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
        res.status(201).json({
            user: users[1],
            status: "Success Updating Data User"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error Updating Data User" })
    }
});

router.put('/phonebooks/:id/avatar', async (req, res, next) => {
    try {
        const { id } = req.params
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No Files Were Uploaded')
        }
        const sampleFile = req.files.avatar
        const fileName = `${Date.now()}-${sampleFile.name}`
        const uploadPath = path.join(__dirname, '..', 'public', 'images', fileName)

        sampleFile.mv(uploadPath, async (err) => {
            if(err){
                return res.status(500).send(err)
            }
        })
        const updateAvatar = await models.Api.findByPk(id)

        if(!updateAvatar){
            return res.status(404).json({error : 'User Not Found'})
        }
        updateAvatar.avatar = fileName;
        await updateAvatar.save();
        res.status(201).json({
            user: updateAvatar,
            status: 'Success Updating Avatar User'
        })
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
        res.status(201).json({
            user: users,
            status: 'Succesing Showing Data User'
        })
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
        res.status(200).json({
            user: users,
            success: 'Success Deleting Data User'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error Deleting Data User" })
    }
});

module.exports = router;

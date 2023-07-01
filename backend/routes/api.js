var express = require('express');
var router = express.Router();
const models = require('../models');
const path = require('path');
const { Op } = require('sequelize');
const { Response } = require('../helpers/util')

/* GET users listing. */
router.get('/phonebooks', async (req, res, next) => {
    try {
        const { name, phone } = req.query;
        let params = {};
        let sortBy = req.query.sortBy || 'id';
        let sortMode = req.query.sortMode || 'asc';

        if (name && phone) {
            params = {
                name: { [Op.iLike]: `%${name}%` },
                phone: { [Op.iLike]: `%${phone}%` },
            };
        } else if (name) {
            params.name = { [Op.iLike]: `%${name}%` };
        } else if (phone) {
            params.phone = { [Op.iLike]: `%${phone}%` };
        }
        // console.log(params)
        const total = await models.Api.count();
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const pages = Math.ceil(total / limit);

        const users = await models.Api.findAll({
            attributes: ['id', 'name', 'phone', 'avatar'],
            where: params,
            order: [['id', 'DESC']],
            limit,
            offset,
        });

        res.status(200).json(new Response({
            users,
            page,
            limit,
            pages,
            total,
            success: 'Success Showing Data User',
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json(new Response('Error Showing Data User', false));
    }
});


router.post('/phonebooks', async (req, res, next) => {
    try {
        const { name, phone } = req.body
        const users = await models.Api.create({
            name: name,
            phone: phone
        })
        res.status(201).json(new Response({
            users,
            succes: 'Succes Creating Data User'
        }))
    } catch (error) {
        console.log(error)
        res.status(500).json(new Response("Error Creating Data User", false))
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
        res.status(201).json(new Response({
            user: users[1],
            success: 'Success Updating Data User'
        }))
    } catch (error) {
        console.log(error)
        res.status(500).json(new Response("Error Updating Data User", false))
    }
});

router.put('/phonebooks/:id/avatar', async (req, res, next) => {
    try {
        const { id } = req.params
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send(new Response('No Files Were Uploaded', false))
        }
        const sampleFile = req.files.avatar
        const fileName = `${Date.now()}-${sampleFile.name}`
        const uploadPath = path.join(__dirname, '..', 'public', 'images', fileName)

        sampleFile.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).send(err)
            }
        })
        const updateAvatar = await models.Api.findByPk(id)

        if (!updateAvatar) {
            return res.status(404).json(new Response('User Not Found', false))
        }
        updateAvatar.avatar = fileName;
        await updateAvatar.save();
        res.status(201).json(new Response({
            user: updateAvatar,
            status: 'Success Updating Avatar User'
        }))
    } catch (error) {
        console.log(error)
        res.status(500).json(new Response("Error Updating Data User", false))
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
        res.status(201).json(new Response({
            user: users,
            status: 'Succesing Showing Data User'
        }))
    } catch (error) {
        console.log(error)
        res.status(500).json(new Response("Error Updating Data User", false))
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
        res.status(200).json(new Response({
            user: users,
            success: 'Success Deleting Data User'
        }))
    } catch (error) {
        console.log(error)
        res.status(500).json(new Response("Error Deleting Data User", false))
    }
});

module.exports = router;

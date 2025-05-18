require('dotenv').config();
const {
    curatedlist: curatedListModel
} = require("../models");
const { createSlug } = require('../services/index.js');


const createCuratedList = async (req, res) => {

    try {
        const { name, description, slug } = req.body;
        const curatedList = await curatedListModel.create({ name, description, slug });
        res.status(201).json({ message: 'Curated list created successfully', data: curatedList });
    }
    catch (error) { console.error(error) }
}

const updateCuratedList = async (req, res) => {

    try {
        const curatedListId = req.params.curatedListId;
        const { name, description } = req.body;
        const newSlug = await createSlug(name);
        const [updatedCuratedList] = await curatedListModel.update(
            { name, description, slug: newSlug },
            { where: { id: curatedListId } }
        );
        if (updatedCuratedList > 0) {
            res.status(201).json({ message: 'Curated list updated successfully' });
        }
    }
    catch (error) { console.error(error) }
}
module.exports = { createCuratedList, updateCuratedList };


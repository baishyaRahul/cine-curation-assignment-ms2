require('dotenv').config();
const {
    curatedlist: curatedListModel,
    watchlist: watchListModel
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

const createWatchList = async (req, res) => {

    try {
        const { movieId } = req.body;
        await watchListModel.create({ movieId });
        res.status(201).json({ message: 'Movie added to watchlist successfully.' });
    }
    catch (error) { console.error(error) }
}
module.exports = { createCuratedList, updateCuratedList, createWatchList };


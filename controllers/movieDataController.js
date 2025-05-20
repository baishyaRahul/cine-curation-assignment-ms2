require('dotenv').config();
const { Op, Sequelize } = require('sequelize');
const {
    curatedlist: curatedListModel,
    watchlist: watchListModel,
    wishlist: wishlistModel,
    curatedlistitem: curatedListItemModel,
    review: reviewModel,
    movie: movieModel
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

const creatWishList = async (req, res) => {

    try {
        const { movieId } = req.body;
        await wishlistModel.create({ movieId });
        res.status(201).json({ message: 'Movie added to wishlist successfully.' });
    }
    catch (error) { console.error(error) }
}

const creatCuratedListItem = async (req, res) => {

    try {
        const { movieId, curatedListId } = req.body;
        await curatedListItemModel.create({ movieId, curatedListId });
        res.status(201).json({ message: 'Movie added to curated list item successfully.' });
    }
    catch (error) { console.error(error) }
}

const createReview = async (req, res) => {

    try {
        const movieId = req.params.movieId;
        const { rating, reviewText } = req.body;
        await reviewModel.create({ movieId, rating, reviewText });
        res.status(201).json({ message: 'Review added successfully.' });
    }
    catch (error) { console.error(error) }
}

const getMovieByGenreActor = async (req, res) => {

    try {
        const genre = req.query.genre;
        const actor = req.query.actor;

        const movies = await movieModel.findAll({
            where: {
                genre: {
                    [Op.like]: `%${genre}%`
                }
            },
            where: {
                actors: {
                    [Op.like]: `%${actor}%`
                }
            }
        });
        res.status(201).json({ movies: movies });
    }
    catch (error) { console.error(error) }
}

const getMovieByRatingYear = async (req, res) => {

    try {
        const allowedSortFields = ['rating', 'releaseYear'];
        const allowedOrder = ['ASC', 'DESC'];

        const list = req.query.list;
        const sortBy = req.query.sortBy;
        const order = req.query.order;

        const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'rating';
        const sortOrder = allowedOrder.includes(order) ? order : 'DESC';

        if (list === 'watchlist') {

            const movies = await watchListModel.findAll({
                include: {
                    model: movieModel,
                    attributes: ['title', 'tmdbId', 'genre', 'actors', 'releaseYear', 'rating'],
                },
                order: [[{ model: movieModel }, sortField, sortOrder]],
            });

            const result = movies.map((item) => item.movie)
            res.status(201).json({ movies: result });
        } else if (list === 'wishlist') {

            const movies = await wishlistModel.findAll({
                include: {
                    model: movieModel,
                    attributes: ['title', 'tmdbId', 'genre', 'actors', 'releaseYear', 'rating'],
                },
                order: [[{ model: movieModel }, sortField, sortOrder]],
            });

            const result = movies.map((item) => item.movie)
            res.status(201).json({ movies: result });
        } else if (list === 'curatedlist') {

            const movies = await curatedListModel.findAll({
                include: {
                    model: movieModel,
                    attributes: ['title', 'tmdbId', 'genre', 'actors', 'releaseYear', 'rating'],
                },
                order: [[{ model: movieModel }, sortField, sortOrder]],
            });

            const result = movies.map((item) => item.movie)
            res.status(201).json({ movies: result });
        }
    }
    catch (error) { console.error(error) }
}

const getTopFiveMovie = async (req, res) => {

    try {
        const movies = await movieModel.findAll({
            limit: 5,
            order: [['rating', 'DESC']],
            attributes: ['title', 'rating'],
            include: {
                model: reviewModel,
                attributes: [
                    'reviewText',
                    [Sequelize.literal("array_length(string_to_array(\"reviewText\", ' '), 1)"),
                        'wordCount']
                ]
            }
        });

        res.status(201).json({ movies: movies });
    }
    catch (error) { console.error(error) }
}

module.exports = {
    createCuratedList,
    updateCuratedList,
    createWatchList,
    creatWishList,
    creatCuratedListItem,
    createReview,
    getMovieByGenreActor,
    getTopFiveMovie,
    getMovieByRatingYear
};
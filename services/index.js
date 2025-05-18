const { Op } = require('sequelize');
const axiosInstance = require('../lib/axios.lib.js');
const { movie: movieModel } = require('../models');

const movieExistsInDB = async (tmdbIds) => {
    try {
        const existingMovie = await movieModel.findAll({
            where: {
                tmdbId: {
                    [Op.in]: tmdbIds
                }
            },
            attributes: ['tmdbId']
        });

        return existingMovie.map(movie => movie.tmdbId);
    } catch (error) { console.error({ message: error }) }
}

const searchMovie = async (req, res) => {

    try {
        let movie = req.query.query;

        let response = await axiosInstance.get('/search/movie', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: movie
            }
        });

        let results = response.data.results;

        const enrichedMovies = await Promise.all(
            results.map(async (movie) => {
                const actors = await getActors(movie.id);
                const genre = await getGenre(movie.id);

                return {
                    title: movie.title,
                    tmdbId: movie.id,
                    genre: genre,
                    actors: actors,
                    releaseYear: movie.release_date ? movie.release_date.split('-')[0] : null,
                    rating: movie.vote_average,
                    description: movie.overview,
                };
            })
        );

        // const allTmdbIds = formattedResult.map(movie => movie.tmdbId);
        // const checkMovieData = await movieExistsInDB(allTmdbIds);

        // if (Object.keys(checkMovieData).length === 0) {
        //     await movieModel.bulkCreate(formattedResult);
        //     console.log({ message: 'Movie saved successfully' });
        // } else {
        //     console.log({ message: 'Movie present in Database' });
        // }

        res.json(enrichedMovies);
    }
    catch (error) {
        if (error.code === 'ECONNRESET') {
            console.error('Connection was reset. Possible server/network issue.');
        } else {
            console.error('Axios error:', error.code, error.message);
        }
    }
}

const createSlug = async (movie) => {

    try {
        let slug = movie.toLowerCase().replace(/\s+/g, '-');
        return slug;
    }
    catch (error) {
        console.error(error.code, error.message);
    }
}

const getActors = async (movieId) => {

    try {

        let response = await axiosInstance.get(`/movie/${movieId}/credits`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
            }
        });

        let actor = response.data.cast.map((actor) => actor.name).slice(0, 5);

        return actor;
    }
    catch (error) {
        console.error(error.code, error.message);
    }
}

const getGenre = async (movieId) => {

    try {

        let response = await axiosInstance.get(`/movie/${movieId}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
            }
        });

        let genre = response.data.genres.map((genre) => genre.name);

        return genre;
    }
    catch (error) {
        console.error(error.code, error.message);
    }
}
module.exports = { searchMovie, createSlug };

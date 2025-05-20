require('dotenv').config();

const express = require('express');
const { searchMovie } = require('./services/index.js');
const { createCuratedList,
    updateCuratedList,
    createWatchList,
    creatWishList,
    creatCuratedListItem,
    createReview,
    getMovieByGenreActor,
    getTopFiveMovie,
    getMovieByRatingYear } = require('./controllers/movieDataController.js');

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Cine Curation (MS2)');
});

app.get('/api/movies/search', searchMovie);

app.post('/api/curated-lists', createCuratedList);
app.put('/api/curated-lists/:curatedListId', updateCuratedList);

app.post('/api/movies/watchlist', createWatchList);
app.post('/api/movies/wishlist', creatWishList);
app.post('/api/movies/curated-list', creatCuratedListItem);

app.post('/api/movies/:movieId/reviews', createReview);

app.get('/api/movies/searchByGenreAndActor', getMovieByGenreActor);

app.get('/api/movies/top5', getTopFiveMovie);

app.get('/api/movies/sort', getMovieByRatingYear);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})
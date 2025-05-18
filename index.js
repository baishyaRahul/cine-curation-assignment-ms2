require('dotenv').config();

const express = require('express');
const { searchMovie } = require('./services/index.js');
const { createCuratedList, updateCuratedList } = require('./controllers/movieDataController.js');

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})
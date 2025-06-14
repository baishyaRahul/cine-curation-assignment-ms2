module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define(
    'movie',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allow: false,
      },
      tmdbId: {
        type: DataTypes.INTEGER,
        allow: false,
      },
      genre: {
        type: DataTypes.TEXT,
      },
      actors: {
        type: DataTypes.TEXT,
      },
      releaseYear: {
        type: DataTypes.INTEGER,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  // Associations
  movie.associate = (models) => {
    movie.hasMany(models.review, { foreignKey: 'movieId' });
    movie.hasMany(models.watchlist, { foreignKey: 'movieId' });
    movie.hasMany(models.wishlist, { foreignKey: 'movieId' });
    movie.hasMany(models.curatedlistitem, { foreignKey: 'movieId' });
  };

  return movie;
};
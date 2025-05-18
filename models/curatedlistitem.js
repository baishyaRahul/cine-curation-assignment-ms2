module.exports = (sequelize, DataTypes) => {
    const curatedlistitem = sequelize.define(
      'curatedlistitem',
      {
        curatedListId: {
          type: DataTypes.INTEGER,
          references: { model: 'curatedlist', key: 'id' },
        },
        movieId: {
          type: DataTypes.INTEGER,
          references: { model: 'movie', key: 'id' },
        },
        addedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        timestamps: true,
      }
    );
  
    // Associations
    curatedlistitem.associate = (models) => {
      curatedlistitem.belongsTo(models.curatedlist, { foreignKey: 'curatedListId' });
      curatedlistitem.belongsTo(models.movie, { foreignKey: 'movieId' });
    };
  
    return curatedlistitem;
  };
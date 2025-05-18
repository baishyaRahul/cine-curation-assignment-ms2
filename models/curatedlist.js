module.exports = (sequelize, DataTypes) => {
    const curatedlist = sequelize.define(
      'curatedlist',
      {
        name: {
          type: DataTypes.STRING,
          allow: false,
        },
        slug: {
          type: DataTypes.STRING,
          allow: false,
        },
        description: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        timestamps: true,
      }
    );
  
    // Associations
    curatedlist.associate = (models) => {
      curatedlist.hasMany(models.curatedlistitem, { foreignKey: 'curatedListId' });
    };
  
    return curatedlist;
  };
const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require ('./Genre')
const Movie = require ('./Movie');
// const Album = require('./Album');
// const Song = require('./Song');


Movie.belongsToMany(Genre, {through:"movieGender"});
Genre.belongsToMany(Movie, {through:"movieGender"});

Movie.belongsToMany(Actor, {through:"movieActor"});
Actor.belongsToMany(Movie, {through:"movieActor"});

Movie.belongsToMany(Director, {through:"movieDirector"});
Director.belongsToMany(Movie, {through:"movieDirector"});

// Artist.hasMany(Album)
// Album.belongsTo(Artist)

// Album.hasMany(Song)
// Song.belongsTo(Album)
function TrackEl(title, author, mp3, image) {
  this.image = image || 'song-placeholder.png';
  this.mp3 = /*mp3 ||*/ 'Ludovico Einaudi - Nuvole Bianche.mp3';
  this.author = author;
  this.title = title;
  this.album = 'album';
  mp3 = window.location.origin+'/fd3469b93f47007058d96ae28f78e535'
  var cardEl = document.createElement('div');
  cardEl.classList = 'card';
  
  var infoContainerEl = document.createElement('div');
  infoContainerEl.classList = 'info-container';

  var titleEl = document.createElement('div');
  titleEl.classList = 'title';
  titleEl.innerText = this.title;

  var authorEl = document.createElement('div');
  authorEl.classList = 'author';
  authorEl.innerText = this.author;

  var imageEl = document.createElement('div');
  imageEl.classList = 'image';
  imageEl.style.backgroundImage = 'url('+this.image+')';
  
  var buttonsEl = document.createElement('div');
  buttonsEl.classList = 'buttons';
  buttonsEl.innerHTML = '<audio controls><source src="'+this.mp3+'" type="audio/mpeg"></audio>';
  
  cardEl.appendChild(imageEl);
  infoContainerEl.appendChild(titleEl);
  infoContainerEl.appendChild(authorEl);
  infoContainerEl.appendChild(buttonsEl);
  cardEl.appendChild(infoContainerEl);
  return cardEl;
}

TrackEl.prototype.match = function (value) {
  return (
    this.title.indexOf(value) !== -1 ||
    this.album.indexOf(value) !== -1 ||
    this.author.indexOf(value) !== -1
  )
}

function PlaylistEl(playlist) {
  var playlistEl = document.createElement('div');
  playlistEl.classList = 'playlist';

  var titleEl = document.createElement('div');
  titleEl.classList = 'title';
  titleEl.innerHTML = '<h2>'+playlist.title+'</h2>';

  playlistEl.appendChild(titleEl);
  playlist.songs.forEach(song => {
    var songEl = document.createElement('div');
    songEl.classList = 'song';
    songEl.innerHTML = '<strong>'+song.title+'</strong> - ' + song.author;
    playlistEl.appendChild(songEl);
  });

  return playlistEl;
}

function Song(title, author, mp3, image) {
  this.title = title;
  this.author = author;
  this.mp3 = mp3;
  this.image = image;
}

function Playlist(title, songs) {
  this.title = title;
  this.songs = songs;
}

window.addEventListener('beforeunload', function() {
  alert('stai uscendo. salvataggio traccia in corso...');
  return null;
}, false)
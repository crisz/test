function TrackEl(title, author, mp3, image) {
  var image = image || 'song-placeholder.png';
  var mp3 = /*mp3 ||*/ 'Ludovico Einaudi - Nuvole Bianche.mp3';
  var cardEl = document.createElement('div');
  cardEl.classList = 'card';
  
  var infoContainerEl = document.createElement('div');
  infoContainerEl.classList = 'info-container';

  var titleEl = document.createElement('div');
  titleEl.classList = 'title';
  titleEl.innerText = title;

  var authorEl = document.createElement('div');
  authorEl.classList = 'author';
  authorEl.innerText = author;

  var imageEl = document.createElement('div');
  imageEl.classList = 'image';
  imageEl.style.backgroundImage = 'url('+image+')';
  
  var buttonsEl = document.createElement('div');
  buttonsEl.classList = 'buttons';
  buttonsEl.innerHTML = '<audio controls><source src="'+mp3+'" type="audio/mpeg"></audio>';
  
  cardEl.appendChild(imageEl);
  infoContainerEl.appendChild(titleEl);
  infoContainerEl.appendChild(authorEl);
  infoContainerEl.appendChild(buttonsEl);
  cardEl.appendChild(infoContainerEl);
  return cardEl;
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
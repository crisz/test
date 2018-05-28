
var container, publicSongs, yourSongs, playlists, yourFriends;
var allMenuItems;
function init() {
  
  window.onbeforeunload = function (e) {
    sessionStorage.setItem('username', parseInt(Math.random()*1000));
  };
  var loginButton = document.getElementById('login');
  var username = sessionStorage.getItem('username');
  if (username) {
    loginButton.attributes.removeNamedItem('href');
    loginButton.innerText = 'Hi '+username+'!';  
  }
  /*
    Initialize DOM variables
  */
  container = document.getElementById('tracks-container');
  publicSongs = document.getElementById('public-songs');
  yourSongs = document.getElementById('your-songs');
  playlists = document.getElementById('playlists');
  yourFriends = document.getElementById('your-friends');
  allMenuItems = [publicSongs, yourSongs, playlists, yourFriends];

  bindMenuEvents();

  loadPublicSongs();
}

function bindMenuEvents() {
  publicSongs.addEventListener('click', function() {
    loadPublicSongs();
  });
  yourSongs.addEventListener('click', function() {
    loadYourSongs();
  });
  playlists.addEventListener('click', function() {
    loadPlaylists();
  });
  yourFriends.addEventListener('click', function() {
    loadYourFriends();
  });
}

function loadPublicSongs() {
  var tracks = getPublicSongs(); // service.getPublicSongs();
  clearSelected();
  publicSongs.classList = 'selected';
  container.innerHTML = '';
  tracks.forEach(function(item) {
    container.appendChild(new TrackEl(item.name, item.title, item.mp3, item.image));
  });
}

function loadYourSongs() {
  var tracks = getYourSongs(); // service.getYourSongs();
  clearSelected();
  yourSongs.classList = 'selected';
  container.innerHTML = '<a href="load-your-songs.html">Load your songs</a><br>';
  tracks.forEach(function(item) {
    container.appendChild(new TrackEl(item.name, item.title, item.mp3, item.image));
  });
  console.log(tracks);
}

function loadPlaylists() {
  console.log('load playlists');
  var playlistsItems = getPlaylists(); // service.getPlaylists();
  clearSelected();
  playlists.classList = 'selected';
  container.innerHTML = '';
  playlistsItems.forEach(function(item) {
    container.appendChild(new PlaylistEl(item));
  });
}

function clearSelected() {
  allMenuItems.forEach(function(el) {
    el.classList = '';
  })
}

function getPlaylists() {
  return [
    new Playlist('classica',
      [ new Song('tatatataaaaaaa', 'Einaudi', 'xxx'),
        new Song('dududuuuuu', 'lalalalalaaa', 'ciaociao')
      ]
    ),
    new Playlist('trap',
      [
        new Song('Ciaoo', 'Signorino', 'ciaociao')
      ] 
    )
  ];
}

function getPublicSongs() {
  return [{
    name: 'Nuvole Bianche',
    title: 'Ludovico Einaudi',
    mp3: 'ccc',
    image: 'https://rockitecn.nohup.it/foto/20633/ludovico-einaudi-primavera-sheet-music-intervista.jpg?new'
  },
  {
    name: 'aaa',
    title: 'bbb',
    mp3: 'ccc'
  },
  {
    name: 'aaa',
    title: 'bbb',
    mp3: 'ccc'
  }]
}

function getYourSongs() {
  service.getSongs(function(data) {
    console.log(data);
  });
  return  [ {
    name: 'cane',
    title: 'bbb',
    mp3: 'ccc'
  },
  {
    name: 'gatto',
    title: 'bbb',
    mp3: 'ccc'
  },
  {
    name: 'aaa',
    title: 'bbb',
    mp3: 'ccc'
  },
  {
    name: 'aaa',
    title: 'bbb',
    mp3: 'ccc'
  },
  {
    name: 'aaa',
    title: 'bbb',
    mp3: 'ccc'
  }];
}
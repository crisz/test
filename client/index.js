
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
  changeView(publicSongs);

  getPublicSongs(function (tracks) {
    container.innerHTML = '';
    tracks.forEach(function(item) {
      container.appendChild(new TrackEl(item.name, item.title, item.mp3, item.image));
    });
    console.log(tracks);
  });
}

function loadYourSongs() {
  changeView(yourSongs);
  getYourSongs(function (tracks) {
    container.innerHTML = '<a href="load-your-songs.html">Load your songs</a><br>';
    tracks.forEach(function(item) {
      container.appendChild(new TrackEl(item.name, item.title, item.mp3, item.image));
    });
    console.log(tracks);
  });
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

function loadYourFriends() {
  changeView(yourFriends);
  getYourFriends(function (friends) {
    container.innerHTML = '<div class="search-friend"><label for="search-friend">Search your friends</label><input type="text" id="search-friend" placeholder="username"></div>';
    friends.forEach(function(item) {
      container.appendChild(new FriendEl(new Friend(item.username, item.listening)));
    });
    console.log(friends);
  });
}

function changeView(newView) {
  clearSelected();
  newView.classList = 'selected';
  container.innerHTML = '<div class="loader"></div>'
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

function getPublicSongs(cb) {
  service.getPublicSongs(cb)
}

function getYourSongs(cb) {
  service.getSongs(cb);
}

function getYourFriends(cb) {
  service.getYourFriends(cb);
}
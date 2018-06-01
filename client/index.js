
var container, publicSongs, yourSongs, playlists, yourFriends;
var allMenuItems;
function init() {
  
  window.onbeforeunload = function (e) {
    /*
    TODO: save track status
    */
  };
  var welcomeField = document.getElementById('welcome');
  var loginField = document.getElementById('login');
  var signupField = document.getElementById('sign-up');
  var logoutField = document.getElementById('logout');
  var username = sessionStorage.getItem('username');
  
  logoutField.addEventListener('click', function() {
    sessionStorage.removeItem('username');
    window.location.href = window.location.origin;
  });
  if (username) {
    welcomeField.innerText = 'Hi '+username+'!';
    loginField.style.display = 'none';
    signupField.style.display = 'none';
    welcomeField.style.display = 'inline';
    logout.style.display = 'inline';
  }
  else {
    welcomeField.style.display = 'none';
    logoutField.style.display = 'none';
    loginField.style.display = 'inline';
    signupField.style.display = 'inline';
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

var trackElements = [];

function loadPublicSongs() {
  changeView(publicSongs);

  getPublicSongs(function (tracks) {
    container.innerHTML = '<div class="search-song"><label for="search-song">Search public songs</label><input type="search" id="search-song" placeholder="Search song..."></div>'; 
    trackElements = [];
    tracks.forEach(function(item) {
      console.log(item);
      var element = new TrackEl(item.title, item.author, item.mp3, item.img, item.album);
      trackElements.push(element);
      container.appendChild(element.element);
    });

    document.getElementById('search-song').addEventListener('keyup', function () {
      var self = this;
      trackElements.forEach(function (trackEl) {
        if (trackEl.match(self.value)) {
          trackEl.element.style.display = 'none';
        } else {
          trackEl.element.style.display = 'inline-block';
        }
      });
    });
  });
}

function loadYourSongs() {
  changeView(yourSongs);


  if (!sessionStorage.getItem('username')) {
    container.innerHTML = '<strong>You are not logged in. Login and listen to your songs!</strong>';
    return;
  }
  getYourSongs(function (tracks) {
    container.innerHTML = '<a href="load-your-songs.html">Load your songs</a><br>';
    container.innerHTML += '<div class="search-song"><label for="search-song">Search your songs</label><input type="search" id="search-song" placeholder="Search song..."></div>'; 
    
    trackElements = [];
    tracks.forEach(function(item) {
      var element = new TrackEl(item.title, item.author, item.mp3, item.img, item.album);
      trackElements.push(element);
      container.appendChild(element.element);
    });

    document.getElementById('search-song').addEventListener('keyup', function () {
      var self = this;
      trackElements.forEach(function (trackEl) {
        if (trackEl.match(self.value)) {
          trackEl.element.style.display = 'none';
        } else {
          trackEl.element.style.display = 'inline-block';
        }
      });
    });
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
    container.innerHTML = '<div class="add-friend"><label for="add-friend">Add your friends</label><input type="text" id="add-friend" placeholder="username"></div>'
    container.innerHTML += '<button onclick="addFriend()">Add friend</button>';
    
    friends.forEach(function(item) {
      container.appendChild(new FriendEl(new Friend(item.username, item.listening)));
    });
    console.log(friends);
  });
}

function changeView(newView) {
  clearSelected();
  newView.classList = 'selected';
  // container.innerHTML = '<div class="loader"></div>'
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



function scrollPublic() {
  loadPublicSongs();
  document.querySelector('#container').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function scrollYours() {
  loadYourSongs();
  document.querySelector('#container').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function scrollPlaylist() {
  loadPlaylists();
  document.querySelector('#container').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function scrollFriends() {
  loadYourFriends();
  document.querySelector('#container').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function addFriend() {
  var friend = document.getElementById('add-friend').value;
  service.addFriend(friend, function(object) {
    console.log(object);
  });
}
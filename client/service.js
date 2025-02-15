var service = (function() {
  var server;
  var method;
  
  function http(data, callback) {
    var request = new XMLHttpRequest();
    request.open(method || 'POST', server, true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // request.setRequestHeader('body', JSON.stringify(data));
    request.send(JSON.stringify(data)); 

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        setTimeout(() => callback(JSON.parse(request.response)), 0);
      }
    }
  }

  function getSongs(cb) {
    server = 'api/songs/'+sessionStorage.getItem('username');
    method = 'GET';
    var data = {};

    http(data, function(res) {
      res.forEach(el => {
        el.mp3 = 'mp3/'+el.mp3_path;
        el.img = 'img/'+el.img_path;          
      });

      console.log('yours', res);

      cb(res);
    });
  }

  function getPublicSongs(cb) {
    server = 'api/songs';
    method = 'GET';
    var data = {};

    http(data, function(res) {
      res.forEach(el => {
        el.mp3 = 'mp3/'+el.mp3_path;
        el.img = 'img/'+el.img_path;          
      });

      cb(res);
    });
  }

  function login(username, password, cb) {
    server = 'auth/login';
    method = 'POST';
    var data = {username, password};

    http(data, cb);
  }

  function signup(data, cb) {
    server = 'auth/sign-up';
    method = 'POST';

    http(data, cb);
  }

  function getYourFriends(cb) {
    server = 'api/friends/'+sessionStorage.getItem('username');
    method = 'GET';
    var data = {};

    http(data, cb);
  }

  function addFriend(friend, cb) {
    server = 'api/friends/'+sessionStorage.getItem('username');
    method = 'POST';
    var data = {username: friend}

    http(data, cb);
  }
  return {addFriend, getSongs, getPublicSongs, getYourFriends, login, signup};
})();
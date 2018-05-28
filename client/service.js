console.log('service');
var service = (function() {
  var server = 'api';
  
  function http(data, callback) {
    var request = new XMLHttpRequest();
    request.open('POST', server, true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // request.setRequestHeader('body', JSON.stringify(data));
    request.send(JSON.stringify(data)); 
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        callback(request.response);
      }
    }
  }

  function getSongs(cb) {
    var data = {
      username: 'cristian'
    };

    http(data, cb);
  }
  return {getSongs};
})();
function Friend(username, listening) {
  this.username = username;
  this.listening = listening;
}

function FriendEl(friend) {
  var friendEl = document.createElement('div');
  friendEl.classList = 'friend';
  friendEl.innerHTML = '<strong>' + friend.username + '</strong> - ' + friend.listening+' - <a href="#">Remove friend</a>';
  var songEl = document.createElement('div');
  songEl.style.textAlign = 'center';
  songEl.appendChild(new TrackEl('Bocca di rosa', 'Fabrizio De Andrè', null, 'https://rockitecn.nohup.it/foto/28878/deandre-trap.jpg?new').element);
  friendEl.appendChild(songEl);
  return friendEl;
}
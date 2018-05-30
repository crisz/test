function init() {
  document.getElementById('form').onsubmit = function(event) {
    console.log(window.location);
    event.preventDefault();
    console.log(this.username.value, this.password.value);
    service.login(this.username.value, this.password.value, function(response) {
      if(response.error) {
        alert('Login fallito');
      } else {
        sessionStorage.setItem('username', response.username);
        window.location.href = window.location.origin;
      }
    })
  }
}

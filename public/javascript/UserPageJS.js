function myFunction() {
  document.getElementById("i2").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.p3')) {
      var dropdowns = document.getElementsByClassName("dropdown");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

function redirectToProfile() {
  window.location.href = "../../views/user/UserProfile.html";
}

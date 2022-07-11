function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

window.onscroll = function() {myFunction3()};

function myFunction3() {
  if (document.documentElement.scrollTop > 1700) {
    document.getElementById("myP").style.position = "absolute";
    document.getElementById("myP").style.top = "1700px";
  } else if(document.documentElement.scrollTop <= 1700) {
    document.getElementById("myP").style.position = "fixed";
    document.getElementById("myP").style.top = "70px";
  }
}

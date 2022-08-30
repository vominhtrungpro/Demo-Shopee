window.onscroll = function() {myFunction1()};

function myFunction1() {
  if (document.documentElement.scrollTop > 1700) {
    document.getElementById("myP").style.position = "absolute";
    document.getElementById("myP").style.top = "1700px";
  } else if(document.documentElement.scrollTop <= 1700) {
    document.getElementById("myP").style.position = "fixed";
    document.getElementById("myP").style.top = "70px";
  }
}


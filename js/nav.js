document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  loadNavigation();

  function loadNavigation() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // load page content
  var page = window.location.hash.substr(1);
  var search = window.location.search;
  if(!search) {
    if (page === "") page = "standing";
    loadPage(page);
  }

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector("#content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          if (page == "standing") {
            getStandingsCompetitions("2021");
          } else if (page == "match") {
            getMatchesCompetitions("2021", 1);
          } else if(page == "teams") {
            getTeams("2021");
            window.dbInsertFavoriteTeam = dbInsertFavoriteTeam;
          } else if(page == "favorite") {
            getFavoriteTeam();
            window.dbDeleteFavoriteTeam = dbDeleteFavoriteTeam;
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});

$(function () {
  $(document).scroll(function () {
    var $nav = $(".fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

$('#weathe-button').click(function() {
  window.open('https://asaser.github.io/WeatherAPI/', "_blank");
});

$('#website-1').click(function() {
  window.open('https://dgfoto.pl', "_blank");
});

$('#website-2').click(function() {
  window.open('https://krzysiekkozorys.pl', "_blank");
});

$('#website-3').click(function() {
  window.open('https://www.hjemhage.no', "_blank");
});
function getWeather(){
  var myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", function(){
    var weather = JSON.parse(this.responseText);
    var sunrise = weather.sys.sunrise;
    var sunset = weather.sys.sunset;
    var current_time = new Date().getTime()/1000;
    var high_noon = (sunset-sunrise)/2;
    var seconds_since_sunrise = current_time-sunrise;
    var percent_left = (seconds_since_sunrise/(sunset-sunrise))*100;
    if (seconds_since_sunrise < high_noon) {
      var percent_bottom = (seconds_since_sunrise/high_noon)*100;
    } else {
      var percent_bottom = (high_noon/seconds_since_sunrise)*100;
    }
    document.getElementById('sun').style.marginLeft = percent_left + "%";
    document.getElementById('sun').style.bottom = percent_bottom + "%";


    document.getElementById('temperature').innerHTML = parseInt(weather.main.temp)+'&deg;';
  });
  myRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Miami+Beach,FL&units=imperial&appid=44db6a862fba0b067b1930da0d769e98')
  myRequest.send();
}

window.onload = getWeather;

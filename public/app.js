'use strict';

var yourcolor = {};

yourcolor.appOnReady = function() {
  window.onhashchange = function() {
    yourcolor.showView(window.location.hash);
  }
  yourcolor.showView(window.location.hash);
}

yourcolor.showView = function(hash) {
  var routes = {
    ''       : yourcolor.landingView,
    '#'      : yourcolor.landingView,
    '#birth' : yourcolor.birthView,
  };
  var viewFn = routes[hash];
  if (viewFn) {
    $('.view-container').empty().append(viewFn);
  }
}

yourcolor.landingView = function() {
  var view = yourcolor.template('landing-view');
  $('#body').css('background-color','white');
  return view;
}

yourcolor.birthView = function() {
  previousDay = "";
  var view = yourcolor.template('birth-view');
  $('.view-container .landing-view').fadeOut();
  $('#body').css('background-color','#5383c3');
  return view;
}

yourcolor.template = function(name) {
  return $('.templates .' + name).clone();
}


var previousDay;

function selectChange_month(obj) {
  populateDays(obj.value);
}

function selectChange_day(obj) {
  previousDay = obj.value;
}

function populateDays(month) {
  var daySelect = document.querySelector('#day');
  while(daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }
  
  var dayNum;
  if (month === '01' | month === '03' | month === '05' | month === '07' | month === '08' | month === '10' | month === '12') {
    dayNum = 31;
  } else if (month === '04' | month === '06' | month === '09' | month === '11') {
    dayNum = 30;
  } else {
    dayNum = 29;
  }

  for (var i = 1; i <= dayNum; i++) {
    var option = document.createElement('option');
    option.textContent = ('00' + i).slice(-2) + "日";
    option.value = ('00' + i).slice(-2);
    daySelect.appendChild(option);
  }

  if (previousDay) {
    daySelect.value = previousDay;
    if (daySelect.value === "") {
      daySelect.value = previousDay - 1;
    }
    if (daySelect.value === "") {
      daySelect.value = previousDay - 2;
    }
    if (daySelect.value === "") {
      daySelect.value = previousDay - 3;
    }
  }
}
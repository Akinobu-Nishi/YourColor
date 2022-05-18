'use strict';

var yourcolor = {};

yourcolor.mon;  //誕生月
yourcolor.day;  //誕生日
yourcolor.data;

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
    $('body').fadeOut(500);
    setTimeout (function() {
      $('.view-container').empty().append(viewFn);
    }, 500);
    $('body').fadeIn(500);
  }
}

yourcolor.landingView = function() {
  var previousDay;
  var view = yourcolor.template('landing-view');
  yourcolor.mon = "";
  yourcolor.day = "";

  view.find('.month-select').change(function() {
    yourcolor.mon = $(this).val();
    populateDays(yourcolor.mon);
  });
  view.find('.day-select').change(function() {
    yourcolor.day = $(this).val();
    previousDay = yourcolor.day;
  });
  view.find('.enter-btn').on('click', function(e) {
    e.preventDefault();
    if (yourcolor.mon === undefined | yourcolor.mon === "" | yourcolor.day === undefined | yourcolor.day === "") {
      alert('誕生日を選択してください');
      return false;
    }
    var link = $(this).attr('href');
    if (link !== '') {
      window.location.hash = link;
    }
    return false;
  });

  function populateDays(month) {
    var daySelect = document.querySelector('.day-select');
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
      yourcolor.day = daySelect.value;
    } else {
      daySelect.value = '01';
      yourcolor.day = daySelect.value;
    }
  }

  $('body').css('background-color','white');
  return view;
}

yourcolor.birthView = function() {
  var view = yourcolor.template('birth-view');
  var birthday = yourcolor.mon + "/" + yourcolor.day;

  if (!yourcolor.data) {
    $.ajax({
      beforeSend: function(xhr){
        xhr.overrideMimeType('text/html;charset=Shift_JIS');
      },
      type: "GET",
      url: "data.json",
      dataType: "json",
      async: false,
      cache: false
    }).then(
      function(json) {
        yourcolor.data = JSON.parse(JSON.stringify(json));
      },
      function (jqXHR, textStatus, errorThrown) {
        console.log("JSONファイルの読み込み失敗");
        console.log("jqXHR : " + jqXHR.status);
        console.log("textStatus : " + textStatus);
        console.log("errorThrown : " + errorThrown.message);
      }
    );  
  }

  var item = yourcolor.data.find((v) => v.Birthday === birthday)
  var r = parseInt(item.ColorCode[1]+item.ColorCode[2],16);
  var g = parseInt(item.ColorCode[3]+item.ColorCode[4],16);
  var b = parseInt(item.ColorCode[5]+item.ColorCode[6],16);

  view.find('#color-name').text(item.ColorName);
  $('body').css('background-color',item.ColorCode);
  if ((r+g+b) < 512) {
    view.find('#color-name').css('color', 'white');
  }
 
  $('body').fadeIn(500);
  return view;
}

yourcolor.template = function(name) {
  return $('.templates .' + name).clone();
}
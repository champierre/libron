$(document).ready(function(){
  var full_window_check_box = $('input#full_window');
  if (Cookies.get('full_window') == 'true') {
    full_window_check_box.prop('checked', true);
    setTimeout(function() {
      var liburl = $('div#library-page').data('liburl');
      if (Cookies.get('full_window') == 'true') {
        location.href = liburl;
      }
    }, 3000);
  } else {
    full_window_check_box.prop('checked', false);
  }

  full_window_check_box.change(function(){
    if ($(this).is(':checked')) {
      Cookies.set('full_window', 'true', { expires: 90 });
    } else {
      Cookies.remove('full_window');
    }
  });
});

$( document ).ready(function() {
  var unreadMessages = 0;
  $('button').prop('disabled', true);
  $('.dropdown').addClass('disabled');
  $('.message').each(function(index) {
    $(this).addClass('unread');
    unreadMessages += 1;
  });
  messageNumCheck();
  $( "#multiselect" ).on( "click", function(){    
    
    $(".message").toggleClass('selected');

    if( $(".message").hasClass('selected') ) {
      $('input[type=checkbox]').each(function() {
        $(this).prop( "checked", true);  
        $('button').prop('disabled', false);  
      });
    } else {
      $('input[type=checkbox]').each(function() {
        $(this).prop( "checked", false);  
        $('button').prop('disabled', true);
        $('.dropdown').addClass('disabled');  
      });
    }   
  });

  $('input[type=checkbox]').on('click', function() { 
    $(this).closest('.message').toggleClass('selected');
    runCheck();  
  });

  $(".fa").on('click', function() {
    if ($(this).hasClass('fa-star-o')) {
      $(this).removeClass('fa-star-o').addClass('fa-star');
    }
    else if ($(this).hasClass('fa-star')) {
      $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });

  $('#read-button').on('click', function() {
    var $selected = $("input.message-checkbox[type=checkbox]:checked");
    $selected.each(function() {
      var $message = $(this).closest('.message');
      $message.removeClass('selected');
      if (!$message.hasClass('read')) {    
        $message.removeClass('unread').addClass('read');
        unreadMessages -= 1;
      }
    });
    messageNumCheck();
    $selected.prop('checked', false);
  });
  $('#unread-button').on('click', function() {
    var $selected = $("input.message-checkbox[type=checkbox]:checked");
    $selected.each(function() {
      var $message = $(this).closest('.message');
      $message.removeClass('selected');    
      if (!$message.hasClass('unread')) {
        $message.removeClass('read').addClass('unread');
        unreadMessages += 1;
      }
    });
    messageNumCheck();
    $selected.prop('checked', false);
  });

  $('#delete').on('click', function(){
    var $message = $("input.message-checkbox[type=checkbox]:checked").closest('.message');
    $message.each(function(){
      unreadMessages -= 1;
      $message.remove();
      messageNumCheck();
    });

  });

function messageNumCheck() {
  if (unreadMessages === 1) {
    $('#message-num').closest('a').html('<span id="message-num" class="badge">1</span>' + '  unread message');
  }
  else if (unreadMessages === 0 || unreadMessages > 1 ) {
    $('#message-num').closest('a').html('<span id="message-num" class="badge">' + unreadMessages + '</span>' + '  unread messages');
    $('button').prop('disabled', true);
    $('.dropdown').addClass('disabled');

  }
  $('#message-num').html(unreadMessages);
}


function runCheck() {
  var $checkedBoxes = $("input.message-checkbox[type=checkbox]:checked");
  var $messageCheckboxes = $('.message-checkbox');
    if ($checkedBoxes.length === $messageCheckboxes.length) {
      $( "#multiselect" ).prop("indeterminate", false).prop("checked", true);
      $('button').prop('disabled', false);
      $('.dropdown').removeClass('disabled');

    }
    else if ($checkedBoxes.length === 0) {
      $( "#multiselect" ).prop("indeterminate", false);
      $( "#multiselect" ).prop("checked", false);
      $('button').prop('disabled', true);
      $('.dropdown').addClass('disabled');

    } 
    else if ($("input.message-checkbox[type=checkbox]:checked").length < $messageCheckboxes.length) {
      $( "#multiselect" ).prop("indeterminate", true);
      $('button').prop('disabled', false);
      $('.dropdown').removeClass('disabled');

    }        
}

//applying labels

$('ul.dropdown-menu > li').on('click', function() {
  var $selected = $("input.message-checkbox[type=checkbox]:checked");
  var $message = $selected.closest('.message');
  var label = $(this).find('a').text(); 
  var labels = {
    Dev: 'label-success',
    Important: 'label-danger',
    Personal: 'label-warning'
  }
  var keys = Object.keys(labels);
  for (var x in keys) {
    if (label == keys[x]) {
      if (!$message.hasClass(label)) {
        var $target = $selected.closest('td').next('td').next('td').prepend('<span class="label '+ labels[label] +' label-as-badge">'+ label +'</span>');
      }
    }
  }
  $selected.each(function() {
    $message.addClass(label);
    $message.removeClass('selected');    
    $selected.prop('checked', false);
  });
});




});









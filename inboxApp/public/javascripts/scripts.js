$( document ).ready(function() {
  var unreadMessages = 0;
  console.log(unreadMessages);
  $('button').prop('disabled', true);
  $('.message').each(function(index) {
    $(this).addClass('unread');
    unreadMessages += 1;
  });
  messageNumCheck();
  // $('#message-num').html(unreadMessages);
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
      });
    }   
  });

  $('input[type=checkbox]').on('click', function() { 
    $(this).closest('.message').removeClass('unread').toggleClass('selected'); 
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
    var $readMessages = $("input.message-checkbox[type=checkbox]:checked");
    $readMessages.each(function() {
      $(this).closest('.message').removeClass('unread').addClass('read');
      unreadMessages -= 1;
    });
    messageNumCheck();
    // $('#message-num').html(unreadMessages);
    $readMessages.prop('checked', false);
  });

function messageNumCheck() {
  if (unreadMessages === 1) {
    $('#message-num').closest('a').html('<span id="message-num" class="badge">1</span>' + '  unread message');
  }
  $('#message-num').html(unreadMessages);
}


function runCheck() {
  var $checkedBoxes = $("input[type=checkbox]:checked");
  var $messageCheckboxes = $('.message-checkbox');

    if ($checkedBoxes.length === $messageCheckboxes.length) {
      $( "#multiselect" ).prop("indeterminate", false).prop("checked", true);
      $('button').prop('disabled', false);
    }
    else if ($checkedBoxes.length === 0) {
      $( "#multiselect" ).prop("indeterminate", false);
      $( "#multiselect" ).prop("checked", false);
      $('button').prop('disabled', true);
    } 
    else if ($("input.message-checkbox[type=checkbox]:checked").length < $messageCheckboxes.length) {
      $( "#multiselect" ).prop("indeterminate", true);
      $('button').prop('disabled', false);
    }        
}



});









$( document ).ready(function() {
  $('button').prop('disabled', true);

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


function runCheck() {
  var $checkedBoxes = $("input[type=checkbox]:checked");
  var $messageCheckboxes = $('.message-checkbox');
  console.log($messageCheckboxes.length)
  console.log($("input.message-checkbox[type=checkbox]:checked").length)

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









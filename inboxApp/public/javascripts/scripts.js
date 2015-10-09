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
    $('button').prop('disabled', false); 
    runCheck();   
  });



function runCheck() {
  var $checkedBoxes = $("input[type=checkbox]:checked");
  var $messageCheckboxes = $('.message-checkbox');

$('input[type=checkbox]').each(function() {
    if ($checkedBoxes.length === $messageCheckboxes.length) {
      $( "#multiselect" ).prop("indeterminate", false).prop("checked", true);
    } 
    else if ($checkedBoxes.length < $messageCheckboxes.length) {
      $( "#multiselect" ).prop("indeterminate", true);
    }
     
  });
}



});









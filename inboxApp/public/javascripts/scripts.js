$( document ).ready(function() {
  $('button').prop('disabled', true);

  $( "#multiselect" ).on( "click", function(){    
    
    $(".message").toggleClass('selected');
    $('input[type=checkbox]').each(function() {
      $(this).prop( "checked", true );
      $('button').prop('disabled', false);
    })
  


  });

});


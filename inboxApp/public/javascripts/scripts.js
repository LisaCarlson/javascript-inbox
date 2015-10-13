$( document ).ready(function() {
  var messages = [
  {
    "id": 1,
    "subject": "Helvetica messenger bag Portland iPhone plaid ugh DIY aesthetic small batch. Typewriter dreamcatcher squid Etsy blog kale chips hella, cardigan distillery.",
    "read": true,
    "starred": false,
    "labels": [
      "dev",
      "personal"
    ]
  },
  {
    "id": 2,
    "subject": "Banksy Truffaut PBR tilde Thundercats. Chambray letterpress slow-carb dreamcatcher. Literally farm-to-table church-key, before they sold out disrupt",
    "read": false,
    "starred": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Forage ennui squid hella stumptown yr, iPhone flexitarian letterpress Brooklyn semiotics. Echo Park messenger bag sartorial listicle umami. Marfa XOXO +1 small",
    "read": false,
    "starred": true,
    "labels": []
  },
  {
    "id": 4,
    "subject": "Disrupt Thundercats quinoa umami artisan keytar. Artisan four dollar toast kogi whatever tattooed, meditation keytar Portland brunch pork belly",
    "read": false,
    "starred": true,
    "labels": []
  }
];
  var unreadMessages = 0;
  renderMessages(messages);

  // $('button').prop('disabled', true);
  // $('.dropdown').addClass('disabled');
  // $('.message').each(function(index) {
  //   $(this).addClass('unread');
  //   unreadMessages += 1;
  // });


  messageNumCheck();
  $( "#multiselect" ).on( "click", function(){    
    var $messageRow = $('.message');
    $messageRow.each(function() {
      localStorage.setItem($(this).attr('data-id'), 'selected');
      localStorage.setItem($('#multiselect').attr('data-id'), 'selected');
    });

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
    var $messageRow = $(this).closest('.message');
    if ($messageRow.hasClass('selected')) {
      $messageRow.removeClass('selected');
      localStorage.setItem($messageRow.attr('data-id'), 'unselected');
    }
    else {
      $messageRow.addClass('selected');
      localStorage.setItem($messageRow.attr('data-id'), 'selected');
    }
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
      localStorage.setItem($message.attr('data-id'), 'unselected');
      localStorage.setItem($('#multiselect').attr('data-id'), 'unselected');
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
      localStorage.setItem($message.attr('data-id'), 'unselected');
      localStorage.setItem($('#multiselect').attr('data-id'), 'unselected');
    
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

function renderMessages(array) {
  for (var x in array) {
    var message = array[x];
    addMessage(message);
  }
}

function addMessage(message) {
  var $message = $('<tr class="message" data-id='+ message.id + '><td class="message-cell-check"><input type="checkbox" class="message-checkbox" /></td><td class="message-cell-star"><i class="fa fa-star-o"></i></td><td>'+ message.subject +'</td></tr>');
  $('#messages tbody').append($message);
  if(localStorage.getItem(message.id) == 'selected'){
    $message.find('.message-checkbox').prop('checked', true);
    $message.addClass('selected');
  }
}

function messageNumCheck() {
  var $selected = $("input.message-checkbox[type=checkbox]:checked");
  if($selected.length > 0) {
    $('button').prop('disabled', false);
  }
  else if (unreadMessages === 1) {
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
var labels = {
    Dev: 'label-success',
    Important: 'label-danger',
    Personal: 'label-warning',
  }

$('ul.dropdown-menu.add-label > li').on('click', function() {
  var $selected = $("input.message-checkbox[type=checkbox]:checked");
  var $message = $selected.closest('.message');
  var label = $(this).find('a').text(); 
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
  if (label == 'Create New Label') {
    $('#newLabelModal').modal('show');
  }

  $('#createLabel').on('click', function() {
    var labelName = $('#new-label').val();
    $('.add-label, .remove-label').append('<li class="custom-label"><a href="#">'+ labelName +'</a></li>');
    labels[labelName] = 'label-default';
    console.log(labels)
    if (!$message.hasClass(labelName)) {
      $selected.closest('td').next('td').next('td').prepend('<span class="label label-default label-as-badge">'+ labelName +'</span>');
    }
    $selected.each(function() {
      $message.addClass(labelName);
      $message.removeClass('selected');    
      $selected.prop('checked', false);
    });
    $('#newLabelModal').modal('hide');
  });
});

// $('.custom-label').on('click', function() {
//   console.log('test')
// })

//remove label

$('ul.dropdown-menu.remove-label > li').on('click', function() {
  var $selected = $("input.message-checkbox[type=checkbox]:checked");
  var $message = $selected.closest('.message');
  var label = $(this).find('a').text(); 
  if($message.hasClass(label)){
    $message.find('span.'+labels[label]).remove();
    $message.removeClass('selected');    
    $selected.prop('checked', false);
  }
});



});









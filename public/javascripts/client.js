$(document).ready(function(){

    $('.client-button').on('click', function(e) {
        e.preventDefault();
        
        var data = {
            headline: $('#client-headline').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/tables/table'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.create-client__form').before('<p class="register__error">' + data.error + '</p>');
            } else {
             $(location).attr('href', '/');
            }
          });
      });
    });
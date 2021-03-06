$(document).ready(function(){

$('.publish-button').on('click', function(e) {
    e.preventDefault();
    $('p.register__error').remove();
    $('.register__error').removeClass('register__error');
    
    var data = {
        title: $('#post-title').val()
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/post/add'
      }).done(function(data) {
          console.log(data);
        if(!data.ok) {
          $('.new-table__form').before('<p class="register__error">' + data.error + '</p>');
        } else {
         $(location).attr('href', '/post/add');
        }
      });
  });
});
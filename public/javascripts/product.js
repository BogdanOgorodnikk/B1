$(document).ready(function(){

    $('.client-info__button').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');

        var data = {
            title: $('#client-info__name').val(),
            characteristic: $('#client-info__charact').val(),
            number: $('#client-info__number').val(),
            price: $('#client-info__price').val(),
            pledge: $('#client-info__pladge').val(),
            client: $(".client-info__client-name").attr('id'),
            owner: $(".client-info__create").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/products/product'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.client-info__createss').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });
    });
let userIcon = document.querySelectorAll(".show__table");
for(let i = 0; i < userIcon.length; i++) {
  userIcon[i].onclick = function() {
    this.nextElementSibling.classList.toggle("none");
  }
}

$(document).ready(function(){
  $(".btn-nav").on("click", function() {
      var target = $(this).data("target");
      $(target).toggleClass("nav__list--open");
  });
});

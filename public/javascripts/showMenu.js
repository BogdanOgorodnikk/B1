let userIcon = document.querySelectorAll(".show__table");
for(let i = 0; i < userIcon.length; i++) {
  userIcon[i].onclick = function() {
    this.nextElementSibling.classList.toggle("none");
  }
}
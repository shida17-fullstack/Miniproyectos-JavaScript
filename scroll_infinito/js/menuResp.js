document.addEventListener('DOMContentLoaded', function() {
    var menuBtn = document.querySelector('.menu-btn');
    var menuList = document.querySelector('.menu-list');

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        menuList.classList.toggle('show');
    });
});

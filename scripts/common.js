// theme button

var themeBtn = document.querySelectorAll('.theme-btn')

const savedThemeMode = localStorage.getItem('themeMode');
const mediaDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

if (mediaDarkMode.matches || savedThemeMode === 'dark') {
  setThemeMode('dark');
} else {
  setThemeMode('light');
}

for (i = 0; i < themeBtn.length; i++) {
  themeBtn[i].addEventListener('click', themeCtrl)
}

function isDarkMode() {
  var icon = themeBtn[0].querySelector('.icon')
  var current = window.getComputedStyle(icon)
  return current.left === '1px' ? false : true;
}

function themeCtrl() {
  if (!isDarkMode()) {
    setThemeMode('dark');
  } else {
    setThemeMode('light');
  }
  localStorage.setItem('themeMode', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function setThemeMode(mode) {
  var icon = new Array(themeBtn.length);
  for (i = 0; i < themeBtn.length; i++) {
    icon[i] = themeBtn[i].querySelector('.icon');
  }
  if (mode === 'dark') {
    for (j = 0; j < icon.length; j++) {
      icon[j].querySelector('.sun').style.opacity = 0;
      icon[j].querySelector('.moon').style.opacity = 1;
      icon[j].style.left = 'unset';
      icon[j].style.right = '1px';
      document.documentElement.classList.add('dark');
    }
  } else {
    for (j = 0; j < icon.length; j++) {
      icon[j].querySelector('.moon').style.opacity = 0;
      icon[j].querySelector('.sun').style.opacity = 1;
      icon[j].style.right = 'unset';
      icon[j].style.left = '1px';
      document.documentElement.classList.remove('dark');
    }
  }
}




// menu button

var menuBtn = document.querySelector('.menu-btn');
var smallMenu = document.querySelector('.small-menu');
var backdrop = document.querySelector('.backdrop');
menuBtn.addEventListener('click', function () {
  if (window.getComputedStyle(smallMenu).display === 'none') {
    smallMenu.style.display = 'block';
    backdrop.style.display = 'block';
    document.body.style.overflow = 'hidden';
  } else {
    smallMenu.style.display = 'none';
    backdrop.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth > 1200) {
    smallMenu.style.display = 'none';
    backdrop.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('click', function (event) {
  if (window.getComputedStyle(smallMenu).display === 'block'
    && !smallMenu.contains(event.target)
    && !document.querySelector('.header').contains(event.target)) {
    smallMenu.style.display = 'none';
    backdrop.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});




















// update copyright year
document.getElementById('year').innerHTML = new Date().getFullYear()
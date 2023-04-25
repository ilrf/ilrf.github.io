
var subTitle = document.querySelector('.markdown').querySelectorAll('h2')

var outline = document.querySelector('.outline').querySelector('ul');

var outlineMarker = document.querySelector('.outline').querySelector('.outline-marker');

for (i = 0; i < subTitle.length; i++) {
  var li = document.createElement('li')
  outline.appendChild(li)

  li.innerHTML = subTitle[i].innerHTML;

  // subTitle[i].setAttribute('id', 'section-' + i);
}


var currentTopTitle = 0;
window.addEventListener('scroll', function () {
  for (var i = 1; i < subTitle.length; i++) {
    headingTop = subTitle[i - 1].getBoundingClientRect().top;
    nextHeadingTop = subTitle[i].getBoundingClientRect().top;
    if (i === 1 && headingTop > 0) {
      currentTopTitle = 0;
    }
    if (headingTop < 0 && nextHeadingTop > 0) {
      currentTopTitle = nextHeadingTop < window.innerHeight * 0.7 ? i : i - 1;
      break;
    }
    if (i === subTitle.length - 1 && nextHeadingTop < 0) {
      currentTopTitle = i;
      break;
    }
  }
  var markerDistance = 4 + 28 * currentTopTitle;
  outlineMarker.style.top = markerDistance + 'px';
  for (var i = 0; i < subTitle.length; i++) {
    outline.querySelectorAll('li')[i].style.color = 'var(--text-color)';
  }
  outline.querySelectorAll('li')[currentTopTitle].style.color = 'var(--theme-color)';
});




document.addEventListener('click', function (event) {
  if (document.querySelector('.sidebar').querySelector('.sidebar-title').contains(event.target)) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  if (outline.contains(event.target)) {
    for (var i = 0; i < subTitle.length; i++) {
      if (event.target === outline.querySelectorAll('li')[i]) {
        console.log(event.target);
        window.scrollTo({
          top: subTitle[i].getBoundingClientRect().top + window.pageYOffset - parseInt(window.getComputedStyle(document.querySelector('.header')).height),
          behavior: 'smooth'
        });
        break;
      }
    }

  }
})







// katex config
document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body, {
    // customised options
    // • auto-render specific keys, e.g.:
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true }
    ],
    // • rendering keys, e.g.:
    throwOnError: false
  });
});


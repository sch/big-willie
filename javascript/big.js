var s   = document.getElementsByTagName('div');
var cur = 0;
if (!s) return;
function go( n ) {
    cur = n;
    var i = 1e3, e = s[n];
    for (var k = 0; k < s.length; k++) s[k].style.display = 'none';
    e.style.display = 'inline';
    e.style.fontSize = i + 'px';
    if (e.firstChild.nodeName === 'IMG') {
        document.body.style.backgroundImage = 'url(' + e.firstChild.src + ')';
        e.firstChild.style.display = 'none';
    } else {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = e.style.backgroundColor;
    }
    while (
        e.offsetWidth > window.innerWidth ||
            e.offsetHeight > window.innerHeight) {
        e.style.fontSize = (i -= 10) + 'px';
    if (i < 0) break;
    }
    e.style.marginTop = ((window.innerHeight - e.offsetHeight) / 2) + 'px';
    if (window.location.hash !== n) window.location.hash = n;
    document.title = e.textContent || e.innerText;
}
document.onclick = function() {
    go(++cur % (s.length));
};
document.onkeydown = function(e) {
    var key = e.which;
    var j = 74, rightArrow = 39, downArrow = 40;
    var k = 75, leftArrow  = 37, upArrow   = 38;
    (key === j) && go(Math.min(s.length - 1, ++cur));
    (key === k) && go(Math.max(0, --cur));
};
function parse_hash() {
    return Math.max(Math.min(
        s.length - 1,
        parseInt(window.location.hash.substring(1), 10)), 0);
}
if (window.location.hash) cur = parse_hash() || cur;
window.onhashchange = function() {
    var c = parse_hash();
    if (c !== cur) go(c);
};

go(cur);

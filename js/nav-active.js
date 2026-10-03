(function(){
    function getFileName(path){
        if(!path) return 'index.html';
        var parts = path.split('/');
        var last = parts.pop() || parts.pop();
        return last || 'index.html';
    }
    var links = document.querySelectorAll('a.navigace');
    var current = getFileName(location.pathname);
    links.forEach(function(a){
        var href = a.getAttribute('href') || '';
        var linkFile = getFileName(href.split('?')[0].split('#')[0]);
        if(linkFile === current){
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

    var header = document.querySelector('header');
    function updateHeaderOnScroll(){
        if(!header) return;
        if(window.scrollY > 30){
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll);
})();

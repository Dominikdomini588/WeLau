(function () {
    function getFileName(path) {
        if (!path) return 'index.html';
        var parts = path.split('/');
        var last = parts.pop() || parts.pop();
        return last || 'index.html';
    }

    var links = document.querySelectorAll('a.navigace');
    var current = getFileName(location.pathname);

    links.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var linkFile = getFileName(href.split('?')[0].split('#')[0]);
        if (linkFile === current) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

    var slider = document.querySelector('.milestone-slider');
    if (slider) {
        var isDown = false;
        var startX = 0;
        var scrollLeft = 0;

        slider.addEventListener('pointerdown', function (event) {
            isDown = true;
            slider.classList.add('dragging');
            slider.setPointerCapture(event.pointerId);
            startX = event.clientX;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('pointermove', function (event) {
            if (!isDown) return;
            var walk = (event.clientX - startX) * 1.4;
            slider.scrollLeft = scrollLeft - walk;
        });

        var stopDragging = function () {
            isDown = false;
            slider.classList.remove('dragging');
        };

        slider.addEventListener('pointerup', stopDragging);
        slider.addEventListener('pointerleave', stopDragging);
        slider.addEventListener('pointercancel', stopDragging);
    }

    var cards = document.querySelectorAll('.media-tile[role="button"]');
    var lightbox = document.getElementById('lightbox');
    if (cards.length && lightbox) {
        var lightboxImage = document.getElementById('lightbox-image');
        var lightboxVideo = document.getElementById('lightbox-video');
        var lightboxCaption = document.getElementById('lightbox-caption');
        var closeButton = document.querySelector('.lightbox-close');

        var closeLightbox = function () {
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.removeAttribute('src');
                lightboxVideo.load();
                lightboxVideo.hidden = true;
            }
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
        };

        cards.forEach(function (card) {
            var showMedia = function () {
                var title = card.dataset.title || (card.querySelector('h2') && card.querySelector('h2').textContent) || 'Foto';
                lightboxCaption.textContent = title;
                if (card.dataset.video && lightboxVideo) {
                    lightboxImage.hidden = true;
                    lightboxVideo.hidden = false;
                    lightboxVideo.src = card.dataset.video;
                    lightboxVideo.load();
                    lightboxVideo.play().catch(function () {});
                } else {
                    if (lightboxVideo) {
                        lightboxVideo.pause();
                        lightboxVideo.removeAttribute('src');
                        lightboxVideo.load();
                        lightboxVideo.hidden = true;
                    }
                    lightboxImage.hidden = false;
                    lightboxImage.src = card.dataset.image;
                    lightboxImage.alt = title;
                }
                lightbox.classList.add('is-open');
                lightbox.setAttribute('aria-hidden', 'false');
            };

            card.addEventListener('click', showMedia);
            card.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    showMedia();
                }
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }
})();

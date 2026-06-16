document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('walkthrough-video');
    var player = document.getElementById('video-player');
    var overlay = document.getElementById('video-overlay');
    var playBtn = document.getElementById('video-play-btn');
    var heroPlayBtn = document.getElementById('hero-play-btn');
    var navLinks = document.querySelectorAll('.build-journey-nav a');
    var sections = document.querySelectorAll('.build-chapter, .build-hero-full');

    function playVideo() {
        if (!video) return;
        player.classList.add('is-playing');
        video.play().catch(function () {
            player.classList.remove('is-playing');
        });
    }

    if (playBtn) {
        playBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            playVideo();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', playVideo);
    }

    if (player) {
        player.addEventListener('click', function (e) {
            if (e.target === video || e.target.closest('video')) return;
            if (!player.classList.contains('is-playing')) {
                playVideo();
            }
        });
    }

    if (video) {
        video.addEventListener('pause', function () {
            if (video.currentTime > 0 && !video.ended) return;
            if (video.ended || video.currentTime === 0) {
                player.classList.remove('is-playing');
            }
        });

        video.addEventListener('ended', function () {
            player.classList.remove('is-playing');
        });

        video.addEventListener('play', function () {
            player.classList.add('is-playing');
        });
    }

    if (heroPlayBtn) {
        heroPlayBtn.addEventListener('click', function (e) {
            var target = document.getElementById('walkthrough');
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(playVideo, 600);
            }
        });
    }

    if (navLinks.length && sections.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var id = entry.target.id;
                if (!id) return;
                navLinks.forEach(function (link) {
                    link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
                });
            });
        }, { rootMargin: '-40% 0px -50% 0px' });

        sections.forEach(function (section) {
            if (section.id) observer.observe(section);
        });
    }
});

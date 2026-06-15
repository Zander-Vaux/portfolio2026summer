document.addEventListener('DOMContentLoaded', function () {
    const tocLinks = document.querySelectorAll('.eng-toc a[href^="#"]');
    const sections = document.querySelectorAll('.eng-section[id]');

    if (!tocLinks.length || !sections.length) return;

    function setActiveLink() {
        let current = '';
        const scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            if (section.offsetTop <= scrollY) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
});

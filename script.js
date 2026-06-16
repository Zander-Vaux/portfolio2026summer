document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalTagId = document.getElementById('modal-tag-id');
    const footerNote = document.querySelector('.footer-note');
    const lostItems = document.querySelectorAll('.lost-item');
    const deskSurface = document.querySelector('.desk-surface');

    const claimed = new Set();
    let lastFocused = null;
    let isModalOpen = false;

    function staggerModalContent() {
        const selectors = [
            'h2',
            '.modal-found',
            '.exp-section-title',
            '.timeline-item',
            '.modal-text p',
            '.modal-text ul',
            '.modal-grid > *',
            '.contact-item',
            '.contact-cta',
            '.project-card',
            '.blueprint-tile',
            '.blueprint-sheet-header',
            '.build-card-link',
            '.journal-entry--modal',
            '.photo-album-card',
            '.photo-vlog-card'
        ].join(', ');

        modalContent.querySelectorAll(selectors).forEach(function (el, i) {
            el.classList.add('motion-reveal');
            el.style.setProperty('--motion-delay', (i * 0.07) + 's');
        });
    }

    function openModal(panelId, triggerEl) {
        const panel = document.getElementById('panel-' + panelId);
        if (!panel || isModalOpen) return;

        lastFocused = triggerEl || document.activeElement;

        modalContent.innerHTML = panel.innerHTML;
        modalTagId.textContent = panel.dataset.tag || '---';

        if (panelId === 'engineering') {
            modalContent.classList.add('blueprint-modal');
        } else {
            modalContent.classList.remove('blueprint-modal');
        }

        isModalOpen = true;
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (triggerEl) {
            claimed.add(panelId);
            triggerEl.classList.add('claimed');
            updateFooterNote();
        }

        bindContactCopy();
        bindPhotoAlbums();
        requestAnimationFrame(staggerModalContent);
        modalClose.focus();
    }

    function closeModal() {
        if (!isModalOpen) return;

        isModalOpen = false;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modalContent.innerHTML = '';
        modalContent.classList.remove('blueprint-modal');

        if (lastFocused) lastFocused.focus();
    }

    function updateFooterNote() {
        const total = lostItems.length;
        const count = claimed.size;
        if (count === 0) {
            footerNote.textContent = 'No items claimed yet today.';
        } else if (count < total) {
            footerNote.textContent = count + ' of ' + total + ' items inspected.';
        } else {
            footerNote.textContent = 'All items claimed. Safe travels, Zander.';
        }
    }

    function bindPhotoAlbums() {
        const albumsView = modalContent.querySelector('.photo-albums-view');
        if (!albumsView) return;

        const albumCards = modalContent.querySelectorAll('.photo-album-card');
        const albumPanels = modalContent.querySelectorAll('.photo-album-detail');
        const vlogSection = modalContent.querySelector('.photo-vlog-section');

        function showAlbumShelf() {
            albumsView.hidden = false;
            if (vlogSection) vlogSection.hidden = false;
            albumPanels.forEach(function (panel) {
                panel.hidden = true;
            });
        }

        function showAlbum(albumId) {
            const panel = modalContent.querySelector('#photo-album-' + albumId);
            if (!panel) return;

            albumsView.hidden = true;
            if (vlogSection) vlogSection.hidden = true;
            albumPanels.forEach(function (p) {
                p.hidden = true;
            });
            panel.hidden = false;

            panel.querySelectorAll('.photo-cell').forEach(function (cell, i) {
                cell.classList.add('motion-reveal');
                cell.style.setProperty('--motion-delay', (i * 0.08) + 's');
            });
        }

        albumCards.forEach(function (card) {
            card.addEventListener('click', function () {
                showAlbum(card.dataset.photoAlbum);
            });
        });

        modalContent.querySelectorAll('.photo-album-back').forEach(function (btn) {
            btn.addEventListener('click', showAlbumShelf);
        });

        showAlbumShelf();
    }

    function bindContactCopy() {
        modalContent.querySelectorAll('.contact-item[data-copy]').forEach(function (item) {
            item.addEventListener('click', function () {
                const text = item.dataset.copy;
                navigator.clipboard.writeText(text).then(function () {
                    const span = item.querySelector('span:not(.copy-hint)');
                    if (!span) return;
                    const original = span.textContent;
                    span.textContent = 'Copied!';
                    span.style.color = '#7cb87c';
                    setTimeout(function () {
                        span.textContent = original;
                        span.style.color = '';
                    }, 1800);
                });
            });
        });
    }

    function handleItemActivate(item) {
        if (!item.classList.contains('visible')) return;
        openModal(item.dataset.modal, item);
    }

    if (deskSurface) {
        deskSurface.addEventListener('click', function (e) {
            if (e.target.closest('[data-journal-link]')) {
                return;
            }
            const item = e.target.closest('.lost-item');
            if (!item || !deskSurface.contains(item)) return;
            handleItemActivate(item);
        });
    }

    lostItems.forEach(function (item) {
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemActivate(item);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });

    lostItems.forEach(function (item, i) {
        setTimeout(function () {
            item.classList.add('visible');
        }, 100 + i * 80);
    });

    const params = new URLSearchParams(window.location.search);
    const deepModal = params.get('modal') || window.location.hash.replace('#', '');
    if (deepModal) {
        const trigger = document.querySelector('.lost-item[data-modal="' + deepModal + '"]');
        openModal(deepModal, trigger || null);
        history.replaceState(null, '', window.location.pathname);
    }
});

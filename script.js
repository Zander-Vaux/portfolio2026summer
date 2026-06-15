document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalTagId = document.getElementById('modal-tag-id');
    const footerNote = document.querySelector('.footer-note');
    const lostItems = document.querySelectorAll('.lost-item');
    const panels = document.querySelectorAll('#modal-panels > div');

    const claimed = new Set();
    let lastFocused = null;

    function openModal(panelId, triggerEl) {
        const panel = document.getElementById('panel-' + panelId);
        if (!panel) return;

        lastFocused = triggerEl || document.activeElement;

        modalContent.innerHTML = panel.innerHTML;
        modalTagId.textContent = panel.dataset.tag || '---';

        if (panelId === 'engineering') {
            modalContent.classList.add('blueprint-modal');
        } else {
            modalContent.classList.remove('blueprint-modal');
        }

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (triggerEl) {
            claimed.add(panelId);
            triggerEl.classList.add('claimed');
            updateFooterNote();
        }

        bindContactCopy();
        modalClose.focus();
    }

    function closeModal() {
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

    lostItems.forEach(function (item) {
        item.addEventListener('click', function () {
            openModal(item.dataset.modal, item);
        });
    });

    modalClose.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
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

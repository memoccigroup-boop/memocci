// Preserve the original Skymundo site JavaScript exactly, then add the Salalah Tours card.
document.write('<script src="/script-core.js"></script>');

document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('#tours .tours-grid');
    if (!grid || grid.querySelector('[data-tour="salalah"]')) return;

    const card = document.createElement('div');
    card.className = 'tour-card';
    card.setAttribute('data-tour', 'salalah');
    card.innerHTML = `
        <a href="/Tours/salalah" class="tour-image" aria-label="Salalah" style="display:block;text-decoration:none;color:inherit">
            <img src="/Tours/salalah/assets/hero-september/01-1920.webp" alt="Salalah" loading="lazy">
        </a>
        <div class="tour-content">
            <h3><a href="/Tours/salalah" style="color:inherit;text-decoration:none">Salalah</a></h3>
        </div>`;
    grid.append(card);
});

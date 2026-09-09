// Preserve the original Skymundo site JavaScript exactly, then add the Salalah Tours card.
document.write('<script src="/script-core.js"><\\/script>');

document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('#tours .tours-grid');
    if (!grid || grid.querySelector('[data-tour="salalah"]')) return;

    const card = document.createElement('div');
    card.className = 'tour-card';
    card.setAttribute('data-tour', 'salalah');
    card.innerHTML = `
        <a href="/Tours/salalah" class="tour-image" aria-label="Explore Salalah tour package" style="display:block;text-decoration:none;color:inherit">
            <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Wadi%20Darbat%20salalah.jpg?width=900" alt="Salalah Oman during Khareef season" loading="lazy">
            <div class="tour-badge">Featured</div>
        </a>
        <div class="tour-content">
            <h3><a href="/Tours/salalah" style="color:inherit;text-decoration:none">Salalah</a></h3>
            <p>Discover Salalah's green Khareef landscapes, waterfalls, beaches and guided sightseeing with Skymundo.</p>
            <a href="/Tours/salalah" class="btn btn-primary"><i class="fas fa-map-marked-alt"></i> Explore Salalah</a>
        </div>`;
    grid.prepend(card);
});

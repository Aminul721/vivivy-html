// dom loaded complete function js
function onAllNetworkRequestsCompleted() {
    // Your code to run after all network requests are completed
    // document.querySelectorAll('img[data-src]').forEach(img => {
    //   img.src = img.dataset.src;
    //   img.removeAttribute('data-src');
    // });

    const images = document.querySelectorAll('img[data-src]');
    const options = {
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                });
            }
        });
    }, options);

    images.forEach(img => {
        observer.observe(img);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === 'complete') {
    onAllNetworkRequestsCompleted();
    }else {
    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'complete') {
        onAllNetworkRequestsCompleted();
        }
    });
    }
});
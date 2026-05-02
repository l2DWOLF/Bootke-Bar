
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.block');
    const blockReverse = document.querySelectorAll('.block-reverse');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('frozen');
                observer.unobserve(entry.target);
            };
        });
    });
    blocks.forEach(block => observer.observe(block));
    blockReverse.forEach(block => observer.observe(block));

    function handleScroll() {
        const scrollButton = document.querySelector('.btn-up');
        if (!scrollButton) return;
        scrollButton.classList.toggle('show-btn', window.scrollY >= 200);
    };
    document.addEventListener('scroll', handleScroll, { passive: true });
});

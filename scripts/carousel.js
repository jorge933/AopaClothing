export function next($button) {
    showSlide($button.dataset.page)
    
    const $allItems = document.querySelectorAll('main .carousel .item');
    
    $button.dataset.page < $allItems.length ? $button.dataset.page++ : $button.dataset.page = 1;
    
    $button.previousElementSibling.dataset.page--

    if (Number($button.previousElementSibling.dataset.page) === 0) $button.previousElementSibling.dataset.page = $allItems.length;
}

export function prev($button) {
    showSlide($button.dataset.page)

    const $allItems = document.querySelectorAll('main .carousel .item');
    
    $button.dataset.page--

    if (Number($button.dataset.page) === 0) $button.dataset.page = $allItems.length;

    $button.nextElementSibling.dataset.page < $allItems.length ? $button.nextElementSibling.dataset.page++ : $button.nextElementSibling.dataset.page = 1;
}

function showSlide(page) {
    document.querySelector(`main .carousel .item.active`).classList.remove('active');
    document.querySelector(`main .carousel .dots div.active`).classList.remove('active');
    document.querySelector(`main .carousel .item[data-page="${page}"]`).classList.add('active');
    document.querySelector(`main .carousel .dots div[data-page="${page}"]`).classList.add('active');
}

export function dots($dots) {
    $dots.forEach($dot => {
        $dot.addEventListener('click', () => {
            if (!$dot.classList.value.includes('active')) showSlide($dot.dataset.page);
        })
    });
}
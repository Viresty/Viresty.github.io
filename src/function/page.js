import { addAnimationInView } from './animation';

export const hidePopup = (entry) => {
    if (!entry.parentNode.classList.contains('hidden')) {
        entry.parentNode.classList.add('hidden');
    }
}

export const addEventListenerClass = (qS, F) => {
    let entries = document.querySelectorAll(qS);

    entries.forEach(entry => {
        entry.addEventListener("click", () => {F(entry)});
    })
}

export const reloadPage = () => {
    window.scrollTo(0, 0);
    addAnimationInView('.fade-in', 'FadeInAnimation');
    addAnimationInView('.open-img', 'openImgAnimation');

    let items = document.querySelectorAll('.closed');

    items.forEach(item => {
        item.classList.add('hidden');
    })
}

export const scrollTowhenInterect = (qS) => {
    const observer = new IntersectionObserver(entries => {
        // Loop over the entries
        entries.forEach(entry => {
          // If the element is visible
          if (entry.isIntersecting) {
            // Add the animation class
            window.scroll(0, findPosition(entry.target));
          }
        });
    });

    function findPosition(obj) {
        var currenttop = 0;
        if (obj.offsetParent) {
            do {
                currenttop += obj.offsetTop;
            } while ((obj = obj.offsetParent));
            return [currenttop];
        }
    }

    let contents = document.querySelectorAll(qS);

    contents.forEach(content => {
        observer.observe(content);
    })
}

export const LoadMoreInView = (qS, data) => {
    const observer = new IntersectionObserver(entries => {
        // Loop over the entries
        entries.forEach(entry => {
          // If the element is visible
          if (entry.isIntersecting) {

          }
        });
    });

    let contents = document.querySelectorAll(qS);

    contents.forEach(content => {
        observer.observe(content);
    })
}
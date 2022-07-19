export const addAnimationInView = (qS, A) => {
    const observer = new IntersectionObserver(entries => {
        // Loop over the entries
        entries.forEach(entry => {
          // If the element is visible
          if (entry.isIntersecting) {
            // Add the animation class
            entry.target.classList.add(A);
          }
        });
    });

    let contents = document.querySelectorAll(qS);

    contents.forEach(content => {
        observer.observe(content);
    })
}

export const addAnimation = (qS, A) => {
  let contents = document.querySelectorAll(qS);

  contents.forEach(content => {
    content.classList.add(A);
  })
}
document.addEventListener("DOMContentLoaded", function () {
    const userCardTemplate = document.querySelector("[data-user-template]");
    const userCardContainer = document.querySelector("[data-user-cards-container]");
    let users = [];

    // Fetch announcements data
    fetch("/testimonials.json") // Corrected file name here
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data); // Check the fetched data
            users = data.map(user => {
                const card = userCardTemplate.content.cloneNode(true).children[0];
                const name = card.querySelector("[data-name]");
                const text = card.querySelector("[data-text]");
                const image = card.querySelector("[data-image]");

                name.textContent = user.name;
                text.textContent = user.text;
                image.src = user.image;

                userCardContainer.append(card);

                return { name: user.name, image: user.image, text: user.text, element: card };
            });
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
});

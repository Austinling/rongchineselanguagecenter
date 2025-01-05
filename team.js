document.addEventListener("DOMContentLoaded", async () => {
    const filterButtons = document.getElementById("filterButtons");
    const teamCards = document.getElementById("teamCards");
    const classList = ["left","right","top","bottom"];
    const randomAnimation = () => classList[Math.floor(Math.random() * classList.length)];

    // Load team data from JSON
    const response = await fetch("team.json");
    const teamData = await response.json();

    // Generate unique categories
    const categories = [...new Set(teamData.map(member => member.category))];
    categories.forEach(category => {
        const button = document.createElement("button");
        button.classList.add("filter-btn");
        button.setAttribute("data-category", category);
        button.innerText = category;
        filterButtons.appendChild(button);
    });

    // Render team cards
    const renderCards = (category) => {
        teamCards.innerHTML = "";
        teamData
            .filter(member => category === "all" || member.category === category)
            .forEach(member => {
                const card = document.createElement("div");
                card.classList.add("team-card", randomAnimation());
                card.setAttribute("data-category", member.category);
                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                `;
                teamCards.appendChild(card);
            });
    };

    // Initial render
    renderCards("all");

    // Add click event listeners to filter buttons
    filterButtons.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-btn")) {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");
            const category = event.target.getAttribute("data-category");
            renderCards(category);
        }
    });
});

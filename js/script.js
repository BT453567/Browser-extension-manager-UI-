let extensionGrid = document.getElementById("grid");
let allButton = document.getElementById("allButton");
let activeButton = document.getElementById("activeButton");
let inactiveButton = document.getElementById("inactiveButton");
let themeButton = document.getElementById("themeButton");

let extensionData = [];

function fetchMenuData() {
    // Fetch the data from the JSON file
    fetch('./data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            extensionData = data;
            // Once the data is fetched, populate the grid
            generateGridItems();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function generateGridItems(filter = "all") {

    const filteredData = extensionData.filter((x) => {
        if (filter === "active") return x.isActive;
        if (filter === "inactive") return !x.isActive;
        return true; // Show all items if 'all' is selected
    });

    extensionGrid.innerHTML = filteredData
        .map((x) => {
            let { logo, name, description, isActive } = x;
            return `
                <div class="extensions__grid-item flex column space-between">
                    <div class="grid-item__top-container flex row">
                        <img class="grid-item__icon" src="${logo}" alt="">
                        <div class="grid-item__text-container flex column">
                            <h2 class="grid-item__header">${name}</h2>
                            <p class="grid-item__p">${description}</p>
                        </div>
                    </div>
                    <div class="grid-item__bottom-container flex space-between align-items-center">
                        <button class="button--grid">Remove</button>
                        <label class="switch">
                            <input type="checkbox" ${isActive ? "checked" : ""}>
                            <span class="slider"></span>
                        </label>          
                    </div>
                </div>
                `;
        }).join("");
}

function updateActiveButton(clickedButton) {
    // Remove "active" class from all buttons
    [allButton, activeButton, inactiveButton].forEach((btn) => btn.classList.remove("active"));

    // Add "active" class to the clicked button
    clickedButton.classList.add("active");
}

allButton.addEventListener("click", () => {
    generateGridItems("all");
    updateActiveButton(allButton);
});

activeButton.addEventListener("click", () => {
    generateGridItems("active");
    updateActiveButton(activeButton);
});

inactiveButton.addEventListener("click", () => {
    generateGridItems("inactive");
    updateActiveButton(inactiveButton);
});

themeButton.addEventListener("click", () => {

    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
});

document.addEventListener('DOMContentLoaded', fetchMenuData);

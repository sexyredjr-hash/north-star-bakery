// North Star Bakery - Favorites Feature

const bakeryProducts = [
    "Breads",
    "Pastries",
    "Cakes",
    "Signature Loaf"
];

let favoriteProducts =
    JSON.parse(localStorage.getItem("northStarFavorites")) || [];

function saveFavorites() {
    localStorage.setItem(
        "northStarFavorites",
        JSON.stringify(favoriteProducts)
    );
}

function renderFavorites() {
    const favoritesList = document.getElementById("favorites-list");
    const favoritesMessage = document.getElementById("favorites-message");

    if (!favoritesList || !favoritesMessage) {
        return;
    }

    favoritesList.innerHTML = "";

    if (favoriteProducts.length === 0) {
        favoritesMessage.textContent = "You have no favorites yet.";
        return;
    }

    favoritesMessage.textContent = "Your favorite bakery items:";

    favoriteProducts.forEach(function(product) {
        const listItem = document.createElement("li");
        listItem.textContent = product;
        favoritesList.appendChild(listItem);
    });
}

function updateFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(function(button) {
        const product = button.dataset.product;

        if (favoriteProducts.includes(product)) {
            button.textContent = "♥ Remove from Favorites";
        } else {
            button.textContent = "♡ Add to Favorites";
        }
    });
}

function toggleFavorite(product) {
    if (favoriteProducts.includes(product)) {
        favoriteProducts = favoriteProducts.filter(function(item) {
            return item !== product;
        });
    } else {
        favoriteProducts.push(product);
    }

    saveFavorites();
    renderFavorites();
    updateFavoriteButtons();
}

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            toggleFavorite(button.dataset.product);
        });
    });

    renderFavorites();
    updateFavoriteButtons();
});
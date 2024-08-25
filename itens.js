document.addEventListener("DOMContentLoaded", function() {
    const sanduicheBtn = document.getElementById("sanduiche-btn");
    const bebidasBtn = document.getElementById("bebidas-btn");
    const menuContainer = document.getElementById("menu-container");

    if (sanduicheBtn && bebidasBtn && menuContainer) {
        sanduicheBtn.addEventListener("click", function() {
            displayMenuItems('Sanduíche');
        });

        bebidasBtn.addEventListener("click", function() {
            displayMenuItems('Bebidas');
        });

        function displayMenuItems(category) {
            const filteredItems = menuItems.filter(item => item.category === category);
            let menuHtml = '<div class="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16">';
            filteredItems.forEach(item => {
                menuHtml += `
                    <div class="flex gap-2">
                        <img src="${item.image}" alt="${item.name}" class="w-28 h-28 rounded-md hover:marker:scale-110 hover:rotate-2 duration-200" />
                        <div>
                            <p class="font-bold">${item.name}</p>
                            <p class="text-sm">${item.description}</p>
                            <div class="flex items-center gap-2 justify-between mt-3">
                                <p class="font-bold text-lg">R$ ${item.price.toFixed(2)}</p>
                                <button class="bg-gray-900 px-5 rounded add-to-cart-btn mb-4" data-name="${item.name}" data-price="${item.price}">
                                    <i class="fa fa-cart-plus text-lg text-white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            menuHtml += '</div>';
            menuContainer.innerHTML = menuHtml;
        }
    } else {
        console.error("Elementos não encontrados no DOM.");
    }
});


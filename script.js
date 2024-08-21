const menu               = document.getElementById("menu")
const cartBtn            = document.getElementById("cart-btn")
const cartModal          = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal          = document.getElementById("cart-total")
const checkOutBtn        = document.getElementById("checkout-btn")
const closeModalBtn      = document.getElementById("close-modal-btn")
const cartCounter        = document.getElementById("cart-count")
const addressInput       = document.getElementById("address")
const addressWarn        = document.getElementById("address-warn")

// Inicialize arry cart
let cart = [];

// Abrir o modal do carrinho 
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
    
})

// Fechar  o modal quando clicar fora 
cartModal.addEventListener("click", function(event) {
    //console.log(event)
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
} )

// Fechar O modal quando clicar em fechar
closeModalBtn.addEventListener("click", function(){
    ///alert("CLICOUUUUUU")
    cartModal.style.display = "none"
})


menu.addEventListener("click", function(event) {
    //console.log(event.target)
    let parentButton = event.target.closest(".add-to-cart-btn");
    //console.log(parentButton);
    
    // Se você clicou no adicionar carrinho
    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        // Adicionar no carrinho
        addToCart(name, price);
    }

})

// Função para adicionar no carrinho
function addToCart(name, price){
   // alert("O item é " + name)
   const existingItem = cart.find(item  => item.name ==name)

   if(existingItem){
    // Se o item já existe, aumenta apenas a quantidade
    existingItem.quantity += 1;
   
   }else{

    cart.push({
        name: name,
        price: price,
        quantity: 1
       });
   }

   updateCartModal()

}


// Atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {  // percorre a lista do carrinho
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-betwen", "mb-4", "flex-col" )

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p> QTD: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
            
        </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });
    // Coloca a quantidade de item no carrinho
    cartCounter.innerHTML = cart.length;

}

// Função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}


// pegar endereço
addressInput.addEventListener("input", function(event){
    let inputValeu = event.target.value;

    if(inputValeu !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

// Finalizar pedido
checkOutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
            
          }).showToast();

        return;
    }

    // se o endereço for igual a zero
    if(cart.length === 0) return;
    // se o endereço for vazio
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    // Enviar o pedido para API WhatsApp
    const cartItens = cart.map((item) => {
        const itemTotal = item.price * item.quantity;
        return(
            `${item.name}\n Quantidade: (${item.quantity})\n Preço: R$ ${item.price.toFixed(2)}\n `
        )
    }).join("\n");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalFormatted = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const message = encodeURIComponent(`Pedido:\n${cartItens}\nValor total do pedido: ${totalFormatted}\n`);
    const phone = "64992642357";

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();

})

// Validar se o restaurante está aberto

function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
}else {
    spanItem.classList.remove("bg-green-500");
    spanItem.classList.add("bg-red-600");
}
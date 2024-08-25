const menu               = document.getElementById("menu")
const cartBtn            = document.getElementById("cart-btn")
const cartModal          = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal          = document.getElementById("cart-total")
const checkOutBtn        = document.getElementById("checkout-btn")
const closeModalBtn      = document.getElementById("close-modal-btn")
const cartCounter        = document.getElementById("cart-count")
const userInput          = document.getElementById("customerName")
const customerFullUser   = document.getElementById("customer-full-name")
const phoneUserInput     = document.getElementById("phoneUser")
const numberPhoneUser    = document.getElementById("number-user-phone")
const addressInput       = document.getElementById("address")
const addressWarn        = document.getElementById("address-warn")
const paymentInput       = document.getElementById("payment")
const paymentMethod      = document.getElementById("payment-method")

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

// pegar nome do usuário
userInput.addEventListener("input", function(event){
    let inputValeu = event.currentTarget.value;

    if (inputValeu !==""){
        userInput.classList.remove("border-red-500")
        customerFullUser.classList.add("hidden")
    }
})

// pegar telefone do usuário
phoneUserInput.addEventListener("input", function(event){
    let inputValeu  = event.target.value;

    if(inputValeu !== ""){
        phoneUserInput.classList.remove("border-red-500")
        numberPhoneUser.classList.add("hidden")
    }
})

// pegar endereço
addressInput.addEventListener("input", function(event){
    let inputValeu = event.target.value;

    if(inputValeu !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

// pegar a forma de pagamento
paymentInput.addEventListener("input", function(event){
    let inputValeu = event.target.value;
    if(inputValeu !== ""){
        paymentInput.classList.remove("border=red-500")
        paymentMethod.classList.add("hidden")
    }
})

document.addEventListener("DOMContentLoaded", function() {
    const data = new Date();
    const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sábado"];
    const diaSemana = diasSemana[data.getDay()];

    let horario = ""; // Sem horário padrão
    let isOpen = false;

    // Definindo os horários de abertura e fechamento
    const openingHours = {
        "domingo": { open: null, close: null },
        "segunda": { open: null, close: null },
        "terca": { open: "18:00", close: "22:00" },
        "quarta": { open: "18:00", close: "22:00" },
        "quinta": { open: "18:00", close: "22:00" },
        "sexta": { open: "18:00", close: "22:00" },
        "sábado": { open: "18:00", close: "24:00" }
    };

    if (openingHours[diaSemana]) {
        const { open, close } = openingHours[diaSemana];
        if (open && close) {
            horario = `${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)} - ${open} às ${close}`;
            
            // Convertendo horários para minutos desde a meia-noite para comparação
            const [openHour, openMinute] = open.split(':').map(Number);
            const [closeHour, closeMinute] = close.split(':').map(Number);
            const [currentHour, currentMinute] = [data.getHours(), data.getMinutes()];

            const openTime = openHour * 60 + openMinute;
            const closeTime = closeHour * 60 + closeMinute;
            const currentTime = currentHour * 60 + currentMinute;

            console.log(`Horário de abertura: ${openTime} minutos`);
            console.log(`Horário de fechamento: ${closeTime} minutos`);
            console.log(`Horário atual: ${currentTime} minutos`);

            isOpen = currentTime >= openTime && currentTime < closeTime;
        } else {
            horario = "Estamos fechados";
        }
    } else {
        horario = "Estamos fechados";
    }

    const openingHoursElement = document.getElementById("opening-hours");
    openingHoursElement.textContent = horario;
    openingHoursElement.style.backgroundColor = isOpen ? "green" : "red";
    openingHoursElement.style.color = "white";

    const dateSpanElement = document.getElementById("date-span");
    dateSpanElement.style.color = isOpen ? "green" : "red"; // Altere a cor conforme o estado de abertura
});

// Validar se o restaurante está aberto
function checkRestaurantOpen() {
    const data = new Date();
    const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sábado"];
    const diaSemana = diasSemana[data.getDay()];

    const openingHours = {
        "domingo": { open: null, close: null },
        "segunda": { open: null, close: null },
        "terca": { open: "18:00", close: "22:00" },
        "quarta": { open: "18:00", close: "22:00" },
        "quinta": { open: "18:00", close: "22:00" },
        "sexta": { open: "18:00", close: "22:00" },
        "sábado": { open: "18:00", close: "24:00" }
    };

    const horario = openingHours[diaSemana];
    if (!horario || !horario.open || !horario.close) {
        return false; // Fechado
    }

    // Convertendo horários para minutos desde a meia-noite para comparação
    const [openHour, openMinute] = horario.open.split(':').map(Number);
    const [closeHour, closeMinute] = horario.close.split(':').map(Number);
    const [currentHour, currentMinute] = [data.getHours(), data.getMinutes()];

    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;
    const currentTime = currentHour * 60 + currentMinute;

    return currentTime >= openTime && currentTime < closeTime;
}

// Finalizar pedido
checkOutBtn.addEventListener("click", function() {
    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
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
    if (cart.length === 0) return;

    // se o nome do usuário for vazio
    if (userInput.value === "") {
        customerFullUser.classList.remove("hidden");
        userInput.classList.add("border-red-500");
        return;
    }

    // se o endereço for vazio
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    // se o telefone do usuário for vazio
    if (phoneUserInput.value === "") {
        numberPhoneUser.classList.remove("hidden");
        phoneUserInput.classList.add("border-red-500");
        return;
    }

    // se a forma de pagamento for vazia
    if (paymentInput.value === "") {
        paymentMethod.classList.remove("hidden");
        paymentInput.classList.add("border-red-500");
        return;
    }

    // Enviar o pedido para API WhatsApp
    const cartItens = cart.map((item) => {
        const itemTotal = item.price * item.quantity;
        return (
            `${item.name}\n Quantidade: (${item.quantity})\n Preço: R$ ${item.price.toFixed(2)}\n `
        );
    }).join("\n");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalFormatted = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const message = encodeURIComponent(
        `Pedido:\n${cartItens}\n\n` +
        `Valor total do pedido: ${totalFormatted}\n\n` +
        `Nome: ${userInput.value}\n` +
        `Endereço: ${addressInput.value}\n` +
        `Telefone: ${phoneUserInput.value}\n` +
        `Forma de pagamento: ${paymentInput.value}\n`
    );
    const phone = "64992642357";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // Redirecionar para a página de agradecimento com o nome do cliente e o tempo de preparo
    const preparationTime = 30; // Defina o tempo de preparo em minutos
    window.location.href = `thankyou.html?name=${encodeURIComponent(userInput.value)}&time=${preparationTime}`;

    userInput.value = "";
    addressInput.value = "";
    phoneUserInput.value = "";
    paymentInput.value = "";

    cart = [];
    updateCartModal();
});
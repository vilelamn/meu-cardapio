// Obter o nome do cliente e o tempo de preparo da URL
const urlParams = new URLSearchParams(window.location.search);
const customerName = urlParams.get('name');
const preparationTime = urlParams.get('time');

// Atualizar o conteudo da página com o nome do cliente e o tempo de preparo
document.getElementById('customerName').textContent = customerName;
document.getElementById('preparationTime').textContent = preparationTime;
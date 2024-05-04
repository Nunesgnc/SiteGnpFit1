const tableBody = document.querySelector('tbody');
const addButton = document.querySelector('button');

function addNovaLinha() {

  event.preventDefault();

  const name = document.getElementById('nome_input').value.trim(); // Remova espaços em branco
  const product = document.getElementById('produto_select').value;
  const quantity = document.getElementById('qtde_input').value.trim(); // Remova espaços em branco
  const unitPrice = document.getElementById('valorUnitario_input').value.trim(); // Remova espaços em branco

  // Verifique se algum campo está vazio
  if (!name || !product || !quantity || !unitPrice) {
    alert("Por favor, preencha todos os campos!");
    return; // Impede que a função continue se houver um campo vazio
  }

  const novaLinha = document.createElement('tr');
  novaLinha.classList.add('cliente');

  const nome = document.createElement('td');
  nome.textContent = name;
  novaLinha.appendChild(nome);

  const produto = document.createElement('td');
  produto.textContent = product;
  novaLinha.appendChild(produto);

  const qtde = document.createElement('td');
  qtde.textContent = quantity;
  novaLinha.appendChild(qtde);

  const valorUni = document.createElement('td');
  valorUni.textContent = parseFloat(unitPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  novaLinha.appendChild(valorUni);

  const totalPrice = quantity * parseFloat(unitPrice);
  const totalPriceCell = document.createElement('td');
  totalPriceCell.textContent = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  novaLinha.appendChild(totalPriceCell);

  tableBody.appendChild(novaLinha);

  document.getElementById('nome_input').value = '';
  document.getElementById('qtde_input').value = '';
  document.getElementById('valorUnitario_input').value = '';
  document.getElementById('produto_select').value = '';
}

addButton.addEventListener('click', addNovaLinha);

// Variável para controlar cliques
let clicksCount = 0;
let linhaAnteriorClicada = null; // Armazena a linha clicada anteriormente

// EventListener para click em linhas
tableBody.addEventListener('click', function (event) {
  const linhaClicada = event.target.closest('tr'); // Linha clicada atualmente

  function excluirLinha(linha) {
    tableBody.removeChild(linha);
  }

  if (linhaClicada && linhaClicada.classList.contains('cliente')) {
    if (linhaClicada === linhaAnteriorClicada) { // Se clicou na mesma linha
      clicksCount++; // Incrementa o contador
    } else {
      clicksCount = 1; // Reinicia o contador se clicou em outra linha
    }

    linhaAnteriorClicada = linhaClicada; // Atualiza a linha clicada anteriormente

    if (clicksCount === 2) {
      excluirLinha(linhaClicada);
      clicksCount = 0;
      linhaAnteriorClicada = null;
    } else {
      // Exibe mensagem de aviso (opcional)
      console.log("Clique novamente para excluir a linha.");
    }
  }
});

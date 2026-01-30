const form = document.getElementById('pedidoForm');
const lista = document.getElementById('listaPedidos');
const msg = document.getElementById('msg');

// Função para atualizar a lista da tela
function atualizarLista() {
  lista.innerHTML = ''; // limpa a lista atual
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.forEach(pedido => {
    const item = document.createElement('li');
    item.textContent = `${pedido.nome} - Rua: ${pedido.rua}, Quarto: ${pedido.quarto}, Hóspedes: ${pedido.qtd}, Horário: ${pedido.horario}`;
    lista.appendChild(item);
  });
}

// Evento do formulário
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nomeCliente').value;
  const rua = document.getElementById('ruaEntrega').value;
  const quarto = document.getElementById('quarto').value;
  const qtd = document.getElementById('qtdHospedes').value;
  const horario = document.getElementById('horario').value;

  // Cria objeto do pedido
  const pedido = { nome, rua, quarto, qtd, horario };

  // Salva no LocalStorage
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  // Atualiza lista e mensagem
  atualizarLista();
  msg.textContent = 'Pedido enviado com sucesso!';

  form.reset();
});

// Inicializa a lista ao carregar a página
atualizarLista();

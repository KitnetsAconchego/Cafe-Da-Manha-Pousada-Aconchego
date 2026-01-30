const listaCuba = document.getElementById('listaCuba');
const listaArgentina = document.getElementById('listaArgentina');

function atualizarLista(){
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

  listaCuba.innerHTML = '';
  listaArgentina.innerHTML = '';

  pedidos.forEach((pedido, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${pedido.nome}</strong> - Quarto: ${pedido.quarto} - Horário: ${pedido.horario} - Hóspedes: ${pedido.qtd} - Preferenciais: ${pedido.preferenciais.join(', ')}
      </div>
      <button onclick="excluirPedido(${index})">Excluir</button>
    `;

    if(pedido.rua === 'Cuba'){
      listaCuba.appendChild(li);
    } else if(pedido.rua === 'Argentina'){
      listaArgentina.appendChild(li);
    }
  });
}

function excluirPedido(index){
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.splice(index,1);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  atualizarLista();
}

// Inicializa lista
atualizarLista();

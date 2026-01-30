const form = document.getElementById('pedidoForm');
const acomodacao = document.getElementById('acomodacao');
const numeroQuarto = document.getElementById('numeroQuarto');
const horario = document.getElementById('horario');
const qtdHospedes = document.getElementById('qtdHospedes');
const preferenciaisContainer = document.getElementById('preferenciaisContainer');
const msg = document.getElementById('msg');

// Números por rua
const quartos = {
  Cuba: ['00','01','02','03','04','05','07'],
  Argentina: ['01','02','03','04','05','06','07','08','09','10','11','12']
};

// Preenche horários das 07:00 às 10:00 em intervalos de 10min
function preencherHorarios() {
  horario.innerHTML = '';
  for(let h=7; h<=10; h++){
    for(let m=0; m<60; m+=10){
      if(h===10 && m>0) break; // só até 10:00
      let horaStr = h.toString().padStart(2,'0');
      let minStr = m.toString().padStart(2,'0');
      let option = document.createElement('option');
      option.value = `${horaStr}:${minStr}`;
      option.textContent = `${horaStr}:${minStr}`;
      horario.appendChild(option);
    }
  }
}

// Atualiza números de quarto ao selecionar rua
acomodacao.addEventListener('change', function() {
  numeroQuarto.innerHTML = '<option value="">Escolha o número</option>';
  if(this.value && quartos[this.value]){
    quartos[this.value].forEach(num => {
      let option = document.createElement('option');
      option.value = num;
      option.textContent = num;
      numeroQuarto.appendChild(option);
    });
  }
});

// Atualiza preferenciais conforme quantidade de hóspedes
qtdHospedes.addEventListener('input', function() {
  const qtd = parseInt(this.value) || 0;
  preferenciaisContainer.innerHTML = '';
  const opcoes = ['Café','Iogurte','Suco de Uva','Suco de Laranja'];
  for(let i=0;i<qtd;i++){
    const select = document.createElement('select');
    select.required = true;
    opcoes.forEach(opt => {
      let option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    preferenciaisContainer.appendChild(select);
  }
});

// Salva pedido no LocalStorage
form.addEventListener('submit', function(e){
  e.preventDefault();

  const nome = document.getElementById('nomeCliente').value;
  const rua = acomodacao.value;
  const quarto = numeroQuarto.value;
  const horarioVal = horario.value;
  const qtd = qtdHospedes.value;
  const preferenciais = Array.from(preferenciaisContainer.querySelectorAll('select')).map(s => s.value);

  const pedido = {nome, rua, quarto, horario: horarioVal, qtd, preferenciais};

  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  msg.textContent = 'Pedido enviado com sucesso!';
  form.reset();
  preferenciaisContainer.innerHTML = '';
});

// Inicializações
preencherHorarios();

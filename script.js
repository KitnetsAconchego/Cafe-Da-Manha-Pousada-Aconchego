document.addEventListener('DOMContentLoaded', function() {

  const rua = document.getElementById("rua");
  const quarto = document.getElementById("quarto");
  const hospedes = document.getElementById("hospedes");
  const preferencias = document.getElementById("preferencias");
  const horario = document.getElementById("horario");
  const form = document.getElementById("pedidoForm");
  const mensagem = document.getElementById("mensagem");

  const quartosCuba = ["00","01","02","03","04","05","07"];
  const quartosArgentina = ["01","02","03","04","05","06","08","09","10","11","12"];

  rua.addEventListener("change", function() {
    quarto.innerHTML = '<option value="" disabled selected>Escolha o quarto</option>';
    let lista = this.value === "Cuba" ? quartosCuba : quartosArgentina;
    lista.forEach(q => {
      let opt = document.createElement("option");
      opt.value = q;
      opt.textContent = q;
      quarto.appendChild(opt);
    });
  });

  hospedes.addEventListener("change", function() {
    preferencias.innerHTML = "";
    for (let i = 1; i <= this.value; i++) {
      preferencias.innerHTML += `
        <label>Preferência Hóspede ${i}</label>
        <select required>
          <option value="" disabled selected>Escolha...</option>
          <option value="Café">Café</option>
          <option value="Suco Uva">Suco de Uva</option>
          <option value="Suco Laranja">Suco de Laranja</option>
        </select>`;
    }
  });

  // preencher horários
  for (let h = 7; h <= 10; h++) {
    for (let m = 0; m < 60; m += 10) {
      if (h === 10 && m > 0) continue;
      let value = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      let opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value;
      horario.appendChild(opt);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    mensagem.textContent = "Pedido enviado com sucesso!";
    form.reset();
    preferencias.innerHTML = "";
  });

});

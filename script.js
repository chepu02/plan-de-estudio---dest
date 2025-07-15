// Materias y correlativas
const materias = {
  "1° Año": [
    { nombre: "Metodología Proyectual", id: "4.8.076" },
    { nombre: "Historia del Arte y del Diseño", id: "2.2.171" },
    { nombre: "Introducción al Marketing", id: "1.2.003" },
    { nombre: "Fotografía Digital", id: "4.8.021" },
    { nombre: "Sociología de la Moda", id: "4.9.018" },
    { nombre: "Introducción a la Producción de Estéticas Para la Moda", id: "4.9.036" },
    { nombre: "Historia del Traje y de los Textiles I", id: "4.9.009" },
    { nombre: "Gestión y Organización de Eventos I", id: "2.6.052" },
    { nombre: "Comunicación y Semiótica", id: "4.3.001" },
    { nombre: "Introducción a las Tendencias Estéticas de Consumo", id: "4.9.029" },
  ],
  "2° Año": [
    { nombre: "Fotografía de Moda", id: "4.8.077", correlativas: ["4.8.021"] },
    { nombre: "Historia del Traje y de los Textiles II", id: "4.9.020", correlativas: ["2.2.171"] },
    { nombre: "Arte Contemporáneo, Estética y Lenguajes Combinados", id: "2.2.172", correlativas: ["2.2.171"] },
    { nombre: "Historia Económica Internacional", id: "2.1.136", correlativas: ["1.2.003"] },
    { nombre: "Diseño de Tendencias Estéticas de Consumo", id: "4.9.030", correlativas: ["4.9.018", "4.8.076"] },
  ],
  // Agregar más años si querés
};

// Guardar progreso localmente
let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function guardarEstado() {
  localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
}

function estaHabilitada(materia) {
  if (!materia.correlativas) return true;
  return materia.correlativas.every((cor) => estadoMaterias[cor] === true);
}

function crearMateria(materia) {
  const div = document.createElement("div");
  div.classList.add("materia");
  div.textContent = materia.nombre;

  if (estadoMaterias[materia.id]) {
    div.classList.add("aprobada");
  } else if (estaHabilitada(materia)) {
    div.classList.add("habilitada");
    div.addEventListener("click", () => {
      estadoMaterias[materia.id] = true;
      guardarEstado();
      renderMalla();
    });
  } else {
    div.classList.add("bloqueada");
  }

  return div;
}

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  Object.entries(materias).forEach(([anio, lista]) => {
    const bloque = document.createElement("div");
    bloque.classList.add("anio");

    const titulo = document.createElement("h2");
    titulo.textContent = anio;
    bloque.appendChild(titulo);

    lista.forEach((materia) => {
      const divMateria = crearMateria(materia);
      bloque.appendChild(divMateria);
    });

    container.appendChild(bloque);
  });
}

renderMalla();

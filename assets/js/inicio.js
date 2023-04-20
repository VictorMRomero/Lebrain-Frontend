const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');


let bienvenida = document.getElementById("bienvenida");
bienvenida.innerHTML = `<h1 class="fw-bold"> Bienvenido "${user.nombre}" vamos a aprender juntos</h1>`;
console.log(user.materias)

if(user.materias.length){
  console.log('entro')
  materias = user.materias;
  let nombreMateria = '';
  let linkMateria = '';
  //aqui debe de ir un for
  let uidMateria = user.materias[0].materia;
  console.log(uidMateria)
  
  fetch(`http://localhost:8080/api/materias/${uidMateria}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la respuesta de la petición GET');
      }
    })
    .then(data => {
          console.log(data)
          nombreMateria = data.nombre;
          linkMateria = data.link;
          descripcionMateria = data.descripcion;
          miFuncion(nombreMateria, linkMateria, descripcionMateria);
      })
    .catch(error => console.error(error));
  
  
    function miFuncion(nombreMateria, linkMateria, descripcionMateria) {
  
      let materia = document.getElementById("materia");
      materia.innerHTML = `
      <div class="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-school">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
      </svg></div>
      <div>
        <h4 class="fw-bold">${nombreMateria}</h4>
        <p class="text-muted">${descripcionMateria}</p>
        <a href="materia/NE1/${linkMateria}"><button class="btn btn-sm px-0" type="button" >Leer mas&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrow-right" >
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
            </svg></button></a>
      </div>
      `;
  
    } 

} else {
  let materia = document.getElementById("materia");
  materia.innerHTML = `
  <p>Al parecer no tienes ninguna materia, puedes elegir alguna en el apartado de materias.</p>
  `;
}





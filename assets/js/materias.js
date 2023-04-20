const user = JSON.parse(localStorage.getItem('user'));
let dataMaterias = '';


fetch('http://localhost:8080/api/materias')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error en la respuesta de la petición GET');
    }
  })
  .then(data => {
    dataMaterias = data;
    //console.log(data.total)
    //console.log(data.materias[0])
    // nombreMateria = data.materia.nombre;
    //linkMateria = data.link;
    mostrarMaterias(dataMaterias);

    })
  .catch(error => console.error(error));

function mostrarMaterias(dataMaterias){
  console.log(dataMaterias)
  
  let total = dataMaterias.total;
  let materiaData = dataMaterias.materias[0];
  
  
  for(let i = 0; i < total; i++){
    materiaData = dataMaterias.materias[i];
    console.log(materiaData._id)
    let materia = document.getElementById("materias");
    materia.innerHTML += `
      <div class="card-body">
      <div class="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-school">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
              <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
      </svg></div>
      <div>
      
      </div>
        <h4 class="fw-bold">${materiaData.nombre}</h4>
          <p class="text-muted">${materiaData.descripcion}</p>
          <a><button class="btn btn-sm px-0" id="${materiaData._id}" type="button" >Leer mas&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrow-right" >
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
          </svg></button></a>
      </div>
    `;

    
  }
  //aqui va un for
  let idMateria1 = dataMaterias.materias[0]._id;
  let botonMateria = document.getElementById(`${idMateria1}`);
  console.log(botonMateria)
  botonMateria.addEventListener('click', (e) => {
    e.preventDefault;

    let total = user.materias.length;
    console.log(total);
    if(total === 0){
      console.log('entro')

      const subtemas = [{subtema: "6439e59adbc902aaa03910f3", estado: true}];
      const materias = [{materia: idMateria1, subtemas: subtemas}];
      const usuario = {rol: "USER_ROLE", materias: materias};
      const usuarioJSON = JSON.stringify(usuario);
      
      


      fetch(`http://localhost:8080/api/usuarios/${user.uid}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: usuarioJSON
    })//fetch
    .then(x => actualizarUsuario())
    .catch(error => {
    console.error('Ya tiene la materia registrada:', error);
      // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
      
    })
    }
    else {
      console.log('si tiene');
      actualizarUsuario()
    }

    

    
    
    
  });
  
  const actualizarUsuario = () => {
    console.log(user.uid)
  fetch(`http://localhost:8080/api/usuarios/${user.uid}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error en la respuesta de la petición GET');
    }
    })
    .then(data => {
      
      localStorage.setItem('user', JSON.stringify(data));
      console.log('actualizado')
      window.location.replace("materia/NE1/negociosElectronicos1.html");
      
  
      })
    .catch(error => console.error(error));
}




}



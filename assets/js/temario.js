const user = JSON.parse(localStorage.getItem('user'));
const idMateria = localStorage.getItem('idMateria');
console.log(idMateria)
let dataMaterias = '';


// Se rellena con los subtemas guardados en la base de datos
fetch('http://localhost:8080/api/subtemas')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error en la respuesta de la petición GET');
    }
  })
  .then(data => {
    dataSubtemas = data;
    //console.log(data.total)
    //console.log(data.materias[0])
    // nombreMateria = data.materia.nombre;
    //linkMateria = data.link;
    mostrarSubtemas(dataSubtemas);

    })
  .catch(error => console.error(error));

function mostrarSubtemas(dataSubtemas){


  let total = dataSubtemas.total;


  
  for(let i = 0; i < total; i++){

    
  if(dataSubtemas.subtemas[i].materia._id === idMateria){

    let subtemaData = dataSubtemas.subtemas[i];


    if(subtemaData.nombre[0] === "1"){
        
    
        let ponerSubtema = document.getElementById("primerSubtema");
        
    
        ponerSubtema.innerHTML +=  `<p class="mb-3" id="${subtemaData._id}">${subtemaData.nombre}</p>`;

    } if(subtemaData.nombre[0] === "2"){
        let ponerSubtema = document.getElementById("segundoSubtema");
        
        ponerSubtema.innerHTML +=  `<p class="mb-3" id="${subtemaData._id}" >${subtemaData.nombre}</p>`;

    }


  }

    
  }


//Se ponen los que ya aprobo el estudiante

  let totalMateriasUsuario = user.materias.length;
  for(let i = 0; i < totalMateriasUsuario; i++){
    if(user.materias[i].materia === idMateria){

      let totalSubtemas = user.materias[i].subtemas.length;

      for(let j = 0; j < totalSubtemas; j++){
        let Subtema = user.materias[i].subtemas[j]
        let idSubtema = Subtema.subtema;
              
        
        let mostrar = document.getElementById(`${idSubtema}`);
        
        console.log(Subtema)

        // Se rellena con los subtemas guardados en la base de datos
        fetch(`http://localhost:8080/api/subtemas/${idSubtema}`)
        .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la petición GET');
        }
        })
        .then(data => {

        mostrarSubtemas(data);

        })
        .catch(error => console.error(error));

        const mostrarSubtemas = (data) => {

          mostrar.innerHTML =`<a><p class="mb-3">${data.nombre}</p></a>`;
          mostrar.addEventListener('click', (event) => {
            console.log(Subtema.estado)
            if(Subtema.estado === false){
              event.preventDefault();
              console.log('entro')
              mensaje = document.createElement('p');
              mensaje.textContent = 'Lo siento, pasa el tema anterior para desbloquear';
              mostrar.parentNode.replaceChild(mensaje, mostrar);
            } else {
              localStorage.setItem('idSubtema', idSubtema)
              localStorage.setItem('linkSubtema', data.link);
              window.location.href = `../../materia/NE1/${data.link}`
            }
            
          });
        }

      }


    }

  }
}
  






  
  
  


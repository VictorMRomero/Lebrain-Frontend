const user = JSON.parse(localStorage.getItem('user'));
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
    let subtemaData = dataSubtemas.subtemas[i];


    if(subtemaData.nombre[0] === "1"){
        
    
        let ponerSubtema = document.getElementById("primerSubtema");
        
    
        ponerSubtema.innerHTML +=  `<p class="mb-3" id="${subtemaData._id}">${subtemaData.nombre}</p>`;

    } if(subtemaData.nombre[0] === "2"){
        let ponerSubtema = document.getElementById("segundoSubtema");
        
        ponerSubtema.innerHTML +=  `<p class="mb-3" id="${subtemaData._id}" >${subtemaData.nombre}</p>`;

    }

    
  }





//Se ponen los que ya aprobo el estudiante
  let materias = user.materias;
  let totalSubtemas = materias[0].subtemas.length;
  let subtemas = materias[0].subtemas;
    for(let i = 0; i < totalSubtemas; i++){
  
      let idSubtema = subtemas[i].subtema;
      let estado = String(subtemas[i].estado);
  
      fetch(`http://localhost:8080/api/subtemas/${idSubtema}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la petición GET');
        }
      })
      .then(data => {
        let dataSubtema = data;
        //console.log(data.total)
        //console.log(data.materias[0])
        // nombreMateria = data.materia.nombre;
        //linkMateria = data.link;
        mostrarSubtema(dataSubtema);
  
      })
      .catch(error => console.error(error));
  
      function mostrarSubtema(dataSubtema){
        

        let mostrar = document.getElementById(`${idSubtema}`);
        
        console.log(dataSubtema.nombre)
        mostrar.innerHTML =`<a><p class="mb-3">${dataSubtema.nombre}</p></a>`;


        mostrar.addEventListener('click', (event) => {
          if(estado === "false"){
            event.preventDefault();
            const mensaje = document.createElement('p');
            mensaje.textContent = 'Lo siento, pasa el tema anterior para desbloquear';
            mostrar.parentNode.replaceChild(mensaje, mostrar);
          } else {
            localStorage.setItem('idSubtema', idSubtema)
            localStorage.setItem('linkSubtema', dataSubtema.link);
            window.location.href = `../../materia/NE1/${dataSubtema.link}`
          }

      
        });

      
  
      }

  
    }

    
    


  }
  






  
  
  


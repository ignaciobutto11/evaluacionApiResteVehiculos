function ObtenerVehiculo() {

    fetch("http://localhost:5293/api/Vehiculo")
        .then((respuesta) => respuesta.json())
        .then((data) => {

            console.log(data);

            mostrarVehiculo(data);

        })
        .catch((error) => {

            console.log(error);

        });
}


function mostrarVehiculo(data) {

    const tbody = document.getElementById("tablaVehiculo");

    tbody.innerHTML = "";

    data.forEach((element) => {

        let tr = tbody.insertRow();

        tr.insertCell(0).innerHTML = element.marca;
        tr.insertCell(1).innerHTML = element.modelo;
        tr.insertCell(2).innerHTML = element.año;
        tr.insertCell(3).innerHTML = element.patente;
        tr.insertCell(4).innerHTML = element.km;
        tr.insertCell(5).innerHTML = element.fechaDeIngreso;
        tr.insertCell(6).innerHTML = element.disponible ? "Sí" : "No";


        // BOTÓN EDITAR

        let editar = document.createElement("button");

        editar.textContent = "Editar";

        editar.classList.add(
            "btn",
            "btn-primary"
        );

        let tdEditar = tr.insertCell(7);

        tdEditar.appendChild(editar);

    });
}


function AgregarVehiculo() {

    let nuevoVehiculo = {

        Marca: document.getElementById("marca").value.trim(),

        Modelo: document.getElementById("modelo").value.trim(),

        Año: parseInt(
            document.getElementById("año").value
        ),

        Patente: document
            .getElementById("patente")
            .value
            .trim()
            .toUpperCase(),

        Km: parseInt(
            document.getElementById("km").value
        ),

        FechaDeIngreso: document
            .getElementById("fechaDeIngreso")
            .value,

        Disponible: document
            .getElementById("disponible")
            .checked
    };


    console.log("Vehículo que voy a enviar:");
    console.log(nuevoVehiculo);


    fetch("http://localhost:5293/api/Vehiculo", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoVehiculo)

    })

    .then((respuesta) => {

        if (!respuesta.ok) {

            throw new Error(
                "Error al agregar vehículo"
            );

        }

        return respuesta.json();

    })

    .then((data) => {

        console.log(
            "Vehículo agregado:",
            data
        );


        // ACTUALIZAR TABLA

        ObtenerVehiculo();


        // CERRAR MODAL

        const modal = bootstrap.Modal.getInstance(
            document.getElementById("exampleModal")
        );

        modal.hide();


        // LIMPIAR FORMULARIO

        document.getElementById("marca").value = "";

        document.getElementById("modelo").value = "";

        document.getElementById("año").value = "";

        document.getElementById("patente").value = "";

        document.getElementById("km").value = "";

        document.getElementById("fechaDeIngreso").value = "";

        document.getElementById("disponible").checked = false;

    })

    .catch((error) => {

        console.error(
            "Error:",
            error
        );

        alert(
            "No se pudo agregar el vehículo"
        );

    });
}
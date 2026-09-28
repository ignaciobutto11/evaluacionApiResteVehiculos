function ObtenerVehiculos() {

    fetch("http://localhost:5220/api/Vehiculo")
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

        tr.insertCell(0).innerHTML = element.vehiculosId;
        tr.insertCell(1).innerHTML = element.marca;
        tr.insertCell(2).innerHTML = element.modelo;
        tr.insertCell(3).innerHTML = element.año;
        tr.insertCell(4).innerHTML = element.patente;
        tr.insertCell(5).innerHTML = element.km;
        tr.insertCell(6).innerHTML = element.fechaDeIngreso;
        tr.insertCell(7).innerHTML = element.disponible;

        let editar = document.createElement("button");

        editar.textContent = "Editar";
        editar.classList.add("btn", "btn-primary");

        editar.setAttribute(
            "onclick",
            `BuscarValoreVehiculos(${element.vehiculosId})`
        );
        // BOTÓN ELIMINAR
        let eliminar = document.createElement("button");

        eliminar.textContent = "Eliminar";
        eliminar.classList.add("btn", "btn-danger");

        eliminar.addEventListener("click", function () {
            EliminarVehiculo(
                element.vehiculosId,
                element.disponible
            );
        });

        let tdEditar = tr.insertCell(8);
        let tdAcciones = tr.insertCell(9);

        tdEditar.appendChild(editar);
        tdAcciones.appendChild(eliminar);


    });



}


function AgregarVehiculo() {

    let vehiculo = {

        Marca: document.getElementById("MarcaNuevo").value.trim().toUpperCase(),
        Modelo: document.getElementById("ModeloNuevo").value.trim().toUpperCase(),
        Año: parseInt(document.getElementById("AñoNuevo").value.trim()),
        Patente: document.getElementById("PatenteNuevo").value.trim().toUpperCase(),
        Km: parseInt(document.getElementById("KmNuevo").value.trim()),
        FechaDeIngreso: new Date(document.getElementById("FechaDeIngresoNuevo").value),
        Disponible: document.getElementById("DisponibleNuevo").checked
    };
    console.log("Objeto que estoy enviando:");
    console.log(vehiculo);
    if (
        vehiculo.Marca === "" ||
        vehiculo.Modelo === "" ||
        vehiculo.Año === "" ||
        vehiculo.Patente === "" ||
        vehiculo.Km === "" ||
        vehiculo.FechaDeIngreso === ""
    ) {
        alert("Por favor, completá todos los campos.");
        return;
    }
    // Validar cantidad mínima de caracteres del modelo
    if (vehiculo.Modelo.length < 2) {
        alert("El modelo debe tener como mínimo 2 caracteres.");
        return;
    }

    // Validar que el valor de Km no sea negativo al agregar el vehículo
    if (vehiculo.Km < 0) {
        alert("El valor de Km no puede ser negativo.");
        return;
    }


    fetch("http://localhost:5220/api/Vehiculo", {

        method: "POST",

        headers: {
            Accept: "application/json",
            "content-type": "application/json"
        },

        body: JSON.stringify(vehiculo)

    })
        .then(async (respuesta) => {

            let texto = await respuesta.text();

            console.log("Status:", respuesta.status);
            console.log("Respuesta de la API:", texto);

            if (!respuesta.ok) {

                throw new Error(
                    "Error " + respuesta.status + ": " + texto
                );
            }

            return texto;
        })
        .then(() => {

            // Limpiar modal NUEVO

            document.getElementById("MarcaNuevo").value = "";
            document.getElementById("ModeloNuevo").value = "";
            document.getElementById("AñoNuevo").value = "";
            document.getElementById("PatenteNuevo").value = "";
            document.getElementById("KmNuevo").value = "";
            document.getElementById("FechaDeIngresoNuevo").value = "";

            document.getElementById("DisponibleNuevo").checked = false;


            // Cerrar modal

            const modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("exampleModal")
            );

            modal.hide();


            // Actualizar tabla

            ObtenerVehiculos();
        })
        .catch((error) => {

            console.error(
                "No se pudo agregar el vehículo:",
                error
            );
        });
}


function BuscarValoreVehiculos(id) {

    console.log("Buscando vehículo:", id);

    fetch(`http://localhost:5220/api/Vehiculo/${id}`)

        .then((respuesta) => {

            if (!respuesta.ok) {

                throw new Error(
                    `Error HTTP: ${respuesta.status}`
                );
            }

            return respuesta.json();
        })

        .then((data) => {

            console.log("Vehículo:", data);


            // GUARDAMOS EL ID
            document.getElementById("idEditar").value =
                data.vehiculosId;


            // CARGAMOS LOS DATOS EN EL MODAL EDITAR

            document.getElementById("MarcaEditar").value =
                data.marca;

            document.getElementById("ModeloEditar").value =
                data.modelo;

            document.getElementById("AñoEditar").value =
                data.año;

            document.getElementById("PatenteEditar").value =
                data.patente;

            document.getElementById("KmEditar").value =
                data.km;

            document.getElementById("FechaDeIngresoEditar").value =
                new Date(data.fechaDeIngreso)
                    .toISOString()
                    .split("T")[0];

            document.getElementById("DisponibleEditar").checked =
                data.disponible;


            // BUSCAMOS EL MODAL

            const elementoModal =
                document.getElementById("modalEditar");


            console.log(
                "Elemento modal:",
                elementoModal
            );


            // ABRIMOS EL MODAL

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    elementoModal
                );

            modal.show();

        })

        .catch((error) => {

            console.error(
                "No se pudo acceder a la API:",
                error
            );
        });
}


function EditarVehiculo() {

    let id =
        document.getElementById("idEditar").value;

    console.log("ID a editar:", id);


    let editarVehiculo = {
        VehiculosId: parseInt(id),
        Marca: document.getElementById("MarcaEditar").value.trim().toUpperCase(),
        Modelo: document.getElementById("ModeloEditar").value.trim().toUpperCase(),
        Año: parseInt(document.getElementById("AñoEditar").value),
        Patente: document.getElementById("PatenteEditar").value.trim().toUpperCase(),
        Km: parseInt(document.getElementById("KmEditar").value),
        FechaDeIngreso: new Date(document.getElementById("FechaDeIngresoEditar").value),
        Disponible: document.getElementById("DisponibleEditar").checked
    };


    console.log(
        "Objeto que estoy enviando:",
        editarVehiculo
    );
    if (
        editarVehiculo.Marca === "" ||
        editarVehiculo.Modelo === "" ||
        editarVehiculo.Año === "" ||
        editarVehiculo.Patente === "" ||
        editarVehiculo.Km === "" ||
        editarVehiculo.FechaDeIngreso === ""
    ) {
        alert("Por favor, completá todos los campos.");
        return;
    }
    // Validar cantidad mínima de caracteres del modelo
    if (editarVehiculo.Modelo.length < 2) {
        alert("El modelo debe tener como mínimo 2 caracteres.");
        return;
    }
    // Validar que el valor de Km no sea negativo al editar el vehículo
    if (editarVehiculo.Km < 0) {
        alert("El valor de Km no puede ser negativo.");
        return;
    }


    fetch(
        `http://localhost:5220/api/Vehiculo/${id}`,
        {
            method: "PUT",

            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },

            body: JSON.stringify(editarVehiculo)
        }
    )

        .then(async (respuesta) => {

            let texto = await respuesta.text();

            console.log("Status:", respuesta.status);

            console.log("Respuesta:", texto);

            if (!respuesta.ok) {

                throw new Error(`Error ${respuesta.status}: ${texto}`);
            }

            return texto;
        })

        .then(() => {

            // Limpiar campos de EDITAR
            document.getElementById("MarcaEditar").value = "";
            document.getElementById("ModeloEditar").value = "";
            document.getElementById("AñoEditar").value = "";
            document.getElementById("PatenteEditar").value = "";
            document.getElementById("KmEditar").value = "";
            document.getElementById("FechaDeIngresoEditar").value = "";
            document.getElementById("DisponibleEditar").checked = false;
            // CERRAR MODAL

            const modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("modalEditar")
            );

            modal.hide();


            // ACTUALIZAR TABLA

            ObtenerVehiculos();
        })

        .catch((error) => {

            console.error("No se pudo editar el vehículo:", error);
        });
}

function EliminarVehiculo(id, disponible) {

    console.log("ID:", id);
    console.log("Disponible:", disponible);

    if (disponible === true) {
        alert("El vehículo está disponible, no se puede eliminar.");
        return;
    }

    if (confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {

        fetch(`http://localhost:5220/api/Vehiculo/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(async (respuesta) => {

                let texto = await respuesta.text();

                console.log("Status:", respuesta.status);
                console.log("Respuesta:", texto);

                if (!respuesta.ok) {
                    throw new Error(
                        `Error ${respuesta.status}: ${texto}`
                    );
                }

                return texto;
            })
            .then(() => {

                // Actualizar tabla
                ObtenerVehiculos();

            })
            .catch((error) => {

                console.error(
                    "No se pudo eliminar el vehículo:",
                    error
                );

            });
    }
}
ObtenerVehiculos();
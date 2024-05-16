function calcularIngreso() {
    var horasTrabajadas = parseFloat(document.getElementById("horas").value);
    var salario = parseFloat(document.getElementById("salario").value);
    var tipoSalario = document.getElementById("tipo").value;

    if (isNaN(horasTrabajadas) || isNaN(salario)) {
        document.getElementById("resultado").innerHTML = "Por favor, ingrese valores numéricos válidos.";
    } else {
        var ingreso;
        if (tipoSalario === "hora") {
            ingreso = horasTrabajadas * salario;
        } else if (tipoSalario === "quincenal") {
            ingreso = horasTrabajadas * salario * 2; // Se asume que el salario es quincenal, por lo que se multiplica por 2 para obtener el ingreso quincenal
        } else if (tipoSalario === "mensual") {
            ingreso = horasTrabajadas * salario * 4; // Se asume que el salario es mensual, por lo que se multiplica por 4 para obtener el ingreso mensual
        }
        document.getElementById("resultado").innerHTML = "El ingreso es: $" + ingreso.toFixed(2);
    }
}

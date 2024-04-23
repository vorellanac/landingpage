<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['firstname'];
    $pais = $_POST['Pais'];
    $mensaje = $_POST['subject'];

    // Aquí puedes procesar los datos del formulario
    // Por ejemplo, puedes imprimirlos en la consola o guardarlos en una base de datos
    echo "Nombre y apellido: " . $nombre . "<br>";
    echo "País: " . $pais . "<br>";
    echo "Mensaje: " . $mensaje . "<br>";
}
?>

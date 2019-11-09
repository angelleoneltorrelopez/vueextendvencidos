<?php

$conn = new mysqli("localhost", "root", "", "vencimiento");
if ($conn->connect_error) {
	die("Error en conexión de la base de datos..");
}
$res = array();



$action = 'producto';

//********   SELECIONAR   *****************************************************
if (isset($_GET['action'])) {
	$action = $_GET['action'];
}

if (isset($_GET['producto'])) {
	$producto = $_GET['producto'];
}

if (isset($_GET['producto'])) {
	$result = $conn->query("SELECT idproductos, nombre_productos FROM productos WHERE nombre_productos LIKE '%$producto%'");
	$productos = array();

	while ($row = $result->fetch_assoc()){
		array_push($productos, $row);
	}
	$res['producto'] = $productos;
}

if (isset($_GET['ingreso'])) {
	$ingreso = $_GET['ingreso'];
	$result = $conn->query("SELECT Id,productos.nombre_productos, casa.nombrecasa, proveedores.nombreprov, Politica, Caducidad, Lote, Estado, Usuario, regDate FROM ingreso JOIN productos ON ingreso.idproducto = productos.idproductos JOIN casa ON ingreso.idcasa = casa.idcasa JOIN proveedores ON ingreso.idproveedor = proveedores.idproveedor WHERE idproducto = $ingreso ORDER BY Caducidad DESC");
//$result = $conn->query("SELECT * FROM `ingreso` WHERE `idproducto` = $ingreso");
	$ingresos = array();

	while ($row = $result->fetch_assoc()){
		array_push($ingresos, $row);
	}
	$res['ingreso'] = $ingresos;
}


if ($action == 'read') {
	$result = $conn->query("SELECT * FROM casa");
	$productos = array();

	while ($row = $result->fetch_assoc()){
		array_push($productos, $row);
	}
	$res['casa'] = $productos;
}

if ($action == 'readproveedor') {
	$result = $conn->query("SELECT * FROM `proveedores`");
	$roles = array();

	while ($row = $result->fetch_assoc()){
		array_push($roles, $row);
	}
	$res['proveedor'] = $roles;
}
//********   SELECIONAR   *****************************************************


//********   CREAR   **********************************************************
if ($action == 'create') {

	$producto = $_POST['producto'];
	$casa = $_POST['casa'];
	$proveedor = $_POST['proveedor'];
	$politica = $_POST['politica'];
	$caducidad = $_POST['caducidad'];
	$lote = $_POST['lote'];
	$estado = $_POST['estado'];
	$usuario = $_POST['usuario'];

	$result = $conn->query("INSERT INTO `ingreso` (`idproducto`, `idcasa`, `idproveedor`, `Politica`, `Caducidad`, `Lote`, `Estado`, `Usuario`) VALUES ('$producto', '$casa', '$proveedor', '$politica', '$caducidad', '$lote', '$estado', '$usuario') ");
	if ($result) {
		$res['message'] = " agregado con éxito";
	} else{
		$res['error'] = true;
		$res['message'] = "Creacion de vencido fallida";
	}
}

$conn -> close();

header("Content-type: application/json");
echo json_encode($res);
die();



 ?>

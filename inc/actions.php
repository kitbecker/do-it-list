<!DOCTYPE html>
<html>
<head>

</head>
<body>


<?php

$action = $_GET["action"];


if ($action == "add" ){

    $group = $_GET["group"];
    $name = $_GET["name"];

    include("connect.php");

    try {
         $sql = "INSERT INTO items (id, group_id, name, description, done) 
                VALUES (NULL, $group, '$name', NULL, '0');";         
        // use exec() because no results are returned
        $conn->exec($sql);
        }
    catch(PDOException $e)
        {
        echo "Connection failed: " . $e->getMessage();
        }
}


if ($action == "done" ){

    $id = $_GET["id"]; 

    include("connect.php");

    try {
        $sql = "UPDATE items SET done=1 WHERE id=$id";         
        // use exec() because no results are returned
        $conn->exec($sql);
        }
    catch(PDOException $e)
        {
        echo "Connection failed: " . $e->getMessage();
        }
}


?>



</body>
</html>
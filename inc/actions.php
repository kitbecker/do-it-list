<!DOCTYPE html>
<html>
<head>

</head>
<body>


<?php

$action = $_GET["action"];



if ($action == "add" ){

    include("connect.php");

    $group = $_GET["group"];
    $name = $_GET["name"];

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

    include("connect.php");

    $id = $_GET["id"]; 

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

if ($action == "editDesc" ){

    include("connect.php");

    $id = $_GET["id"]; 
    $desc = $_GET["desc"]; 

    try {
      
        $sql = "UPDATE items SET description='$desc' WHERE id=$id";         
        // use exec() because no results are returned
        $conn->exec($sql);
        }
        
    catch(PDOException $e)
        {
        echo "Connection failed: " . $e->getMessage();
        }
}

if ($action == "deleteDesc" ){

    include("connect.php");

    $id = $_GET["id"]; 

    try {
      
        $sql = "UPDATE items SET description=NULL WHERE id=$id";         
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
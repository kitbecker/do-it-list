<!DOCTYPE html>
<html>
<head>

</head>
<body>


<?php

$action = $_POST["action"];

if ($action == "add" ){

    include("connect.php");

    $group = $_POST["group"];
    $name = $_POST["name"];
    $type = $_POST["type"];

    if ($type == "item"){
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
    if ($type == "group"){
        try {
             $sql = "INSERT INTO groups ( group_name, group_description ) 
                    VALUES (  '$name', NULL );";         
            // use exec() because no results are returned
            $conn->exec($sql);
            }
        catch(PDOException $e)
            {
            echo "Connection failed: " . $e->getMessage();
            }
    }

}


if ($action == "done" ){

    include("connect.php");

    $id = $_POST["id"]; 
    $type = $_POST["type"];

    if ($type == "item"){
        try {
            $sql = "UPDATE items SET done=1 WHERE id=$id";         

            $conn->exec($sql);
            }

        catch(PDOException $e)
            {
            echo "Connection failed: " . $e->getMessage();
            }
    }

    if ($type == "group"){
            try {
                $sql = "UPDATE groups SET inactive=1 WHERE group_id=$id";             

                $conn->exec($sql);
                }
            catch(PDOException $e)
                {
                echo "Connection failed: " . $e->getMessage();
                }
        }

}

if ($action == "delete" ){

    include("connect.php");

    $id = $_POST["id"]; 
    $type = $_POST["type"];

    if ($type == "item"){
        try {
            $sql = "DELETE FROM items WHERE id=$id";         

            $conn->exec($sql);
            }

        catch(PDOException $e)
            {
            echo "Connection failed: " . $e->getMessage();
            }
    }

    if ($type == "group"){
            try {
                $sql = "DELETE FROM groups WHERE group_id=$id";             

                $conn->exec($sql);
                }
            catch(PDOException $e)
                {
                echo "Connection failed: " . $e->getMessage();
                }
        }

}




if ($action == "editDesc" ){

    include("connect.php");

    $id = $_POST["id"]; 
    $desc = $_POST["desc"];
    $type = $_POST["type"];


    if ($type == "item"){
        try {
            $sql = "UPDATE items SET description='$desc' WHERE id=$id";         
            
            $conn->exec($sql);
            }
            
        catch(PDOException $e)
            {
            echo "Connection failed: " . $e->getMessage();
            }
    }
    if ($type == "group"){
        try {
            $sql = "UPDATE groups SET group_description='$desc' WHERE group_id=$id";         
            
            $conn->exec($sql);
            }
            
        catch(PDOException $e)
            {
            echo "Connection failed: " . $e->getMessage();
            }
    }
}




if ($action == "deleteDesc" ){

    include("connect.php");

    $id = $_POST["id"];
    $type = $_POST["type"];


    if ($type == "item"){
        try {
          
            $sql = "UPDATE items SET description=NULL WHERE id=$id";         
            
            $conn->exec($sql);
            }
            
        catch(PDOException $e)
            {
            echo "Connection failed: " . $e->getMessage();
            }
    }

    if ($type == "group"){
        try {
          
            $sql = "UPDATE groups SET group_description=NULL WHERE group_id=$id";          
            
            $conn->exec($sql);
            }
            
        catch(PDOException $e)
            {
            echo "Connection failed: " . $e->getMessage();
            }
    }

}



//view done items

if ($action == "viewDone" ){

    $id = $_POST["id"];
    $type = $_POST["type"];

    include("connect.php");
  
    try{
    $doneItems = $conn -> query("SELECT * FROM items WHERE done != 1 AND group_id=$group");
        echo "Retrieved results.";
    }catch(Exception $e){
        echo "unable to retrieve results.";
    exit;
  }

   $list = $doneItems -> fetchAll();

   foreach ($list as $item ) {
      echo '<div class="item light" id="item-' . $item["id"] . '" >';
      echo '  <div class="item-title">' . $item["name"] . '</div>';
      echo '  <button type="button" class="itemDone"></button>';

        if ($item["description"] != "" ){
          echo '  <div class="item-description">';
          echo $item["description"] ;
          echo '  </div>';
        }

      echo '</div>';
   }

}

?>


</body>
</html>
<?php

function full_list_array(){  
  include("connect.php");
  
  try{
    $results = $conn -> query("SELECT * FROM items JOIN groups ON items.group_id = groups.group_id");
      echo "Retrieved results.";
  }catch(Exception $e){
    echo "unable to retrieve results.";
    exit;
  }

  $list = $results -> fetchAll();
      


      $groups = array();
      foreach( $list as $group ){
        if (!in_array($group["group_id"], $groups)) {
          $groups[] = $group["group_id"];
          $current_group = $group["group_id"];
          echo '<div id="group-1" class="group dark">';
          echo "<h2>" .$group["group_name"] . "</h2>";
          echo "<p>item group description : " .$group["group_description"] . "</p>";

           foreach( $list as $item ){
                if( $item["group_id"] == $current_group ){

                  echo '<div class="item light" id="item-' . $item["id"] . '" >';
                  echo '  <div class="item-title">' . $item["name"] . '</div>';
                  echo '  <button type="button" class="itemDone"></button>';

                    if ($item["description"] != "" ){
                      echo '  <div class="item-description">';
                      echo $item["description"] ;
                      echo '  </div>';
                    }

                  echo '  <div class="button-area">';
                  echo '    <button class="addDesc">add Description</button>';
                  echo '    <button class="saveDesc">save Description</button>';
                  echo '    <button class="editDesc">Edit Description</button>';
                  echo '    <button class="deleteDesc">X</button>';
                  echo '  </div>';
                  echo '</div>';
                }
            }
          echo '<div id="item-buttons">';
          echo '<button class="addItem">+</button>';
          echo '</div>';
          echo '</div>';
        }
      }

}


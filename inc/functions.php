<?php

function full_list_array(){  
  include("connect.php");
  
  try{
    $groups = $conn -> query("SELECT * FROM groups WHERE inactive != 1");
      echo "Retrieved results.";
  }catch(Exception $e){
    echo "unable to retrieve results.";
    exit;
  }

  try{
    $items = $conn -> query("SELECT * FROM items JOIN groups ON items.group_id = groups.group_id WHERE items.done != 1");
      echo "Retrieved results.";
  }catch(Exception $e){
    echo "unable to retrieve results.";
    exit;
  }  

  try{
    $doneItems = $conn -> query("SELECT * FROM items JOIN groups ON items.group_id = groups.group_id WHERE items.done = 1");
      echo "Retrieved results.";
  }catch(Exception $e){
    echo "unable to retrieve results.";
    exit;
  }  

  $groupList = $groups -> fetchAll();
  $list = $items -> fetchAll();
  $done = $doneItems -> fetchAll();

      foreach(  $groupList as $group ){
        
          $groupList[] = $group["group_id"];
          $current_group = $group["group_id"];
          echo "<div id='group-" .$group["group_id"] . "' class='group dark'>";
          echo '  <button type="button" class="itemDone"></button>';
          echo "<h2>" .$group["group_name"] . "</h2>";
          echo "<div class='item-description'>" .$group["group_description"] . "</div>";

          /* group buttons */          
            echo '  <div class="button-area hide">';
            if (!$group["group_description"]){
              echo '    <button class="addDesc">add Description</button>';
              echo '    <button class="saveDesc hide">save Description</button>';
              echo '    <button class="editDesc hide">Edit Description</button>';
              echo '    <button class="deleteDesc hide">X</button>';
            }else{
              echo '    <button class="addDesc hide">add Description</button>';
              echo '    <button class="saveDesc hide">save Description</button>';
              echo '    <button class="editDesc show">Edit Description</button>';
              echo '    <button class="deleteDesc show">X</button>';
            }

            echo '  </div>';

          echo '  <div class="items">';

          foreach( $list as $item ){
                if( $item["group_id"] == $current_group ){

                  echo '<div class="item light" id="item-' . $item["id"] . '" >';
                  echo '  <div class="item-title">' . $item["name"] . '</div>';
                  echo '  <button type="button" class="itemDone"></button>';

                    if ($item["description"] != "" ){
                      echo '  <div class="item-description hide">';
                      echo $item["description"] ;
                      echo '  </div>';
                    }

                    echo '  <div class="button-area hide">';
                    if ( !$item["description"] ){
                      echo '    <button class="addDesc">add Description</button>';
                      echo '    <button class="saveDesc hide">save Description</button>';
                      echo '    <button class="editDesc hide">Edit Description</button>';
                      echo '    <button class="deleteDesc hide">X</button>';
                    }else{
                      echo '    <button class="addDesc hide">add Description</button>';
                      echo '    <button class="saveDesc hide">save Description</button>';
                      echo '    <button class="editDesc show">Edit Description</button>';
                      echo '    <button class="deleteDesc show">X</button>';
                    }

                    echo '  </div>';
                  echo '</div>';
                }
            }

          echo '</div>';

          echo '<div id="item-buttons">';
          echo '<button class="addItem">+</button>';
          echo '    <button class="viewDone">View Finished Items</button>';
          echo '    <button class="hideDone hide">hide Finished Items</button>';
          echo '</div>';



/* Done Items */
        echo '<div class="doneItems hide"><h3>Done Items</h3>';  
        foreach( $done as $item ){

                if( $item["group_id"] == $current_group ){

                  echo '<div class="item done" id="item-' . $item["id"] . '" >';
                  echo '  <div class="item-title">' . $item["name"] . '</div>';
                  echo '  <button type="button" class="itemDelete"></button>';

                    if ($item["description"] != "" ){
                      echo '  <div class="item-description">';
                      echo $item["description"] ;
                      echo '  </div>';
                    }
                
                  echo '</div>';
                }
            }
          echo '</div><!-- end done items --></div>';
        }
}


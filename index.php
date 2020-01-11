
<?php 

$type = $_GET['tp']; 
if($type=='addnewuser') addnewuser(); 
elseif($type=='login') login(); 
elseif($type=='select') select(); 
elseif($type=='deleteuser') deleteuser(); 
elseif($type=='seleforupdt') seleforupdt();
elseif($type=='updateuser') updateuser();


function login() 
{ 
       require 'config.php'; 
       $json = json_decode(file_get_contents('php://input'), true); 
       $emailid = $json['emailid'];
        $password = $json['password']; 

        $email_check = preg_match('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i', $emailid);
        $password_check = preg_match('/^[A-Za-z0-9!@#$%^&*()_]{1,20}$/i', $password);
            if($email_check==0) 
            echo '{"error":"Invalid email formate"}';
        elseif($password_check ==0) 
            echo '{"error":"Invalid password format!"}';
        else
        {

       $userData =''; $query = "select * from userreg_tb where emailid='$emailid' and password='$password'"; 
       $result= $db->query($query);
       $rowCount=$result->num_rows;
             
        if($rowCount>0)
        {
            $userData = $result->fetch_object();
            $user_id=$userData->userid;
            $userData = json_encode($userData);
            echo '{"userData":'.$userData.'}';

            
        }
        else 
        {
            echo '{"error":"Wrong username and password"}';
        }
}
    
}



function addnewuser() {
    
        require 'config.php';

              
        $json = json_decode(file_get_contents('php://input'), true);
        $sitename = $json['sitename'];
        $password = $json['password'];
        $email = $json['email'];
        // $name = $json['name'];


        // $username_check = preg_match("/^[A-Za-z0-9_]{4,10}$/i", $username);
        $email_check = preg_match('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i', $email);
        $password_check = preg_match('/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/i', $password);
       
        
        if($email_check==0) 
            echo '{"error":"Invalid email"}';
        elseif($password_check ==0) 
            echo '{"error":"Invalid password! length be 6-20"}';

        elseif (strlen(trim($password))>0 && strlen(trim($email))>0 && strlen(trim($sitename))>0 &&
            $email_check>0  && $password_check>0)
        {
           

            $userData = '';
            
            $result = $db->query("select * from userreg_tb where emailid='$email'");
            $rowCount=$result->num_rows;
            
           
            if($rowCount==0)
            {
                                
                $ins=$db->query("INSERT INTO userreg_tb(emailid,password,sitename)
                            VALUES('$email','$password','$sitename')");
                echo '{"status":"succ"}';
                // $userData ='';
                // $query = "select * from users where username='$username' and password='$password'";
                // $result= $db->query($query);
                // $userData = $result->fetch_object();
                // $user_id=$userData->user_id;
                // $userData = json_encode($userData);
                
              
            } 
            else {
               echo '{"error":"email exists,try with new one! "}';
            }

        }
        else{
            echo '{"error":"Enter valid data"}';
        }
   
}


function select(){
    
    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id=$json['user_id'];
    $query = "SELECT * FROM userreg_tb";
    // $query = "SELECT * FROM userreg_tb WHERE userid=$user_id ORDER BY userid DESC ";
    //$query = "SELECT * FROM feed ";
    $result = $db->query($query); 

    $feedData = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $feedData=json_encode($feedData);
    
    echo '{"feedData":'.$feedData.'}';
    
   
}


function seleforupdt(){
    
    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id=$json['user_id'];
    // $query = "SELECT * FROM userreg_tb";
     $query = "SELECT * FROM userreg_tb WHERE userid=$user_id";
    //$query = "SELECT * FROM feed ";
    $result = $db->query($query); 

    $feedData = mysqli_fetch_all($result,MYSQLI_ASSOC);
      $feedData=json_encode($feedData);
    
     echo '{"outData":'.$feedData.'}';
    
   
}




function feedUpdate(){

    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id=$json['user_id'];
    $feed=$json['feed'];
    
    $feedData = '';
    if($user_id !=0)
    {
        $query = "INSERT INTO feed ( feed, user_id) VALUES ('$feed','$user_id')";
        $db->query($query);              
    }
    $query = "SELECT * FROM feed WHERE user_id=$user_id ORDER BY feed_id DESC LIMIT 10";
    $result = $db->query($query); 

    $feedData = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $feedData=json_encode($feedData);
    
    echo '{"feedData":'.$feedData.'}';

}

function deleteuser(){
    require 'config.php';
    $json = json_decode(file_get_contents('php://input'), true);
    $user_id=$json['user_id'];
    
         
    $query = "Delete FROM userreg_tb WHERE userid=$user_id";
    $result = $db->query($query);
    if($result)       
    {        
        echo '{"success":"deleted succesfuly"}';
    } else{
     
        echo '{"error":"Delete error"}';
    }
       
       
    
}


function updateuser() {
    
        require 'config.php';

              
        $json = json_decode(file_get_contents('php://input'), true);
        
        $uid = $json['user_id'];
        $usite = $json['user_site'];
        $umail = $json['user_email'];
        $upass = $json['use_password'];
        // $name = $json['name'];


        // $username_check = preg_match("/^[A-Za-z0-9_]{4,10}$/i", $username);
        $email_check = preg_match('/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$/i', $umail);
        $password_check = preg_match('/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/i', $upass);
       
        
        if($email_check==0) 
            echo '{"error":"Invalid email"}';
        elseif($password_check ==0) 
            echo '{"error":"Invalid password!"}';

        elseif (strlen(trim($upass))>0 && strlen(trim($umail))>0 && strlen(trim($usite))>0 &&
            $email_check>0  && $password_check>0)
        {
           

            $userData = '';
            
                                
                $upd=$db->query("UPDATE userreg_tb SET emailid='$umail',password='$upass',sitename='$usite' WHERE userid=$uid ");
                echo '{"status":"succ"}';
             
        }
        else{
            echo '{"error":"Enter valid data"}';
        }
   
}


?>

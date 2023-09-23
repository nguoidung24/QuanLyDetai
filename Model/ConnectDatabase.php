<?php
    class Database{
        static function getConnect(){
           return mysqli_connect("localhost","root","","student_management");

        }
        public static function getTable($query){
            try{
                $result = mysqli_query(self::getConnect(),$query);

            }
            catch(Exception $e){
                return [];
            }
            $rows = [];
            while($row = mysqli_fetch_assoc($result)){
                $rows [] = $row;

            }
            return $rows;
        }
        public static function executeQuery($query){
            try{
                return mysqli_query(self::getConnect(),$query);
            }
            catch(Exception $e){
                return false;
            }
        }
    }
?>
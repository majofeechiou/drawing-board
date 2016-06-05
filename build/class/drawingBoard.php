<?

    class DrawingBoard{
        function __construct() {
        }
        public function saveImage( $str_img ){
            $_json_output = array(
                success=> true,
                data=> $str_img
            );
            return $_json_output ;
        }
    }

?>
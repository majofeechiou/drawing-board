<?

    class DrawingBoard{
        function __construct() {
        }
        public function saveImage( $str_img ){

            echo dirname(__FILE__);

            $str_path = '/home1/vickywor/public_html/fe/drawing-board/upload/image/';
            $str_file = time().'-'.rand(1,1000).'-'.md5(rand(1,10),false).'.png';

            file_put_contents($str_path.$str_file, base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $str_img)));

            $_json_output = array(
                success=> true,
                data=> $str_img,
                file=> $str_file
            );

            return $_json_output ;
        }
    }

?>
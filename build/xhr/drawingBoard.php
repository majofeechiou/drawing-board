<?
    require_once('./../class/drawingBoard.php');

    $drawingBoard = new DrawingBoard();
    // echo json_encode( $drawingBoard->saveImage($_REQUEST['image']) );
    $json_result = $drawingBoard->saveImage($_REQUEST['image']) ;

    if( $json_result['success']===true ){
        header( 'Location: http://fe.majochiou.info/drawing-board/share.php?image='.$json_result['file'] ) ;
    }
?>
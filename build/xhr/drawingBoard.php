<?
    require_once('./../class/drawingBoard.php');
    
    $drawingBoard = new DrawingBoard();
    // echo json_encode($_POST);
    // echo json_encode($_REQUEST);
    echo json_encode( $drawingBoard->saveImage($_REQUEST['image']) );
?>
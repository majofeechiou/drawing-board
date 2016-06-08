<!DOCTYPE html>
<html>
		<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1">
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="apple-itunes-app" content="app-id=300915900, app-argument=http://www.kkbox.com/tw/tc/index.html">
				<meta name="keywords" content="圖片,修改,canvas,react,redux">
				<meta name="description" content="利用canvas、react、redux、native javascript製作的線上圖片修改工具">
				<title>線上圖片修改工具</title>
				<meta property="og:type" content="website"/>
				<meta property="og:title" content="線上圖片修改工具"/>
				<meta property="og:url" content="http://fe.majochiou.info/drawing-board/share.php?image=<?=$_GET['image']?>"/>
				<meta property="og:description" content="利用canvas、react、redux、native javascript製作的線上圖片修改工具" />
				<meta property="og:image" content="http://fe.majochiou.info/drawing-board/upload/image/<?=$_GET['image']?>"/>
		</head>
		<body>

			<div>
				<a href="/drawing-board/index.html">使用產生器</a>
			</div>

			<div
				class="fb-like"
				data-share="true"
				data-width="450"
				data-show-faces="true">
			</div>

			<? if($_GET['image']){ ?>
				<img src='./upload/image/<?=$_GET['image']?>' />
				<script>
					window.fbAsyncInit = function() {
						FB.init({
							appId      : '1305720659442750',
							xfbml      : true,
							version    : 'v2.6'
						});
					};

					(function(d, s, id){
						 var js, fjs = d.getElementsByTagName(s)[0];
						 if (d.getElementById(id)) {return;}
						 js = d.createElement(s); js.id = id;
						 js.src = "//connect.facebook.net/en_US/sdk.js";
						 fjs.parentNode.insertBefore(js, fjs);
					 }(document, 'script', 'facebook-jssdk'));
				</script>
			<? }else{ ?>
				沒有圖片
			<? } ?>
		
		</body>
</html>
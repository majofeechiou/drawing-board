<!DOCTYPE html>
<html lang="zh-TW">
	<head>
	    
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	    <meta name="apple-itunes-app" content="app-id=300915900, app-argument=http://fe.majochiou.info/drawing-board/index.php">
	    <meta name="keywords" content="圖片,修改,canvas,react,redux">
	    <meta name="description" content="利用canvas、react、redux、native javascript製作的線上圖片修改工具">
	    <title>線上圖片修改工具</title>
	    <meta property="og:type" content="website"/>
	    <meta property="og:title" content="線上圖片修改工具"/>
	    <meta property="og:description" content="利用canvas、react、redux、native javascript製作的線上圖片修改工具" />
	    <? if($_GET['image']){ ?>
		    <meta property="og:url" content="http://fe.majochiou.info/drawing-board/index.php?image=<?=$_GET['image']?>"/>
		    <meta property="og:image" content="http://fe.majochiou.info/drawing-board/upload/image/<?=$_GET['image']?>"/>
	    <? } ?>
	    
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-78736944-1', 'auto');
		  ga('send', 'pageview');

		</script>
		<link href="css/index.css" rel="stylesheet">

	</head>

	<body id="body" class="pkg-pagestyle">

		<div class="pkg-tmp">
			<div id="method-popup" class="pkg-tmp-method pkg-method"></div>

			<div class="pkg-tmp-workspace">
				<div data-majo="picture-filter"></div>
				<div data-majo="picture-filter"></div>
				<div data-majo="picture-filter"></div>
			</div>

			<div class="pkg-tmp-setting pkg-setting" id="setting-section">
				<div class="pkg-setting-option" id="setting-style"></div>
				<span class="pkg-setting-btn pkg-pagestyle-settingbtn" id="setting-btn"></span>
			</div>
		</div>

		<? if($_GET['image']){ ?>
			<input type="checkbox" name="popupShare" value="1" class="pkg-popup__checked" id="popup-share" checked />
			<div class="pkg-popup">
				<div class="pkg-popup-content">
					<div class="pkg-popup-content-fb">
						<div
							class="fb-like"
							data-share="true"
							data-width="450"
							data-show-faces="true">
						</div>
					</div>
					<img class="pkg-popup-content-img" src='./upload/image/<?=$_GET['image']?>' />
					<label for="popup-share" class="pkg-popup-content-close"></label>
				</div>
			</div>
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
			<!-- 沒有圖片 -->
		<? } ?>

		<!-- Google Tag Manager -->
		<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-PMCVWN"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-PMCVWN');</script>
		<!-- End Google Tag Manager -->

	<script src="js/index.js"></script></body>
</html>
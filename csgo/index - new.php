<!DOCTYPE html>
	<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
	<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
	<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
	<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

	<!-- -------------------------------- IMPORTANT --------------------------------- -->
	<!-- DO NOT change the id/class or add new classes to elements where you find *** -->
	<!-- ---------------------------------------------------------------------------- -->
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>CS:GO Post Match Thread Creator</title>
			<meta name="description" content="">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			
			<!-- css -->
			<link rel="stylesheet" href="../css/normalize.css">
			<link rel="stylesheet" href="css/main.css">
			<link rel="stylesheet" href="css/flair.css">
			
			<!-- js -->
			<script src="js/vendor/modernizr-custom.js"></script>
			<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.1.0.min.js"><\/script>')</script>
			<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
			<script type="text/javascript" src="js/plugins.js"></script>
			<script type="text/javascript" src="js/main.js"></script>
			<!--<script type="text/javascript" src="js/pmtc.js"></script>
			<script type="text/javascript" src="js/jquery.inputmask.bundle.min.js"></script>-->
		</head>
		
		<body>
		
			<!-- Shadow overlay -->
			<div id="fade" class="black_overlay hidden"></div>
			
			<!-- About Pop up -->
			<div id="about-popup" class="white_content hidden">
				<h2>About</h2>
				<a class="close" href="javascript:void(0)" onclick="closePopup('about-popup')">×</a>
				<div>
					<p>Adapted by Linku from code by Cobertor on the League of Legends PMTC.</p>
					<p>Further updated by Undercover Cactus.</p>
					<p>Yes, the code is not perfect.</p>
					<p>No, I am not a good programmer</p>
					<br>
					<p>If you have any questions or suggestions:</p>
					<ul>
						<li>Message Undercover Cactus on Slack (If you're part of the group)</li>
						<li>Send a message to /u/Undercover-Cactus on Reddit.</a></li>
					</ul>
				</div>
			</div>
			
			<section id="container">
			
			<!--[if lt IE 7]>
				<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
			<![endif]-->


<div id="top-div">
	<ul class="top-list inline">
		<li>
			<strong class="about-btn"><a href="../">Home</a></strong>
		</li>
						<li>
			<strong class="about-btn" onclick="showPopup('about-popup');">
			About
			</strong>
		</li>
		<li>
			<strong id="themeButton" onclick="changeTheme();">
			Switch Theme
			</strong>
		</li>
			</ul>
</div>
<div id="div-login">
	<p>Enter the password to login</p>
	<form method="POST" action="index.php">
		<div class="inline-block">
			<label for="pass">Password:</label>
			<input type="password" name="pass"></input>
		</div>
		<div>
		<p>Attempts: 0</p>
		</div>
		<div class="inline-block">
			<input type="submit" name="login" value="Login"></input>
		</div>
	 </form>
 </div>		<div id="div-copyright">
			<p>
				&copy;
				<script language="JavaScript" type="text/javascript">
					now = new Date
					theYear = now.getYear()
					if (theYear < 1900)
						theYear = theYear + 1900
					document.write(theYear)
				</script>
				ajsangels
			</p>
		</div>
		</section> <!-- end container -->
	</body>
</html>

<?php
/** Note: server uses Apache/2.2.22 **/
error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);


// Start the session
session_start();

// Destroy the previous session if logging oute
if (isset($_POST['logout'])) {
	session_destroy();
	$_SESSION = array(); // Clears the $_SESSION variable
	session_start();
}

$validUser 	= TRUE;  // The current user is valid and may enter
$guest 		= FALSE; // The current user is a guest

// Check if there's a user
if (isset($_SESSION['user'])) {

	// Get the user
	$user = $_SESSION['user'];

	// If they're already logged in, then they are valid and may enter
	if ($user == "logged") {
		$validUser = TRUE;

	// The user is a guest and has not logged in
	} else if ($user == "guest") {
		$guest = TRUE;

	// Error: User is neither logged nor guest
	} else {
		exit('ERROR: User is neither logged nor guest');
	}	
}

// Password tries

// If number of tries is not logged, set it to 0
if (!isset($_SESSION['tries'])) {
	$_SESSION['tries'] = 0;

// If number of tries is already logged, sleep the according length
} else if (!$validUser && !$guest && $_SESSION['tries'] > 1) {
	sleep(2*$_SESSION['tries']);
}

// Include the header
include('head.html');

// If the user is valid or is a guest, let them enter
if ($validUser || $guest) {
	include('pmtc.php');

// Otherwise, allow them to login
} else if (!empty($_POST) && !isset($_POST['logout'])) {

	// User clicked on the button 'login'
	if (isset($_POST['login'])) {

		// Get the entered password
		$pass = "";
		if (isset($_POST['pass'])) { // so that they don't return errors
			$pass = $_POST['pass'];
		}

		// Get the password information
		$pwoptions   = ['cost' => 8,]; // all up to you
		$passhash    = password_hash($pass, PASSWORD_BCRYPT, $pwoptions);  // hash entered pw
		$hashedpass  = file_get_contents("../secured/pass.txt"); // and our stored password

		// Verify the password
		if (password_verify($pass,$hashedpass)) {
			// If verified, allow them to enter
			$_SESSION['user'] = "logged";
			$validUser = TRUE;
			include('pmtc.php');
		} else {
			// If not verified, inform user and increment tries
			echo 'Invalid password!';
			$_SESSION['tries']++;
		}

	// User clicked on the button 'guest'
	} else if (isset($_POST['guest'])) {
		// Allow them to enter as a guest
		//$_SESSION['user'] = "guest";
		//$guest = TRUE;
		//include('pmtc.php');

		// Placeholder: no guests currently
		echo 'Sorry. No Guests';
	} else {

		// Error: Should not reach here
		echo 'Error: Clicked something besides logout or guest';
	}

// Display the login information
} else {
	include_once('menu.php');
	include('login.php');
}

// Display the end page information
include('end.html');

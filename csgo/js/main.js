$(document).ready(function(){
	theme = localStorage.getItem('theme');
	if (theme == null || theme == "") {
		theme = "day";
	}
	$('body').removeClass().addClass(theme);
	$('ul#tabList li').first().removeClass().addClass('btn-game selected');
});

function changeTheme() {
	var currentClass = $("body").attr('class');
	var newClass = "";
	
	switch (currentClass) {
		case "day":
			newClass = "night";
			break;
		case "night":
			newClass = "melon";
			break;
		case "melon":
			newClass = "day";
			break;
	}
	
	// set new class for body
	$("body").removeClass().addClass(newClass);
	
	// save current theme to be used on next load
	localStorage.setItem('theme', newClass);
};

function showPopup(id) {
	$('#'+id).removeClass('hidden');
	$('#fade').removeClass('hidden');
};

function closePopup(id) {
	$('#'+id).addClass('hidden');
	$('#fade').addClass('hidden');
}

/* Close popups on ESC press */
$(document).keyup(function(e){
	if(e.keyCode === 27) {
		console.log("ESC pressed!")
		$(".white_content").not(".hidden").addClass("hidden");
		$("#fade").addClass("hidden");
	}
});

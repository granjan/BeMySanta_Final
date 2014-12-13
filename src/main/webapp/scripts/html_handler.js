function menu_click(id) {

	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;

	if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset + 5);
		// javascript method to remove active from other classes
		document.getElementById(id).className += ' active';
	} else {
		var nums = document.getElementById("menu_ul");
		var listItem = nums.getElementsByTagName("li");

		for (var i = 0; i < listItem.length; i++) {
			listItem[i].classList.remove('active');
		}

		document.getElementById(id).classList.add('active');
	}
};

jQuery("document").ready(function($) {
	var nav = $('.nav-container');
	$(window).scroll(function() {
		if ($(this).scrollTop() > 136) {
			nav.addClass("f-nav");
		} else {
			nav.removeClass("f-nav");
		}
	});
});

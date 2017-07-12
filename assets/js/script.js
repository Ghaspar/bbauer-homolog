$(document).ready(function() {
	
	$('.banner-slick').slick();


	// menu hamburger

	$('#nav-icon1').click(function(){
		$(this).toggleClass('open');

		$('header .menu ul').toggleClass('menu-show');
	});
});

"use strict";
$(document).ready(function(){

	// zurb foundation
	$(document).foundation();

	// section.place
	$('.place-view-content').each(function(){
		var currentPlace = $(this).find('img').attr('src');
		$(this).find('img').hide();
		$(this).find('.place-view-bg').css({'background-image': 'url(../' + currentPlace + ')' });
	});
	$('.place-academy .button').click(function(e){
		e.preventDefault();
		$('.place-academy .button').removeClass('active');
		$(this).addClass('active');
	});

	// viewport
	var virtualViewportWidthPhone = 640;
	var virtualViewportWidthDesktop = 1280;
	var scaleScreen = function(){
		$('html').css('zoom', '1');
		var htmlWidth = $('html').width();
		if ((htmlWidth > 640) && !bowser.ios && !bowser.android) {
			var zoom = htmlWidth/virtualViewportWidthDesktop;
			$('html').css('zoom', zoom);
		} else if ((htmlWidth < 641) && !bowser.ios && !bowser.android) {
			var zoom = htmlWidth/virtualViewportWidthPhone;
			$('html').css('zoom', zoom);
		} else if (htmlWidth < 641) {
			// $('html').css('zoom', '1');
			// $('head').append('<meta name="viewport" content="width=640">');
		};
	};
	scaleScreen();
	$(window).on('resize', function(){
		scaleScreen();
	})
});

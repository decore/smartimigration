// "use strict";
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

	// VIEWPORT
	// https://github.com/gabceb/jquery-browser-plugin
	var htmlWidth = $('html').width();
	var htmlHeight = $('html').height();
	var virtualViewportWidthPhone = 640;
	var virtualViewportWidthDesktop = 1280;
	var virtualViewportWidthMax = 1400;
	// for desktops: virtual viewport
	if ($.browser.desktop) {
		if (!$.browser.mozilla) {
			var scaleScreen = function(){
				$('html').css('zoom', '1');
				htmlWidth = $('html').width();
				if ((htmlWidth > virtualViewportWidthMax) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthMax;
					$('html').css('zoom', zoom);
				} else if ((htmlWidth > virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthDesktop;
					$('html').css('zoom', zoom);
				} else if ((htmlWidth <= virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthPhone;
					$('html').css('zoom', zoom);
				};
			};
		} else {
			var scaleScreen = function(){
				$('html').css({
					'transform': 'scale(1)',
					'margin': 0
				});
				htmlWidth = $('html').width();
				htmlHeight = $('html').height();
				if ((htmlWidth > virtualViewportWidthMax) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthMax;
					$('html').css({
						'transform': 'scale('+zoom+')',
						'margin-left': -virtualViewportWidthMax * (1-zoom) / 2 + "px",
						'margin-right': -virtualViewportWidthMax * (1-zoom) / 2 + "px",
						'margin-top': -htmlHeight * (1-zoom) / 2
					});
				} else if ((htmlWidth > virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthDesktop;
					$('html').css({
						'transform': 'scale('+zoom+')',
						'margin-left': -virtualViewportWidthDesktop * (1-zoom) / 2 + "px",
						'margin-right': -virtualViewportWidthDesktop * (1-zoom) / 2 + "px",
						'margin-top': -htmlHeight * (1-zoom) / 2
					});
				} else if ((htmlWidth <= virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthPhone;
					$('html').css({
						'transform': 'scale('+zoom+')',
						'margin-left': -virtualViewportWidthPhone * (1-zoom) / 2 + "px",
						'margin-right': -virtualViewportWidthPhone * (1-zoom) / 2 + "px",
						'margin-top': -htmlHeight * (1-zoom) / 2
					});
				};
			};
		}
		scaleScreen();
		var resizeTimer = true;
		$(window).on('resize', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(scaleScreen, 100);
		});
	};
	// for phones and tablets: native viewport
	if ($.browser.mobile) {
		$('html').css('min-width', '100vw');
		// for phones
		if (htmlWidth <= virtualViewportWidthPhone) {
			$('meta[name=viewport]').attr('content', 'width=' + virtualViewportWidthPhone);
		// for tablets
		} else {
			$('meta[name=viewport]').attr('content', 'width=' + virtualViewportWidthDesktop);
		};
	};
	// for ie: native viewport
	if ($.browser.msie) {
		$('head').append('<style>@-ms-viewport {width: ' + virtualViewportWidthDesktop + 'px}</style>');
	};
	// END VIEWPORT

	// SCROLL ANIMATION
	// https://github.com/matthieua/WOW
	if (!$.browser.mozilla) {
		setTimeout(function(){
			var wow = new WOW(
				{
					boxClass: 'wow',
					animateClass: 'animated',
					offset: 0,
					callback: function(box) {
						$(box).addClass('activated');
					}
				}
			);
			wow.init();
		}, 1000);
	};
});

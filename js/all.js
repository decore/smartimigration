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
				} else if ((htmlWidth > virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthDesktop;
				} else if ((htmlWidth <= virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthPhone;
				};
				$('html').css('zoom', zoom);
			};
		} else {
			$('body').wrapInner('<div id="zoom-wrap"></div>');
			var viewport;
			var zoom;
			var scaleScreen = function(){
				$('body').css({
					'transform': 'scale(1)',
					'margin': 0
				});
				htmlWidth = $('body').width();
				htmlHeight = $('body').height();
				if ((htmlWidth > virtualViewportWidthMax) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthMax;
					var viewport = virtualViewportWidthMax;
				} else if ((htmlWidth > virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthDesktop;
					var viewport = virtualViewportWidthDesktop;
				} else if ((htmlWidth <= virtualViewportWidthPhone) && !$.browser.msie) {
					var zoom = htmlWidth/virtualViewportWidthPhone;
					var viewport = virtualViewportWidthPhone;
				};
				$('body').css({
					'transform': 'scale('+zoom+')',
					'margin-left': -viewport * (1-zoom) / 2 + "px",
					'margin-right': -viewport * (1-zoom) / 2 + "px",
					'margin-top': -htmlHeight * (1-zoom) / 2,
					'margin-bottom': -htmlHeight * (1-zoom) / 2
				});
				$('#zoom-wrap').css({
					'overflow-y': 'hidden'
				});
			};
		};
		scaleScreen();
		var resizeTimer = true;
		$(window).on('resize', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(scaleScreen, 500);
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
		var wow1 = new WOW(
			{
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,
				mobile: false,
				callback: function(box) {
					$(box).addClass('activated');
				}
			}
		);
		setTimeout(function(){
			wow1.init();
		}, 1000);
	};
	var wow2 = new WOW(
		{
			boxClass: 'wow-footer',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			callback: function(box) {
				$(box).addClass('mozilla activated').appendTo('html');
				$('body').append('<div style="height: 55px" ></div>');
			}
		}
	);
	wow2.init();

	// index-page steps
	$('#to-1-step').click(function(e){
		e.preventDefault();
		$('#1-step').animatescroll();
	});
	$('#1-step .hex-wrap').click(function(){
		$('.place-view').animatescroll();
	});
	$('#2-step .place-academy .button').click(function(e){
		e.preventDefault();
		$('#3-step').removeClass('hide');
		$('#3-step').animatescroll();
	});
	$('#3-step table tbody tr').click(function(){
		$('#4-step').removeClass('hide');
		setTimeout(function(){
			$(window).resize();
		}, 10000);
		$('#4-step').animatescroll();
	});
});

$(document).ready(function(){

	// START parse json feed

	var $content = $('.blog__wrap');
	var data = {
		rss_url: 'https://medium.com/feed/why-we-need-decentralised-poker'
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
		if (response.status == 'ok') {
			var output = '';
			$.each(response.items, function (k, item) {
				var visibleSm;
				if(k < 3) {
				output += '<div class="blog__item item zoomIn wow animated">';
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
				output += '<div class="blog__img"><a href="' + item.link + '"><img src="' + src + '" width="288px" height="240px" style="width:288px"></a></div>';
				output += '<div class="blog__txt">';
				output += '<h3 class="blog__title blue-title"><a href="' + item.link + '">' + item.title + '</a></h3>';
				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
				var maxLength = 120 // maximum number of characters to extract
				//trim the string to the maximum length
				var trimmedString = yourString.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
				output += '<div class="blog__spoiler"><a href="' + item.link + '">' + trimmedString + '...</a></div>';
				output += '</div></div>';
				}
				return k < 2;
			});
			$content.html(output);
			// console.log(output);
		}
	});

	// END parse json feed

	
 	/*кнопка скролл*/
    $('.main-menu__link').click(function(e){
        e.preventDefault();
        var anchor = $(this).attr("href");
        var scroll_el = $(anchor);
        if ($(scroll_el).length != 0) { 
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top}, 250); 
        }
    }); 
	$(window).on('scroll', function(){
		var win = $(window),
			winHeight = win.height(),
			winTop = win.scrollTop() + 10,
			winTopPlus = winTop + 10,
			winBot = winHeight + winTop,
			sections = $('.js-sec'),
			lastSec = sections.eq(sections.length-1),
			levels = $('.main-menu__item'),
			lastSecTop = lastSec.offset().top,
			lastSecBot = lastSecTop + lastSec.height(),
			tops;


		sections.each(function(i){			
			var elemTop = $(this).offset().top;
			if (elemTop < winTopPlus){
				tops = i;					
			}
		});	

		
		if(!(levels.eq(tops).hasClass('active'))){
			levels.eq(tops).addClass('active').siblings().removeClass('active');
		}

		if(winBot >= lastSecBot){
			levels.eq(levels.length-1).addClass('active').siblings().removeClass('active');
		}
	});
	
	/*footer*/
	var footerHeight = $('.fix-contacts').outerHeight(true);	
	$('.contact-booofer').css('height', footerHeight + 'px');
	
	
	/*counters*/
	var time1 = 1,
    	counter1 = 1;

	$(window).scroll(function(){
		$('#js-count-1').each(function(){
			var cPos = $(this).offset().top, // роложение блока со счётчиками
				topWindow = $(window).scrollTop() + $(window).height() - 100;//верх окна + 200рх
			if(cPos < topWindow){
				if(counter1 < 2){
					var i = 0,
						num = $(this).data('num'),//конечная цифра из атрибута data-num
						step = 1000 * time1 / num,//время интервала замены цифр
						that = $(this),
						int = setInterval(function(){
							if (i <= num) {
								that.html(i);
							} else {
								counter1 = counter1 + 2; //увеличение счётчика выполнения программы
								clearInterval(int);
							}
							i++;
						},step);
				}
			}
		});  
	});
	
	
	var time2 = 1,
    	counter2 = 1;

	$(window).scroll(function(){
		$('#js-count-2').each(function(){
			var cPos = $(this).offset().top, // роложение блока со счётчиками
				topWindow = $(window).scrollTop() + $(window).height() - 100;//верх окна + 200рх
			if(cPos < topWindow){
				if(counter2 < 2){
					var i = 0,
						num = $(this).data('num'),//конечная цифра из атрибута data-num
						step = 1000 * time2 / num,//время интервала замены цифр
						that = $(this),
						int = setInterval(function(){
							if (i <= num) {
								that.html(i);
							} else {
								counter2 = counter2 + 2; //увеличение счётчика выполнения программы
								clearInterval(int);
							}
							i=i+2;
						},step);
				}
			}
		});  
	});
});



function preloader(){
	$('#js-preloader').addClass('preloader-out');
		$('body').addClass('louded');
} 
$(window).load( function(){                   
	setTimeout( preloader , 2000);
});
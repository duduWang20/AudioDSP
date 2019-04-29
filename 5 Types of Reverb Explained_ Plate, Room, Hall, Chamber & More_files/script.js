jQuery(function($){
	//sticky header
	$('#top').affix({
		offset: {
			top: 10
		}
	});


	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	$('#bs-navbar')
	.on('show.bs.collapse', function(e) {
		$(e.target).addClass('slidein');
		$('body').addClass('noscroll');
	})
	.on('hide.bs.collapse', function(e) {
		$(e.target).removeClass('slidein');
		$('body').removeClass('noscroll');
	});

	window.sr = ScrollReveal().reveal('.picture-content');

	$(document).on('click', '.navbar-overlay', function(e){
		e.preventDefault();
		$('.navbar-toggle').trigger('click');
	});

	$(document).on('click', '.on-off-switch', function(e){
		e.preventDefault();
		$(this).toggleClass('on');
		$($(this).data('target')).toggleClass('on');
		//$('.switch-chart').children('img').toggleClass('image-off').toggleClass('image-on');
	});

	// http://bxslider.com/options
	$('.quotes-slider .slider').each(function(){
		var slider = $(this).bxSlider({
			minSlides: 1,
			maxSlides: 3,
			pause: 6000,
			auto:true,
			onSlideBefore: function($slideElement, oldIndex, newIndex) {
				var totalSlides = slider.getSlideCount();

				$slideElement
				.addClass('active')
				.siblings('.slide').removeClass('active');

				if(newIndex == totalSlides - 1) {
					$slideElement
					.siblings('.bx-clone.last')
					.addClass('active');
				}

				if(newIndex == 0) {
					$slideElement
					.siblings('.bx-clone.first')
					.addClass('active');
				}
			}
		});

		//reload slider when section is expanded
		$(this).parents('section').on('show.bs.collapse', function () {
			//add timeout to avoid flickering of not initialized slider
			setTimeout(function(){
				slider.reloadSlider();
				slider.goToSlide(0);
			}, 100);
		});
		//just in case timeout fales
		$(this).parents('section').on('shown.bs.collapse', function () {
			slider.reloadSlider();
			slider.goToSlide(0);
		});
	});

	//toggle steps
	$(document).on('click', '.toggle-steps', function(e){
		e.preventDefault();

		var $target = $($(this).attr('href'));

		if(!$target.length) {
			return;
		}
		console.log($target);

		$(this).removeClass('btn-primary').siblings('a').addClass('btn-primary');

		$target.addClass('steps-to-toggle-active').siblings('.steps-to-toggle').removeClass('steps-to-toggle-active');
	})

	$(document).on('click', '.form-subscribe button', function(e){
		e.preventDefault();
		var form = $(this).parents('form:first');
		$.post('/api/subscribe', form.serialize() );
		$(this).replaceWith('<h2 style="color:#fff;">Thank you</h2>');
		$(form).children('input').hide();
        $(form).children('h2').hide().fadeIn();
	})

	$(document).on('submit', '#mic_download', function(e){
		e.preventDefault();
		var self = this;
		$.post('/api/download-mic-profile', $(self).serialize()).done(function(url) {
            var event_fields = [];
            event_fields.push({
                "Name": "MicId",
                "ValueString": $(self).serializeObject().key
            });
            trackCustom("DownloadMicProfile", "Download", "MicProfile", false, event_fields);
			window.location = url;

		}).fail(function(data) {
			$(self).children('.text-danger').text(data.responseText);
		});
	})

	$(document).on('submit', '#headphones_request', function(e){
		e.preventDefault();
		var self = this;

		$(self).children('button').replaceWith('<h2>Thank you</h2>');
		$(self).children('input').hide();
        $(self).children('h2').hide().fadeIn();
	})

	$(document).on('click', '.form-trial button', function(e){
		e.preventDefault();
		var self = this;
		var form = $(this).parents('form:first');
		var type = $(form).children('input[name="type"]').val();
		var pretext = $(this).text();
		$(form).children('.text-danger').text('');
		$(self).html('<i class="fa fa-spinner fa-pulse" aria-hidden="true"></i>');
		$.post('/api/send-trial', form.serialize()).done(function(data) {

			if(type=='truefi'){
				$(self).replaceWith('<p>An activation key has been sent to your email. Please follow instructions in the email.<p>');
				$(".text-muted").html('Success! You will receive the email with a download link and access key within next few days.');
			} else {
				$(form).replaceWith('<div class="notified"><b>An activation email has been sent to your email</b><br>Please follow instructions in the email.</div>').hide().fadeIn();;
			}

			setCookie('signed_up_for_trial', 1, 40);
        	var seg_data = form.serializeObject();
        	seg_data.trial_key = data.trial_key;
		    var i = document.createElement('iframe');
		    i.style.display = 'none';
		    //i.onload = function() { i.parentNode.removeChild(i); };
		    i.src = 'https://www.sonarworks.com/reference';
		    document.body.appendChild(i);

		}).fail(function(data) {
			$(self).html(pretext);

			if(data.status==500) {
				$(form).children('.text-danger').text("Currently service is not available. Come back later please.");
			} else {
				if(type=='truefi'){
					$(form).children('.text-danger').text("You have already requested an access key with this email.");

				} else {
					$(form).children('.text-danger').text(data.responseText);
				}
			}
		});
	})
	$(document).on('click', '#affiliate-form button', function(e){
		e.preventDefault();
		var self = this;
		var form = $(this).parents('form:first');
		var pretext = $(this).text();
		$(form).children('.text-danger').text('');
		$(self).html('<i class="fa fa-spinner fa-pulse" aria-hidden="true"></i>');
		$.post('/api/refersion', form.serialize()).done(function(data) {
			$(form).replaceWith('<div class="notified"><b>You will receive a confirmation email with your unique tracking link.</b></div>').hide().fadeIn();;
		}).fail(function(data) {
			console.log(data);
			$(self).html(pretext);
			if(data.status==500) {
				//$(form).children('.text-danger').text("Currently service is not available. Come back later please.");
			} else {
				$('.text-danger').text("");
				var keys = Object.keys(data.responseJSON);
				for (var i = keys.length - 1; i >= 0; i--) {
					$('.text-danger[data-name="'+keys[i]+'"]').text(data.responseJSON[keys[i]][0]);
				}
			}
		});
	})
	$(document).on('click', '.form-trial-sys button', function(e){
		e.preventDefault();
		var self = this;
		var form = $(this).parents('form:first');
		var type = $(form).children('input[name="type"]').val();
		$(form).children('.text-danger').text('');
		$(self).html('<i class="fa fa-spinner fa-pulse" aria-hidden="true"></i>');

		$.post('/api/send-trial', form.serialize()).done(function(data) {
			$(self).replaceWith('<h4 class="light">The trial key is sent your e-mail.<br>Proceed to <a href="/'+type+'-trial">Download page</a>?</h4>');
			$(form).children('input').hide();
        	$(form).children('h4').hide().fadeIn();
        	var seg_data = form.serializeObject();
        	seg_data.trial_key = data.trial_key;
		}).fail(function(data) {
			$(self).html('Try it now');
			if(data.status==500) {
				$(form).children('.text-danger').text("Currently service is not available. Come back later please.");
			} else {
				$(form).children('.text-danger').text(data.responseText);
			}
		});
	})
});

$(function() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="_token"]').attr('content')
    }
  });
});

var body, search, searchInput, searchReset, searchSpacer, searchCompletion, recommended, searchSubmit;
var canSearch;

function resetDisplay() {
	if(searchInput.val() === '') {
		searchReset.removeClass('enable');
	} else {
		searchReset.addClass('enable');
		searchSubmit.removeAttr('disabled');
		searchReset.removeAttr('disabled');
	}
}

function clearInput() {
	searchInput.val('');
	searchSpacer.text('');
	searchCompletion.text('');
	recommended.addClass('hidden');
	resetDisplay();

}

function searchFocus() {
	search.addClass('enhance');
	$j('.gh-nav-list').addClass('searchOpen');
	setTimeout(function() {
		searchInput.focus();
		canSearch = true;

	}, 300);
}

function searchBlur() {
	clearInput();
	if (search.hasClass('enhance')) {
		search.removeClass('enhance');
		$j('.gh-nav-list').removeClass('searchOpen');
		searchSubmit.attr('disabled', 'disabled');
		searchReset.attr('disabled', 'disabled');
	}
	canSearch = false;
}

function globalNav() {
	if (body.hasClass('gh-show-nav')) {
		body.removeClass('gh-show-nav');
		$j('.subnav').removeClass('hidden');
	} else {
		body.addClass('gh-show-nav');
		$j('#globalheader').addClass('gh-nav-reveal');
		$j('.subnav').addClass('hidden');
	}
}


$j(document).ready(function() {

	body = $j('body');
	search = $j('li.gh-nav-search');
	searchInput = $j('#gh-search-input');
	searchSubmit = $j('#gh-search-submit');
	searchReset = $j('#gh-search-reset');
	searchSpacer = $j('span.spacer');
	searchCompletion = $j('span.completion');
	recommended = $j('.recommended');
	canSearch = false;

	search.click(function() {
		if ($j(window).width() > 1024 && canSearch === false) {
			searchFocus();
		}
	});

	searchInput.keyup(resetDisplay);

	searchReset.click(function(event){
		event.preventDefault();
		clearInput();
		searchFocus();
	});

	/* Enhance Header Nav */
	$j('#gh-menu-icon-toggle').click(globalNav);

	/* Enhance Footer */
	$j('.directorynav .column h3').click(function() {
		if ($j(this).parent().hasClass('enhance')) {
			$j(this).parent().removeClass('enhance');
		} else {
			$j(this).parent().addClass('enhance');
		}
	});


});

$j(window).resize(function() {
	if ($j(window).width() < 1024) {
		searchBlur();
		searchSubmit.removeAttr('disabled');
	} else if ($j(window).width() >= 1024) {
		searchSubmit.attr('disabled', 'disabled');
	}
	if ($j(window).width() >= 768) {
		if ($j('body').hasClass('gh-show-nav')) {
			$j('body').removeClass('gh-show-nav');
		}
		if ($j('.subnav').hasClass('enhance')) {
			$j('.subnav').removeClass('enhance');
		}
	}
});

$j(window).scroll(function() {
	if(window.scrollY) {
		if ($j('body').hasClass('gh-show-nav')) {
			$j('body').removeClass('gh-show-nav');
			$j('.subnav').removeClass('hidden');
		}
		if ($j('.subnav').hasClass('enhance')) {
			$j('.subnav').removeClass('enhance');
		}
	}
});

$j(document).click(function(event) {
	if (canSearch === true) {
		var target = $j(event.target);
		if( !target.is(searchReset) && !target.is(searchInput) && !target.is(search) && !target.is(searchSubmit) ){
			searchBlur();
		}
	}
});

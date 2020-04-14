(function (x) {
	if (!x.cr_track) {
		x.tlitrack = x.cr_track = x.cr_track_id = x.CR_Cookie = x.CR_QS = function () {};
		x.cr_submit = x.cr_link = function () { return true; }
	}
}(window));

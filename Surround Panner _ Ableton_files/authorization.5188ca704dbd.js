window.authorization = window.authorization || {};
window.authorization = (function ($) {
    "use strict";
    var exports = {};

    exports.close = function () {
      $('.overlay, .modal').fadeOut();
    };

    exports.checkStatus = function (licenseId, startTimeStr) {
      var pollTime             = 500,
          maxPollTime          = 12000,
          closeWindowAfterTime = 4000,
          startTime            = new Date(startTimeStr),
          modal                = $('.js-modal');

      function getStatus() {
        $.get('/account/authorize/status/?license=' + licenseId, doCheck);
      }

      function doCheck(lastUnlockTimeStr) {
        var lastUnlockTime = new Date(lastUnlockTimeStr);

        if (isNaN(lastUnlockTime.getTime()) || isNaN(startTime.getTime())) {  // Invalid date
          modal.load('/account/authorize/error/');
        } else if (lastUnlockTime.getTime() > startTime.getTime()) {
          modal.load('/account/authorize/success/');

          window.setTimeout(function () {
                              exports.close();
                            },
                            closeWindowAfterTime);
        } else if (pollTime < maxPollTime)  {
          window.setTimeout(getStatus, pollTime);

          pollTime = pollTime + 1000;
        } else {
          modal.load('/account/authorize/timeout/');
        }
      }

      getStatus();
    };

    $(function () {
      $('.js-authorize').on('click', function (event) {
        event.preventDefault();

        $('<div class="overlay"></div>').appendTo($('body'));
        $('<div class="modal js-modal"></div>').appendTo($('body'));

        $('.js-modal').load($(this).attr('href'));
      });

      $('body').on('click', '.js-close-modal', function (event) {
        event.preventDefault();

        exports.close();
      });
    });

    return exports;
})(window.jQuery);

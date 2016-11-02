/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('arepApp')
    .constant('moment', moment)
    .constant('firebaseRef', 'https://arepapp-358ea.firebaseio.com');

})();

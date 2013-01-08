/*global define:false */

define(["knockout", "TwitterApi", "TwitterListViewModel"], function(ko, TwitterApi, TwitterListViewModel) {
  /**
   * Main application class that runs everything
   */
    var self = this;

    /**
     * simple init method to do everything that matters.
     * @param  {object} config holds any configurable settings
     */
    self.init = function(config){
      var options = {};
      options.twitterApi = new TwitterApi(config);
      options.config = config;
      ko.applyBindings(new TwitterListViewModel(options));
    };

    return {
      init : self.init
    };
});
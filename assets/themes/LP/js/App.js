/*global console:false moment:false */

(function() {
  
  /**
   * Main application class that runs everything
   */
  function App() {
    var self = this;

    /**
     * simple init method to do everything that matters.
     * @param  {object} config holds any configurable settings
     */
    self.init = function(config){
      var options = {};
      options.twitterApi = new window.TwitterApi(config);
      options.config = config;
      ko.applyBindings(new window.LP.TwitterListViewModel(options));
    };
  }

  window.LP.App = App;
}());
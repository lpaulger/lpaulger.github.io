(function(){
  /**
   * Simple javascript API class that handles requests to twitter API
   * @param {object} config holds any configurable values used within the api
   */
  function TwitterApi(config){
    var self = this;

    self.url = config.twitter.baseUrl;
    self.username = config.twitter.username;

    /**
     * returns most recent user tweets
     * @return {[type]}
     */
    self.getRecentPosts = function(options){
      var count = options.count;
      var url = self.url + '/statuses/user_timeline.json?screen_name=' + self.username + '&count=' + count + '&callback=?'
      return $.ajax({
        url: url,
        dataType : "json",  
        timeout:15000
      });
    }
  }

  window.App.TwitterApi = TwitterApi;
}());
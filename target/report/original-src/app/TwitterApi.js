/*global define:false */
define(['jquery'], function($){
  /**
   * Simple javascript API class that handles requests to twitter API
   * @param {object} config holds any configurable values used within the api
   */
  function TwitterApi(config) {
    var self = this;

    self.url = config.twitter.baseUrl;
    self.username = config.twitter.username;

    /**
     * returns most recent user tweets
     * @return {Tweets}
     */
    self.getRecentPosts = function(options) {

      var count = options.count;

      return $.ajax({
        url: self.url + '/statuses/user_timeline.json?',
        data: {
          'screen_name': self.username,
          'count': count
        },
        dataType: "jsonp",
        timeout: 15000
      });
    };
  }

  return TwitterApi;

});
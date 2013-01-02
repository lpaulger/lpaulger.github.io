(function(){
  /**
   * Simple javascript API class that handles requests to twitter API
   * @param {object} config holds any configurable values used within the api
   */
  function init(config){
    var self = this;
    self.twitterApi = new window.App.TwitterApi(config);

    self.twitterApi.getRecentPosts({
      count: 4
    }).done(function(data){
      console.log(data);
    }).fail(function(e){
      console.log('error: ');
      console.log(data);
    });
  }

  window.App.init = init;
}());
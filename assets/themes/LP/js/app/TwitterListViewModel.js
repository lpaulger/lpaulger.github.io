/*global console:false moment:false */

(function() {
  function TwitterListViewModel(options) {
    var self = this;
    var twitterApi = options.twitterApi;
    var config = options.config;

    self.currentTweets = ko.observableArray([]);
    //self.currentCountOfTweets = ko.observable(config.twitter.recentCount);
    
    
    // The active user tweets are (asynchronously) computed
    ko.computed(function() {
      twitterApi.getRecentPosts({
        count: config.twitter.recentCount
      }).pipe(function(data) {
        var tweets = [];
        $.each(data, function(index, value) {
          value.created_at = moment(value.created_at).fromNow();
          value.text = value.text.parseURL().parseUsername().parseHashtag();
          tweets.push(value);
        });
        self.currentTweets(data);
      }).done(function(data) {
        $('.tweets').fadeIn('slow');
      }).fail(function(e) {
        console.log('error: ');
        console.log(e);
      });
    }, this);
  }

  window.LP.TwitterListViewModel = TwitterListViewModel;
}());
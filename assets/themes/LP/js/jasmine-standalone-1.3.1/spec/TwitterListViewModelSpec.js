describe("TwitterListViewModel", function() {
  var tweetsData = [];
  var options = {
    twitterApi: {
      getRecentPosts: function() {
        return new jQuery.Deferred().resolve(tweetsData);
      }
    },
    config: {
      twitter: {
        recentCount: 3
      }
    }
  },
    twitterListViewModel;

  describe("when creating a TwitterListViewModel", function() {

    it("should have a currentTweets observableArray", function() {
      expect(twitterListViewModel.currentTweets()).not.toBeUndefined();
    });

    describe("and tweetsData is returned", function() {
      tweetsData = [{
        text: 'tweet1',
        created_at: 'a few seconds ago'
      }, {
        text: 'tweet2',
        created_at: 'a few seconds ago'
      }];

      twitterListViewModel = new window.LP.TwitterListViewModel(options);

      it("should set currentTweets to returnedTweets", function() {
        expect(twitterListViewModel.currentTweets()).toEqual(tweetsData);
      });
    });

    describe("and no tweetsData is returned", function() {
      tweetsData = [];

      twitterListViewModel = new window.LP.TwitterListViewModel(options);

      it("should ensure currentTweets has no tweets", function() {
        expect(twitterListViewModel.currentTweets().length).toEqual(0);
      });
    });
  });
});
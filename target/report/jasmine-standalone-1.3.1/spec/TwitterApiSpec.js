describe("TwitterApi", function() {
  var twitterApi, config = {
    twitter: {
      baseUrl: 'https://api.twitter.com/1',
      username: 'lmpaulger',
      recentCount: 5
    }
  };

  describe("when creating TwitterApi", function(){
    it("should set the properties", function() {
      twitterApi = new window.TwitterApi(config);

      expect(twitterApi.username).toEqual(config.twitter.username);
      expect(twitterApi.url).toEqual(config.twitter.baseUrl);
    });
  });

  describe("When getting Recent Posts", function() {
    var returnedObj;
    beforeEach(function() {
      spyOn(twitterApi, 'getRecentPosts');
    });

    it("should make the getRecentPosts api call", function() {

      twitterApi.getRecentPosts({
        count: 3
      });

      expect(twitterApi.getRecentPosts).toHaveBeenCalled();

    });

    describe("and user is invalid", function() {
      var tempConfig = config;
      var errorData = {
        "errors": [{
          "message": "Sorry, that page does not exist",
          "code": 34
        }]
      };
      var response;
      var fakeUsername = 'qe123123123asdasdaFAKE';
      beforeEach(function() {
        config.twitter.username = fakeUsername;
        twitterApi = new window.TwitterApi(config);
        spyOn(twitterApi, 'getRecentPosts').andReturn(errorData);
        response = twitterApi.getRecentPosts({
          count: 3
        });
      });

      it("should set the invalid username", function() {
        expect(twitterApi.username).toEqual(fakeUsername);
      });

      it("should return the errorData", function() {
        expect(response).toEqual(errorData);
      });

      afterEach(function() {
        config = tempConfig;
      });
    });

    describe("and user is valid", function() {
      var tweetsData = [{
        text: 'tweet1'
      }, {
        text: 'tweet2'
      }];
      beforeEach(function() {
        twitterApi = new window.TwitterApi(config);
        spyOn(twitterApi, 'getRecentPosts').andReturn(tweetsData);
        response = twitterApi.getRecentPosts({
          count: 3
        });
      });

      it("should return the tweetsData", function(){
        expect(response).toEqual(tweetsData);
      });
    });
  });
});
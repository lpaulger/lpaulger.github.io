/*global require:false */

require.config({
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
    knockout: '../lib/knockout-2.2.0',
    moment: '../lib/moment.min'
  }
});

require(["App", "namespaces"], function(App) {
    var config = {
    twitter : {
      baseUrl : 'https://api.twitter.com/1',
      username : 'lmpaulger',
      recentCount : 5
    }
  };
  
  new App.init(config);
});
$(document).ready(function(){
  var config = {
    twitter : {
      baseUrl : 'https://api.twitter.com/1',
      username : 'lmpaulger',
      recentCount : 5
    }
  };
  
  new window.LP.App().init(config);
});
function BranchData() {
    this.position = -1;
    this.nodeLength = -1;
    this.src = null;
    this.evalFalse = 0;
    this.evalTrue = 0;

    this.init = function(position, nodeLength, src) {
        this.position = position;
        this.nodeLength = nodeLength;
        this.src = src;
        return this;
    }

    this.ranCondition = function(result) {
        if (result)
            this.evalTrue++;
        else
            this.evalFalse++;
    };

    this.pathsCovered = function() {
        var paths = 0;
        if (this.evalTrue > 0)
          paths++;
        if (this.evalFalse > 0)
          paths++;
        return paths;
    };

    this.covered = function() {
        return this.evalTrue > 0 && this.evalFalse > 0;
    };

    this.toJSON = function() {
        return '{"position":' + this.position
            + ',"nodeLength":' + this.nodeLength
            + ',"src":' + jscoverage_quote(this.src)
            + ',"evalFalse":' + this.evalFalse
            + ',"evalTrue":' + this.evalTrue + '}';
    };

    this.message = function() {
        if (this.evalTrue === 0 && this.evalFalse === 0)
            return 'Condition never evaluated         :\t' + this.src;
        else if (this.evalTrue === 0)
            return 'Condition never evaluated to true :\t' + this.src;
        else if (this.evalFalse === 0)
            return 'Condition never evaluated to false:\t' + this.src;
        else
            return 'Condition covered';
    };
}

BranchData.fromJson = function(jsonString) {
    var json = eval('(' + jsonString + ')');
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

BranchData.fromJsonObject = function(json) {
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

function buildBranchMessage(conditions) {
    var message = 'The following was not covered:';
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i] !== undefined && conditions[i] !== null && !conditions[i].covered())
          message += '\n- '+ conditions[i].message();
    }
    return message;
};

function convertBranchDataConditionArrayToJSON(branchDataConditionArray) {
    var array = [];
    var length = branchDataConditionArray.length;
    for (var condition = 0; condition < length; condition++) {
        var branchDataObject = branchDataConditionArray[condition];
        if (branchDataObject === undefined || branchDataObject === null) {
            value = 'null';
        } else {
            value = branchDataObject.toJSON();
        }
        array.push(value);
    }
    return '[' + array.join(',') + ']';
}

function convertBranchDataLinesToJSON(branchData) {
    if (branchData === undefined) {
        return '[]'
    }
    var array = [];
    var length = branchData.length;
    for (var line = 0; line < length; line++) {
        var branchDataObject = branchData[line];
        if (branchDataObject === undefined || branchDataObject === null) {
            value = 'null';
        } else {
            value = convertBranchDataConditionArrayToJSON(branchDataObject);
        }
        array.push(value);
    }
    return '[' + array.join(',') + ']';
}

function convertBranchDataLinesFromJSON(jsonObject) {
    if (jsonObject === undefined) {
        return [];
    }
    var length = jsonObject.length;
    for (var line = 0; line < length; line++) {
        var branchDataJSON = jsonObject[line];
        if (branchDataJSON !== null) {
            for (var conditionIndex = 0; conditionIndex < branchDataJSON.length; conditionIndex ++) {
                var condition = branchDataJSON[conditionIndex];
                if (condition !== null) {
                    branchDataJSON[conditionIndex] = BranchData.fromJsonObject(condition);
                }
            }
        }
    }
    return jsonObject;
}
function jscoverage_quote(s) {
  return '"' + s.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g, function (c) {
    switch (c) {
    case '\b':
      return '\\b';
    case '\f':
      return '\\f';
    case '\n':
      return '\\n';
    case '\r':
      return '\\r';
    case '\t':
      return '\\t';
    // IE doesn't support this
    /*
    case '\v':
      return '\\v';
    */
    case '"':
      return '\\"';
    case '\\':
      return '\\\\';
    default:
      return '\\u' + jscoverage_pad(c.charCodeAt(0).toString(16));
    }
  }) + '"';
}

function jscoverage_html_escape(s) {
    return s.replace(/[<>\&\"\']/g, function(c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    this._$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (! this._$jscoverage) {
  this._$jscoverage = {};
}
if (! _$jscoverage['app/TwitterListViewModel.js']) {
  _$jscoverage['app/TwitterListViewModel.js'] = {};
  _$jscoverage['app/TwitterListViewModel.js'].lineData = [];
  _$jscoverage['app/TwitterListViewModel.js'].lineData[2] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[3] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[4] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[5] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[6] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[8] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[13] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[17] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[18] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[19] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[20] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[21] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[23] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[25] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[26] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[27] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[28] = 0;
  _$jscoverage['app/TwitterListViewModel.js'].lineData[33] = 0;
}
if (! _$jscoverage['app/TwitterListViewModel.js'].branchData) {
  _$jscoverage['app/TwitterListViewModel.js'].branchData = [];
}
_$jscoverage['app/TwitterListViewModel.js'].lineData[2]++;
define(['jquery', 'knockout', 'moment', 'String.extend'], function($, ko, moment) {
  _$jscoverage['app/TwitterListViewModel.js'].lineData[3]++;
  function TwitterListViewModel(options) {
    _$jscoverage['app/TwitterListViewModel.js'].lineData[4]++;
    var self = this;
    _$jscoverage['app/TwitterListViewModel.js'].lineData[5]++;
    var twitterApi = options.twitterApi;
    _$jscoverage['app/TwitterListViewModel.js'].lineData[6]++;
    var config = options.config;
    _$jscoverage['app/TwitterListViewModel.js'].lineData[8]++;
    self.currentTweets = ko.observableArray([]);
    _$jscoverage['app/TwitterListViewModel.js'].lineData[13]++;
    ko.computed(function() {
  _$jscoverage['app/TwitterListViewModel.js'].lineData[26]++;
  twitterApi.getRecentPosts({
  count: config.twitter.recentCount}).pipe(function(data) {
  _$jscoverage['app/TwitterListViewModel.js'].lineData[17]++;
  var tweets = [];
  _$jscoverage['app/TwitterListViewModel.js'].lineData[18]++;
  $.each(data, function(index, value) {
  _$jscoverage['app/TwitterListViewModel.js'].lineData[19]++;
  value.created_at = moment(value.created_at).fromNow();
  _$jscoverage['app/TwitterListViewModel.js'].lineData[20]++;
  value.text = value.text.parseURL().parseUsername().parseHashtag();
  _$jscoverage['app/TwitterListViewModel.js'].lineData[21]++;
  tweets.push(value);
});
  _$jscoverage['app/TwitterListViewModel.js'].lineData[23]++;
  self.currentTweets(data);
}).done(function(data) {
  _$jscoverage['app/TwitterListViewModel.js'].lineData[25]++;
  $('.tweets').fadeIn('slow');
}).fail(function(e) {
  _$jscoverage['app/TwitterListViewModel.js'].lineData[27]++;
  console.log('error: ');
  _$jscoverage['app/TwitterListViewModel.js'].lineData[28]++;
  console.log(e);
});
}, this);
  }
  _$jscoverage['app/TwitterListViewModel.js'].lineData[33]++;
  return TwitterListViewModel;
});

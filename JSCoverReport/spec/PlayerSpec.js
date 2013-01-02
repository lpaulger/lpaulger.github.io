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
if (! _$jscoverage['spec/PlayerSpec.js']) {
  _$jscoverage['spec/PlayerSpec.js'] = {};
  _$jscoverage['spec/PlayerSpec.js'].lineData = [];
  _$jscoverage['spec/PlayerSpec.js'].lineData[1] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[2] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[3] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[5] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[6] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[7] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[10] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[11] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[12] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[15] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[18] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[19] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[20] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[21] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[24] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[25] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[28] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[31] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[32] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[33] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[34] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[39] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[40] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[42] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[43] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[45] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[49] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[50] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[51] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[54] = 0;
  _$jscoverage['spec/PlayerSpec.js'].lineData[55] = 0;
}
_$jscoverage['spec/PlayerSpec.js'].lineData[1]++;
describe("Player", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[2]++;
  var player;
  _$jscoverage['spec/PlayerSpec.js'].lineData[3]++;
  var song;
  _$jscoverage['spec/PlayerSpec.js'].lineData[5]++;
  beforeEach(function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[6]++;
  player = new Player();
  _$jscoverage['spec/PlayerSpec.js'].lineData[7]++;
  song = new Song();
});
  _$jscoverage['spec/PlayerSpec.js'].lineData[10]++;
  it("should be able to play a Song", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[11]++;
  player.play(song);
  _$jscoverage['spec/PlayerSpec.js'].lineData[12]++;
  expect(player.currentlyPlayingSong).toEqual(song);
  _$jscoverage['spec/PlayerSpec.js'].lineData[15]++;
  expect(player).toBePlaying(song);
});
  _$jscoverage['spec/PlayerSpec.js'].lineData[18]++;
  describe("when song has been paused", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[19]++;
  beforeEach(function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[20]++;
  player.play(song);
  _$jscoverage['spec/PlayerSpec.js'].lineData[21]++;
  player.pause();
});
  _$jscoverage['spec/PlayerSpec.js'].lineData[24]++;
  it("should indicate that the song is currently paused", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[25]++;
  expect(player.isPlaying).toBeFalsy();
  _$jscoverage['spec/PlayerSpec.js'].lineData[28]++;
  expect(player).not.toBePlaying(song);
});
  _$jscoverage['spec/PlayerSpec.js'].lineData[31]++;
  it("should be possible to resume", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[32]++;
  player.resume();
  _$jscoverage['spec/PlayerSpec.js'].lineData[33]++;
  expect(player.isPlaying).toBeTruthy();
  _$jscoverage['spec/PlayerSpec.js'].lineData[34]++;
  expect(player.currentlyPlayingSong).toEqual(song);
});
});
  _$jscoverage['spec/PlayerSpec.js'].lineData[39]++;
  it("tells the current song if the user has made it a favorite", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[40]++;
  spyOn(song, 'persistFavoriteStatus');
  _$jscoverage['spec/PlayerSpec.js'].lineData[42]++;
  player.play(song);
  _$jscoverage['spec/PlayerSpec.js'].lineData[43]++;
  player.makeFavorite();
  _$jscoverage['spec/PlayerSpec.js'].lineData[45]++;
  expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
});
  _$jscoverage['spec/PlayerSpec.js'].lineData[49]++;
  describe("#resume", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[50]++;
  it("should throw an exception if song is already playing", function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[51]++;
  player.play(song);
  _$jscoverage['spec/PlayerSpec.js'].lineData[55]++;
  expect(function() {
  _$jscoverage['spec/PlayerSpec.js'].lineData[54]++;
  player.resume();
}).toThrow("song is already playing");
});
});
});

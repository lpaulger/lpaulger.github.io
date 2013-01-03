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
if (! _$jscoverage['knockout-2.2.0.js']) {
  _$jscoverage['knockout-2.2.0.js'] = {};
  _$jscoverage['knockout-2.2.0.js'].lineData = [];
  _$jscoverage['knockout-2.2.0.js'].lineData[5] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[6] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[7] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[8] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[9] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[10] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[11] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[12] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[13] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[14] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[15] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[16] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[17] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[18] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[19] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[20] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[21] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[22] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[23] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[24] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[25] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[26] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[27] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[28] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[29] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[30] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[31] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[32] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[33] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[34] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[35] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[36] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[37] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[38] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[39] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[40] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[41] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[42] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[43] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[44] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[45] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[46] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[47] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[48] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[49] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[50] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[51] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[52] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[53] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[54] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[55] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[56] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[57] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[58] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[59] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[60] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[61] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[62] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[63] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[64] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[65] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[66] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[67] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[68] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[69] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[70] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[71] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[72] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[73] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[74] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[75] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[76] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[77] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[78] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[79] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[80] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[81] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[82] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[83] = 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[84] = 0;
}
if (! _$jscoverage['knockout-2.2.0.js'].branchData) {
  _$jscoverage['knockout-2.2.0.js'].branchData = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[6] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[6][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[6][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[7][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[7][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[8][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[8][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[9][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[9][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[10][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[10][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[11][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[11][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[12][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[12][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[13] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[13][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[13][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[13][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[13][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[13][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[13][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[13][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[14][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][16] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][17] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][18] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[14][19] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[15][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[15][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[16] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[16][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[16][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[16][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[16][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[16][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[16][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[16][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[17] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[17][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[17][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[17][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[17][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[17][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[17][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[18][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[18][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[19] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[19][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[19][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[19][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[19][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[19][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[19][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[19][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[20][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[20][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[21][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[21][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[22] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[22][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[22][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[22][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[22][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[22][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[22][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[22][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[23][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[23][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[24][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[24][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[25][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[25][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[26][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[26][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[29][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[29][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[30][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[30][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[31][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[31][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[32] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[32][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[32][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[32][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[32][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[32][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[32][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[32][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[33][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[33][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[34] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[34][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[34][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[34][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[34][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[34][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[35] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[35][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[35][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[35][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[35][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[36] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[36][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[37][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[37][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[38][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[38][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[39] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[39][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[39][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[39][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[39][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[40][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][16] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][17] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][18] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][19] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][20] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][21] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[40][22] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[41][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[41][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[42] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[42][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[42][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[42][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[42][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[42][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[42][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[43] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[43][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[43][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[43][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[43][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[43][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[43][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[43][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[44][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[44][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[45][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[45][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[46] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[46][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[46][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[46][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[46][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[46][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[47] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[47][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[47][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[47][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[47][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[48][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[48][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[49][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[49][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[50][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[50][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[51][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[51][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[52] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[52][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[52][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[52][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[52][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[53] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[53][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[53][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[53][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[53][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[54][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[54][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[55] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[55][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[55][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[55][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[56] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[56][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[56][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[57] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[57][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[57][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[57][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[58][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[58][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[59][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[59][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[60][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[60][16] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[61][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[61][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[62][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[62][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[63] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[63][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[64] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[64][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[64][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[65][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[65][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[66][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[66][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[67] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[67][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[67][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[67][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[67][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[67][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[67][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[67][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[68][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[68][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[69][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[69][16] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[70][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][16] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[70][17] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[71] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[71][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[71][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[71][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[71][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[71][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[71][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[72] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[72][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[73] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[73][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[73][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[73][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[73][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[73][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[74] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[74][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[74][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[74][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[74][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[74][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[74][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[74][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[75][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[75][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[76][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[76][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[77][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[77][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[78][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][10] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][11] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][12] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][13] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][14] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][15] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[78][16] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[79][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[79][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[80][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[80][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[81] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[81][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[81][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[81][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[81][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[81][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[81][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[82][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[82][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[83] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[83][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[83][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[83][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[83][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84] = [];
  _$jscoverage['knockout-2.2.0.js'].branchData[84][1] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][2] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][3] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][4] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][5] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][6] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][7] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][8] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][9] = new BranchData();
  _$jscoverage['knockout-2.2.0.js'].branchData[84][10] = new BranchData();
}
_$jscoverage['knockout-2.2.0.js'].branchData[84][10].init(40699, 26, '"function" === typeof define');
function visit714_84_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][9].init(40699, 38, '"function" === typeof define && define.amd');
function visit713_84_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][8].init(40674, 23, 'module.exports || exports');
function visit712_84_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][7].init(40647, 24, '"object" === typeof module');
function visit711_84_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][6].init(40620, 25, '"object" === typeof exports');
function visit710_84_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][5].init(40620, 51, '"object" === typeof exports && "object" === typeof module');
function visit709_84_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][4].init(40591, 27, '"function" === typeof require');
function visit708_84_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][3].init(40591, 80, '"function" === typeof require && "object" === typeof exports && "object" === typeof module');
function visit707_84_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][2].init(40373, 6, '0 < v.Cb');
function visit706_84_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[84][1].init(40373, 15, '0 < v.Cb && b.va(v)');
function visit705_84_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[84][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[83][4].init(793, 3, '0 < a');
function visit704_83_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[83][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[83][3].init(793, 105, '0 < a && (E.tmpl.tag.ko_code = {\n  open: "__.push($1 || \'\');"} , E.tmpl.tag.ko_with = {\n  open: "with($1) {", \n  close: "} "})');
function visit703_83_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[83][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[83][2].init(150, 12, 'b.text() || ""');
function visit702_83_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[83][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[83][1].init(144, 113, 'f || (f = b.text() || "" , f = E.template(n, "{{ko_with $item.koBindingContext}}" + f + "{{/ko_with}}") , b.data("precompiled", f))');
function visit701_83_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[83][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][9].init(39644, 3, '2 > a');
function visit700_82_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][8].init(39644, 105, '2 > a && i(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."))');
function visit699_82_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][7].init(39638, 5, 'e || {}');
function visit698_82_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][6].init(39514, 48, '0 <= E.tmpl.tag.tmpl.open.toString().indexOf("__")');
function visit697_82_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][5].init(39467, 21, '"undefined" == typeof E');
function visit696_82_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][4].init(39467, 30, '"undefined" == typeof E || !E.tmpl');
function visit695_82_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][3].init(39292, 1, 'd');
function visit694_82_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][2].init(39259, 7, '9 > b.a.Z');
function visit693_82_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[82][1].init(39257, 19, '!(9 > b.a.Z) && a.nodes');
function visit692_82_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[82][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[81][6].init(927, 27, 'f && (f(s.U, s.M, s.ma) , s.zb = l)');
function visit691_81_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[81][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[81][5].init(920, 34, '!s.zb && f && (f(s.U, s.M, s.ma) , s.zb = l)');
function visit690_81_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[81][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[81][4].init(899, 5, 'p !== j');
function visit689_81_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[81][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[81][3].init(899, 20, 'p !== j && b.e.Oa(a, p, G)');
function visit688_81_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[81][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[81][2].init(820, 37, 's.M || b.a.extend(s, ga(a, c, s.U, f, s.ma))');
function visit687_81_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[81][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[81][1].init(61, 11, 'j || (m[C] = s)');
function visit686_81_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[81][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][9].init(640, 5, 'D !== H');
function visit685_80_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][8].init(550, 34, 'e.beforeRemove && (d[C] = s , z.push(s))');
function visit684_80_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][7].init(514, 12, 's.j && s.j.B()');
function visit683_80_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][6].init(499, 5, 'D === H');
function visit682_80_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][5].init(499, 86, 'D === H && (s = k[u] , s.j && s.j.B() , A.push.apply(A, L(s.M)) , e.beforeRemove && (d[C] = s , z.push(s)))');
function visit681_80_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][4].init(277, 71, 'b.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || []');
function visit680_80_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][3].init(203, 71, 'b.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === H');
function visit679_80_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][2].init(195, 5, 'e || {}');
function visit678_80_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[80][1].init(187, 5, 'd || []');
function visit677_80_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[80][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][8].init(38128, 48, 'c[d] && b.a.o(c[d].M, function(b) {\n  _$jscoverage[\'knockout-2.2.0.js\'].lineData[80]++;\n  a(b, d, c[d].U);\n})');
function visit676_79_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][7].init(38120, 3, 'd < e');
function visit675_79_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][6].init(38095, 1, 'a');
function visit674_79_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][5].init(38023, 5, 'v !== b');
function visit673_79_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][4].init(38023, 15, 'v !== b && (y[a] = s)');
function visit672_79_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][3].init(37865, 18, 'a.length <= b.length');
function visit671_79_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][2].init(37852, 5, 'b || []');
function visit670_79_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[79][1].init(37844, 5, 'a || []');
function visit669_79_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[79][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][16].init(8, 11, '1 == a.length');
function visit668_78_16(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][16].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][15].init(7, 25, '1 == a.length && a[0].unknown');
function visit667_78_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][14].init(-1, 45, '1 == a.length && a[0].unknown || b.g.Db(a, "name")');
function visit666_78_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][13].init(433, 9, 'f && f.oa()');
function visit665_78_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][12].init(354, 22, '"function" == typeof g.B');
function visit664_78_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][11].init(354, 29, '"function" == typeof g.B && g.B()');
function visit663_78_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][10].init(300, 83, '(g = b.a.f.get(a, "__ko__templateComputedDomDataKey__")) && "function" == typeof g.B && g.B()');
function visit662_78_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][9].init(273, 4, 'd || a');
function visit661_78_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][8].init(12, 12, 'e && c.foreach');
function visit660_78_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][7].init(195, 16, 'e && c.foreach || []');
function visit659_78_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][6].init(190, 4, 'd || a');
function visit658_78_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][5].init(119, 32, '"ifnot" in c && (e = !b.a.d(c.ifnot))');
function visit657_78_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][4].init(116, 35, 'e && "ifnot" in c && (e = !b.a.d(c.ifnot))');
function visit656_78_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][3].init(87, 28, '"if" in c && (e = b.a.d(c["if"]))');
function visit655_78_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][2].init(53, 18, '"string" != typeof d');
function visit654_78_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[78][1].init(53, 115, '"string" != typeof d && (c = d , d = c.name , "if" in c && (e = b.a.d(c["if"])) , e && "ifnot" in c && (e = !b.a.d(c.ifnot)) , g = b.a.d(c.data))');
function visit653_78_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[78][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][15].init(36985, 13, '1 == a.nodeType');
function visit652_77_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][14].init(36968, 13, '8 == a.nodeType');
function visit651_77_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][13].init(36953, 13, '1 == a.nodeType');
function visit650_77_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][12].init(36953, 28, '1 == a.nodeType || 8 == a.nodeType');
function visit649_77_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][11].init(36943, 39, '!c.name && (1 == a.nodeType || 8 == a.nodeType)');
function visit648_77_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][10].init(36923, 18, '"string" != typeof c');
function visit647_77_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][9].init(36923, 59, '"string" != typeof c && !c.name && (1 == a.nodeType || 8 == a.nodeType)');
function visit646_77_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][8].init(339, 5, 'a === n');
function visit645_77_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][7].init(339, 25, 'a === n || !b.a.d(a._destroy)');
function visit644_77_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][6].init(332, 5, 'a === H');
function visit643_77_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][5].init(332, 32, 'a === H || a === n || !b.a.d(a._destroy)');
function visit642_77_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][4].init(312, 52, 'c.includeDestroyed || a === H || a === n || !b.a.d(a._destroy)');
function visit641_77_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][3].init(244, 28, '"undefined" == typeof a.length');
function visit640_77_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][2].init(244, 37, '"undefined" == typeof a.length && (a = [a])');
function visit639_77_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[77][1].init(231, 12, 'b.a.d(d) || []');
function visit638_77_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[77][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][11].init(36592, 20, '"function" == typeof a');
function visit637_76_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][10].init(36487, 33, 'c.afterRender && c.afterRender(b, a)');
function visit636_76_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][9].init(336, 16, '"replaceNode" == f');
function visit635_76_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][8].init(333, 19, 'g && "replaceNode" == f');
function visit634_76_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][7].init(316, 13, '!g || !b.a.X(g)');
function visit633_76_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][6].init(261, 16, '"replaceNode" == f');
function visit632_76_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][5].init(261, 30, '"replaceNode" == f && (e = h , g = M(e))');
function visit631_76_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][4].init(210, 20, '"function" == typeof a');
function visit630_76_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][3].init(168, 19, 'd && d instanceof b.z');
function visit629_76_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][2].init(126, 1, 'e');
function visit628_76_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[76][1].init(102, 20, 'f || "replaceChildren"');
function visit627_76_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[76][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][9].init(36021, 19, 'c.templateEngine || N');
function visit626_75_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][8].init(36021, 23, '(c.templateEngine || N) == H');
function visit625_75_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][7].init(36021, 88, '(c.templateEngine || N) == H && i(Error("Set a template engine before calling renderTemplate"))');
function visit624_75_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][6].init(36014, 5, 'c || {}');
function visit623_75_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][5].init(35898, 83, '!(a instanceof b.v) && i(Error("templateEngine must inherit from ko.templateEngine"))');
function visit622_75_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][4].init(35892, 4, 'a != H');
function visit621_75_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][3].init(35892, 89, 'a != H && !(a instanceof b.v) && i(Error("templateEngine must inherit from ko.templateEngine"))');
function visit620_75_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][2].init(64, 44, 'b.a.f.get(this.h, "__ko_anon_template__") || {}');
function visit619_75_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[75][1].init(37, 19, '0 == arguments.length');
function visit618_75_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[75][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[74][7].init(35481, 27, 'a.ia && (a.za = a.ia.innerHTML)');
function visit617_74_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[74][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[74][6].init(35471, 8, 'a.za === H');
function visit616_74_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[74][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[74][5].init(35471, 37, 'a.za === H && a.ia && (a.za = a.ia.innerHTML)');
function visit615_74_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[74][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[74][4].init(35426, 44, 'b.a.f.get(this.h, "__ko_anon_template__") || {}');
function visit614_74_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[74][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[74][3].init(35399, 19, '0 == arguments.length');
function visit613_74_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[74][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[74][2].init(35184, 20, '1 === arguments.length');
function visit612_74_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[74][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[74][1].init(138, 15, '"innerHTML" === a');
function visit611_74_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[74][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[73][5].init(35044, 19, '0 == arguments.length');
function visit610_73_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[73][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[73][4].init(35006, 14, '"textarea" === a');
function visit609_73_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[73][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[73][3].init(34986, 12, '"script" === a');
function visit608_73_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[73][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[73][2].init(286, 38, 'd.nextSibling && b.Ea(d.nextSibling, a, c)');
function visit607_73_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[73][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[73][1].init(17, 83, 'd.isTemplateRewritten(a, c) || d.rewriteTemplate(a, function(a) {\n  return b.ya.Fb(a, d);\n}, c)');
function visit606_73_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[73][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[72][1].init(34147, 31, 'this.allowTemplateRewriting === q');
function visit605_72_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[72][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[71][6].init(33898, 13, '8 == a.nodeType');
function visit604_71_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[71][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[71][5].init(33883, 13, '1 == a.nodeType');
function visit603_71_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[71][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[71][4].init(33883, 28, '1 == a.nodeType || 8 == a.nodeType');
function visit602_71_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[71][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[71][3].init(33813, 46, 'c || i(Error("Cannot find template with ID " + a))');
function visit601_71_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[71][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[71][2].init(33786, 4, 'd || x');
function visit600_71_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[71][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[71][1].init(33760, 18, '"string" == typeof a');
function visit599_71_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[71][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][17].init(33346, 27, 'e && (a.style.display = "none")');
function visit598_70_17(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][17].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][16].init(33342, 31, '!c && e && (a.style.display = "none")');
function visit597_70_16(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][16].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][15].init(33317, 5, 'c && !e');
function visit596_70_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][14].init(33293, 23, '"none" != a.style.display');
function visit595_70_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][13].init(686, 10, '0 < a.length');
function visit594_70_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][12].init(686, 21, '0 < a.length && da(a, e, q)');
function visit593_70_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][11].init(683, 24, 'c && 0 < a.length && da(a, e, q)');
function visit592_70_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][10].init(663, 18, 'c && setTimeout(f, 0)');
function visit591_70_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][9].init(630, 52, 'g && (f = function() {\n  b.k.T(a, e);\n} , f() , c && setTimeout(f, 0))');
function visit590_70_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][8].init(614, 7, '"0" !== f');
function visit589_70_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][7].init(607, 5, '0 !== f');
function visit588_70_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][6].init(607, 14, '0 !== f && "0" !== f');
function visit587_70_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][5].init(607, 22, '(0 !== f && "0" !== f) && (g = l)');
function visit586_70_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][4].init(599, 5, '0 === e');
function visit585_70_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][3].init(599, 30, '0 === e && (0 !== f && "0" !== f) && (g = l)');
function visit584_70_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][2].init(594, 4, 'e != f');
function visit583_70_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[70][1].init(548, 19, '"select" === b.a.u(a)');
function visit582_70_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[70][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][16].init(32965, 69, 'b.a.Nb(c, "after") && (d = function() {\n  setTimeout(e, 0);\n} , c = c.substring(5))');
function visit581_69_16(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][16].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][15].init(32928, 6, 'h && e()');
function visit580_69_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][14].init(32830, 29, '-1 == b.a.i(f, "propertychange")');
function visit579_69_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][13].init(32800, 26, '"off" != a.form.autocomplete');
function visit578_69_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][12].init(32791, 35, '!a.form || "off" != a.form.autocomplete');
function visit577_69_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][11].init(32767, 21, '"off" != a.autocomplete');
function visit576_69_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][10].init(32767, 60, '"off" != a.autocomplete && (!a.form || "off" != a.form.autocomplete)');
function visit575_69_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][9].init(32751, 14, '"text" == a.type');
function visit574_69_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][8].init(32751, 76, '"text" == a.type && "off" != a.autocomplete && (!a.form || "off" != a.form.autocomplete)');
function visit573_69_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][7].init(32717, 32, '"input" == a.tagName.toLowerCase()');
function visit572_69_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][6].init(32717, 110, '"input" == a.tagName.toLowerCase() && "text" == a.type && "off" != a.autocomplete && (!a.form || "off" != a.form.autocomplete)');
function visit571_69_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][5].init(32717, 142, '("input" == a.tagName.toLowerCase() && "text" == a.type && "off" != a.autocomplete && (!a.form || "off" != a.form.autocomplete)) && -1 == b.a.i(f, "propertychange")');
function visit570_69_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][4].init(32709, 150, 'b.a.Z && ("input" == a.tagName.toLowerCase() && "text" == a.type && "off" != a.autocomplete && (!a.form || "off" != a.form.autocomplete)) && -1 == b.a.i(f, "propertychange")');
function visit569_69_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][3].init(32654, 18, '"string" == typeof g');
function visit568_69_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][2].init(32654, 27, '"string" == typeof g && (g = [g])');
function visit567_69_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[69][1].init(32650, 55, 'g && ("string" == typeof g && (g = [g]) , b.a.P(f, g) , f = b.a.Fa(f))');
function visit566_69_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[69][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][8].init(32437, 3, 'd()');
function visit565_68_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][7].init(32273, 5, 'c !== l');
function visit564_68_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][6].init(32273, 60, 'c !== l && (b.preventDefault ? b.preventDefault() : b.returnValue = q)');
function visit563_68_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][5].init(32120, 22, '"function" != typeof d()');
function visit562_68_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][4].init(32120, 85, '"function" != typeof d() && i(Error("The value for a submit binding must be a function"))');
function visit561_68_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][3].init(101, 5, 'f || ""');
function visit560_68_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][2].init(52, 18, '"string" == typeof e');
function visit559_68_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[68][1].init(27, 7, 'd() || {}');
function visit558_68_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[68][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[67][7].init(31919, 20, '0 <= b.a.i(c, b.k.q(a))');
function visit557_67_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[67][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[67][6].init(31835, 25, '"number" == typeof c.length');
function visit556_67_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[67][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[67][5].init(31835, 118, '"number" == typeof c.length && b.a.o(a.getElementsByTagName("option"), function(a) {\n  var d = 0 <= b.a.i(c, b.k.q(a));\n  b.a.ab(a, d);\n})');
function visit555_67_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[67][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[67][4].init(31832, 121, 'c && "number" == typeof c.length && b.a.o(a.getElementsByTagName("option"), function(a) {\n  var d = 0 <= b.a.i(c, b.k.q(a));\n  b.a.ab(a, d);\n})');
function visit554_67_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[67][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[67][3].init(31736, 18, '"select" != b.a.u(a)');
function visit553_67_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[67][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[67][2].init(31736, 78, '"select" != b.a.u(a) && i(Error("values binding applies only to SELECT elements"))');
function visit552_67_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[67][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[67][1].init(31659, 28, 'a.selected && f.push(b.k.q(a))');
function visit551_67_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[67][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][10].init(581, 36, '"value" in c && da(a, b.a.ta(c.value), l)');
function visit550_66_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][9].init(578, 39, 'e && "value" in c && da(a, b.a.ta(c.value), l)');
function visit549_66_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][8].init(518, 23, '0 <= b.a.i(f, b.k.q(h[d]))');
function visit548_66_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][7].init(518, 45, '0 <= b.a.i(f, b.k.q(h[d])) && (b.a.ab(h[d], l) , j++)');
function visit547_66_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][6].init(510, 3, 'd < m');
function visit546_66_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][5].init(339, 11, '"string" == d');
function visit545_66_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][4].init(320, 13, '"function" == d');
function visit544_66_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][3].init(233, 14, '!p._destroy || j');
function visit543_66_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][2].init(229, 18, '!p || !p._destroy || j');
function visit542_66_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[66][1].init(206, 3, 'd < m');
function visit541_66_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[66][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][13].init(30923, 16, 'c.optionsCaption');
function visit540_65_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][12].init(30885, 25, '"number" != typeof h.length');
function visit539_65_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][11].init(30885, 34, '"number" != typeof h.length && (h = [h])');
function visit538_65_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][10].init(30844, 1, 'h');
function visit537_65_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][9].init(30799, 10, '0 < a.length');
function visit536_65_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][8].init(30743, 26, 'a.innerText || a.textContent');
function visit535_65_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][7].init(30733, 36, 'b.k.q(a) || a.innerText || a.textContent');
function visit534_65_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][6].init(30680, 19, '"option" === b.a.u(a)');
function visit533_65_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][5].init(30680, 31, '"option" === b.a.u(a) && a.selected');
function visit532_65_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][4].init(30669, 42, 'a.tagName && "option" === b.a.u(a) && a.selected');
function visit531_65_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][3].init(30610, 11, '0 == a.length');
function visit530_65_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][2].init(30519, 19, '"select" !== b.a.u(a)');
function visit529_65_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[65][1].init(30519, 80, '"select" !== b.a.u(a) && i(Error("options binding applies only to SELECT elements"))');
function visit528_65_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[65][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[64][2].init(339, 90, 'a.__ko_hasfocusUpdating || (c ? a.focus() : a.blur() , b.r.K(b.a.Aa, n, [a, c ? "focusin" : "focusout"]))');
function visit527_64_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[64][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[64][1].init(24, 19, 'f.activeElement === a');
function visit526_64_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[64][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[63][1].init(29916, 45, '"activeElement" in f && (e = f.activeElement === a)');
function visit525_63_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[63][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][11].init(29350, 25, '"number" == typeof c.length');
function visit524_62_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][10].init(29346, 29, '!c || "number" == typeof c.length');
function visit523_62_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][9].init(29226, 38, 'a.stopPropagation && a.stopPropagation()');
function visit522_62_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][8].init(29189, 17, 'p[f + "Bubble"] === q');
function visit521_62_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][7].init(29189, 76, 'p[f + "Bubble"] === q && (a.cancelBubble = l , a.stopPropagation && a.stopPropagation())');
function visit520_62_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][6].init(29128, 5, 'g !== l');
function visit519_62_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][5].init(29128, 60, 'g !== l && (a.preventDefault ? a.preventDefault() : a.returnValue = q)');
function visit518_62_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][4].init(29052, 1, 'm');
function visit517_62_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][3].init(28992, 18, '"string" == typeof f');
function visit516_62_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][2].init(28992, 276, '"string" == typeof f && b.a.n(a, f, function(a) {\n  var g, m = d()[f];\n  if (m) {\n    var p = c();\n    try {\n      var r = b.a.L(arguments);\n      r.unshift(e);\n      g = m.apply(e, r);\n    } finally     {\n      g !== l && (a.preventDefault ? a.preventDefault() : a.returnValue = q);\n    }\n    p[f + "Bubble"] === q && (a.cancelBubble = l , a.stopPropagation && a.stopPropagation());\n  }\n})');
function visit515_62_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[62][1].init(28951, 7, 'd() || {}');
function visit514_62_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[62][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][10].init(28792, 27, '!a.disabled && (a.disabled = l)');
function visit513_61_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][9].init(28788, 31, '!c && !a.disabled && (a.disabled = l)');
function visit512_61_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][8].init(28744, 13, 'c && a.disabled');
function visit511_61_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][7].init(28623, 5, 'c || ""');
function visit510_61_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][6].init(28542, 18, '"object" == typeof c');
function visit509_61_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][5].init(117, 10, 'a.value == c');
function visit508_61_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][4].init(89, 15, '"radio" == a.type');
function visit507_61_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][3].init(89, 39, '"radio" == a.type && (a.checked = a.value == c)');
function visit506_61_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][2].init(67, 19, '0 <= b.a.i(c, a.value)');
function visit505_61_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[61][1].init(19, 18, '"checkbox" == a.type');
function visit504_61_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[61][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][16].init(28302, 36, '!a.name && b.c.uniqueName.init(a, t(l))');
function visit503_60_16(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][16].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][15].init(28285, 15, '"radio" == a.type');
function visit502_60_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][14].init(28285, 53, '"radio" == a.type && !a.name && b.c.uniqueName.init(a, t(l))');
function visit501_60_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][13].init(28236, 4, '0 <= e');
function visit500_60_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][12].init(28236, 19, '0 <= e && f.splice(e, 1)');
function visit499_60_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][11].init(28224, 31, '!a.checked && 0 <= e && f.splice(e, 1)');
function visit498_60_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][10].init(28204, 3, '0 > e');
function visit497_60_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][9].init(28193, 14, 'a.checked && 0 > e');
function visit496_60_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][8].init(28134, 18, '"checkbox" == a.type');
function visit495_60_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][7].init(28134, 38, '"checkbox" == a.type && g instanceof Array');
function visit494_60_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][6].init(28064, 15, '"radio" == a.type');
function visit493_60_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][5].init(28064, 26, '"radio" == a.type && a.checked');
function visit492_60_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][4].init(28025, 18, '"checkbox" == a.type');
function visit491_60_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][3].init(158, 10, '"name" === e');
function visit490_60_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][2].init(158, 39, '"name" === e && b.a.$a(a, g ? "" : f.toString())');
function visit489_60_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[60][1].init(59, 33, 'g || a.setAttribute(e, f.toString())');
function visit488_60_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[60][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][11].init(27818, 8, '8 >= b.a.Z');
function visit487_59_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][10].init(27818, 17, '8 >= b.a.Z && e in ea');
function visit486_59_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][9].init(27794, 23, 'g && a.removeAttribute(e)');
function visit485_59_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][8].init(27788, 5, 'f === H');
function visit484_59_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][7].init(27781, 5, 'f === n');
function visit483_59_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][6].init(27781, 12, 'f === n || f === H');
function visit482_59_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][5].init(27774, 5, 'f === q');
function visit481_59_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][4].init(27774, 19, 'f === q || f === n || f === H');
function visit480_59_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][3].init(27734, 18, '"string" == typeof e');
function visit479_59_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][2].init(27703, 14, 'b.a.d(d()) || {}');
function visit478_59_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[59][1].init(39, 12, 'a.parentNode');
function visit477_59_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[59][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][13].init(27343, 1, 'd');
function visit476_58_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][12].init(27247, 18, 'b || w.document.body');
function visit475_58_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][11].init(27117, 14, '8 !== b.nodeType');
function visit474_58_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][10].init(27101, 14, '1 !== b.nodeType');
function visit473_58_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][9].init(27101, 30, '1 !== b.nodeType && 8 !== b.nodeType');
function visit472_58_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][8].init(27101, 143, '(1 !== b.nodeType && 8 !== b.nodeType) && i(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"))');
function visit471_58_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][7].init(27097, 147, 'b && (1 !== b.nodeType && 8 !== b.nodeType) && i(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"))');
function visit470_58_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][6].init(27051, 14, '8 === b.nodeType');
function visit469_58_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][5].init(27035, 14, '1 === b.nodeType');
function visit468_58_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][4].init(27035, 30, '1 === b.nodeType || 8 === b.nodeType');
function visit467_58_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][3].init(27035, 41, '(1 === b.nodeType || 8 === b.nodeType) && Y(a, b, l)');
function visit466_58_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][2].init(26970, 14, '1 === a.nodeType');
function visit465_58_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[58][1].init(26970, 25, '1 === a.nodeType && b.e.Sa(a)');
function visit464_58_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[58][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[57][3].init(26838, 21, '2 == arguments.length');
function visit463_57_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[57][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[57][2].init(26639, 14, 'c && (this[c] = a)');
function visit462_57_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[57][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[57][1].init(26522, 14, 'd.$parents || []');
function visit461_57_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[57][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[56][2].init(427, 15, '!(e = this.Ga[a])');
function visit460_56_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[56][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[56][1].init(79, 12, 'b.e.ib(a) != n');
function visit459_56_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[56][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[55][3].init(25762, 32, 'a.getAttribute("data-bind") != n');
function visit458_55_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[55][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[55][2].init(168, 10, 'f < c.length');
function visit457_55_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[55][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[55][1].init(139, 3, 'c = e');
function visit456_55_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[55][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][10].init(980, 15, 'G(c) && (e = [c])');
function visit455_54_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][9].init(944, 4, 'A(c)');
function visit454_54_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][8].init(924, 1, 'e');
function visit453_54_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][7].init(915, 1, 'c');
function visit452_54_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][6].init(867, 14, '1 === d.nodeType');
function visit451_54_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][5].init(858, 1, 'd');
function visit450_54_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][4].init(822, 12, 'oa[b.a.u(a)]');
function visit449_54_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][3].init(717, 31, 'a.nextSibling && G(a.nextSibling)');
function visit448_54_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][2].init(695, 14, 'A(a) && (a = Z(a))');
function visit447_54_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[54][1].init(621, 32, '!a.nextSibling || G(a.nextSibling)');
function visit446_54_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[54][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[53][4].init(24510, 3, 'e < f');
function visit445_53_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[53][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[53][3].init(24456, 4, 'A(a)');
function visit444_53_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[53][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[53][2].init(24394, 3, 'd < c');
function visit443_53_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[53][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[53][1].init(24346, 4, 'A(a)');
function visit442_53_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[53][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[52][4].init(24069, 46, '"<!--test-->" === x.createComment("test").text');
function visit441_52_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[52][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[52][3].init(73, 9, 'a.t() !== e');
function visit440_52_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[52][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[52][2].init(69, 13, '!f || a.t() !== e');
function visit439_52_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[52][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[52][1].init(69, 20, '(!f || a.t() !== e) && a(e)');
function visit438_52_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[52][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][12].init(1622, 35, '(a = d()._ko_property_writers) && a[c]');
function visit437_51_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][11].init(1604, 12, '!a || !b.Qa(a)');
function visit436_51_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][10].init(1540, 18, 'b.a.D(a[c].key) == d');
function visit435_51_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][9].init(1522, 10, 'c < a.length');
function visit434_51_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][8].init(501, 10, '0 < a.length');
function visit433_51_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][7].init(501, 66, '0 < a.length && (d = d + ", \'_ko_property_writers\' : { " + a.join("") + " } ")');
function visit432_51_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][6].init(389, 28, 'e.unknown && c.push(e.unknown)');
function visit431_51_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][5].init(265, 10, '0 < a.length');
function visit430_51_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][4].init(265, 24, '0 < a.length && a.push(", ")');
function visit429_51_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][3].init(261, 89, 'e && (0 < a.length && a.push(", ") , a.push(g + " : function(__ko_value) { " + e + " = __ko_value; }"))');
function visit428_51_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][2].init(221, 5, 'h === n');
function visit427_51_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[51][1].init(164, 35, '0 <= b.a.i(ma, b.a.D(e).toLowerCase())');
function visit426_51_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[51][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][9].init(1057, 21, 'h.length && h.charAt(0)');
function visit425_50_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][8].init(987, 10, '0 < c.length');
function visit424_50_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][7].init(987, 23, '0 < c.length && c.push(",")');
function visit423_50_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][6].init(987, 29, '0 < c.length && c.push(",") , e.key');
function visit422_50_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][5].init(925, 19, '"string" === typeof a');
function visit421_50_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][4].init(762, 12, 'k < j.length - 1');
function visit420_50_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][3].init(757, 3, '0 < k');
function visit419_50_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][2].init(757, 17, '0 < k && k < j.length - 1');
function visit418_50_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[50][1].init(725, 3, 'c < f');
function visit417_50_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[50][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][12].init(548, 5, '0 === j');
function visit416_49_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][11].init(548, 136, '0 === j && (g = d.substring(c, f + 1) , a.push(g) , h = "@ko_token_" + (a.length - 1) + "@" , d = d.substring(0, c) + h + d.substring(f + 1) , f -= g.length - h.length , c = n)');
function visit415_49_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][10].init(536, 5, 'g === e');
function visit414_49_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][9].init(536, 149, 'g === e && (j-- , 0 === j && (g = d.substring(c, f + 1) , a.push(g) , h = "@ko_token_" + (a.length - 1) + "@" , d = d.substring(0, c) + h + d.substring(f + 1) , f -= g.length - h.length , c = n))');
function visit413_49_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][8].init(526, 5, 'g === k');
function visit412_49_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][7].init(429, 5, 'c === n');
function visit411_49_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][6].init(396, 10, 'f < d.length');
function visit410_49_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][5].init(126, 20, '"\\\\" !== d.charAt(f - 1)');
function visit409_49_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][4].init(120, 4, 'g == e');
function visit408_49_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][3].init(120, 26, 'g == e && "\\\\" !== d.charAt(f - 1)');
function visit407_49_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][2].init(61, 5, 'c === n');
function visit406_49_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[49][1].init(24, 10, 'f < d.length');
function visit405_49_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[49][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][8].init(22127, 17, '"{" === d.charAt(0)');
function visit404_48_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][7].init(22127, 48, '"{" === d.charAt(0) && (d = d.substring(1, d.length - 1))');
function visit403_48_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][6].init(22107, 10, '3 > d.length');
function visit402_48_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][5].init(423, 5, 'd === H');
function visit401_48_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][4].init(416, 5, 'd === n');
function visit400_48_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][3].init(416, 12, 'd === n || d === H');
function visit399_48_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][2].init(351, 22, 'b.k.q(a.options[c]) == d');
function visit398_48_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[48][1].init(339, 4, '0 <= c');
function visit397_48_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[48][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[47][4].init(569, 19, '"number" === typeof d');
function visit396_47_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[47][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[47][3].init(397, 75, '"__ko__hasDomDataOptionValue__" in a && delete a.__ko__hasDomDataOptionValue__');
function visit395_47_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[47][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[47][2].init(194, 18, '0 <= a.selectedIndex');
function visit394_47_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[47][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[47][1].init(72, 8, '7 >= b.a.Z');
function visit393_47_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[47][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[46][5].init(-1, 37, 'a.__ko__hasDomDataOptionValue__ === l');
function visit392_46_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[46][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[46][4].init(20966, 4, '10 > c');
function visit391_46_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[46][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[46][3].init(20958, 12, 'b.$(a) && 10 > c');
function visit390_46_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[46][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[46][2].init(20830, 19, '0 == arguments.length');
function visit389_46_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[46][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[46][1].init(20830, 91, '0 == arguments.length && i(Error("When calling ko.toJS, pass the object you want to convert."))');
function visit388_46_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[46][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][11].init(1432, 14, '!b.a.X(F) || C()');
function visit387_45_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][10].init(1336, 6, 'F && j()');
function visit386_45_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][9].init(1306, 21, 'c.deferEvaluation !== l');
function visit385_45_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][8].init(1306, 26, 'c.deferEvaluation !== l && g()');
function visit384_45_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][7].init(1121, 27, '"function" === typeof c.write');
function visit383_45_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][6].init(1066, 6, 'm || g()');
function visit382_45_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][5].init(1036, 14, 'd || (d = c.owner)');
function visit381_45_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][4].init(1012, 10, 'c.Ja || t(q)');
function visit380_45_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][3].init(997, 25, 'c.disposeWhen || c.Ja || t(q)');
function visit379_45_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][2].init(988, 6, 'c.W || n');
function visit378_45_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[45][1].init(960, 34, 'c.disposeWhenNodeIsRemoved || c.W || n');
function visit377_45_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[45][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][12].init(850, 20, '"function" != typeof r');
function visit376_44_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][11].init(850, 91, '"function" != typeof r && i(Error("Pass a function that returns the value of the ko.computed"))');
function visit375_44_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][10].init(835, 13, 'r || (r = c.read)');
function visit374_44_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][9].init(829, 5, 'c || {}');
function visit373_44_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][8].init(792, 18, '"object" == typeof r');
function visit372_44_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][7].init(789, 21, 'r && "object" == typeof r');
function visit371_44_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][6].init(760, 10, '0 < y.length');
function visit370_44_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][5].init(756, 14, '!m || 0 < y.length');
function visit369_44_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][4].init(711, 6, 'm || g()');
function visit368_44_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][3].init(510, 21, '"function" === typeof u');
function visit367_44_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][2].init(485, 18, '0 < arguments.length');
function visit366_44_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[44][1].init(282, 13, 'y.length || z()');
function visit365_44_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[44][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[43][7].init(19532, 26, 'a[e] && y.splice(e, 1)[0].B()');
function visit364_43_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[43][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[43][6].init(19523, 4, '0 <= e');
function visit363_43_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[43][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[43][5].init(19447, 17, '0 <= (d = b.a.i(a, c))');
function visit362_43_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[43][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[43][4].init(19354, 6, 'm && v()');
function visit361_43_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[43][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[43][3].init(19348, 2, '!p');
function visit360_43_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[43][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[43][2].init(19287, 4, '0 <= a');
function visit359_43_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[43][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[43][1].init(19284, 7, 'a && 0 <= a');
function visit358_43_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[43][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[42][6].init(751, 4, '0 <= c');
function visit357_42_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[42][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[42][5].init(751, 39, '0 <= c && (this.H() , this.t()[c] = b , this.G())');
function visit356_42_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[42][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[42][4].init(638, 13, '0 <= b.a.i(a, d)');
function visit355_42_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[42][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[42][3].init(575, 5, 'a === H');
function visit354_42_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[42][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[42][2].init(107, 26, 'c(b[e]) && (b[e]._destroy = l)');
function visit353_42_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[42][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[42][1].init(98, 4, '0 <= e');
function visit352_42_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[42][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][11].init(18554, 7, 'b === a');
function visit351_41_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][10].init(18512, 20, '"function" == typeof a');
function visit350_41_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][9].init(18458, 13, '0 <= b.a.i(a, d)');
function visit349_41_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][8].init(18332, 5, 'a === H');
function visit348_41_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][7].init(18278, 18, 'c.length && this.G()');
function visit347_41_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][6].init(18226, 12, '0 === c.length');
function visit346_41_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][5].init(18226, 22, '0 === c.length && this.H()');
function visit345_41_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][4].init(18219, 58, 'e(g) && (0 === c.length && this.H() , c.push(g) , b.splice(f, 1) , f--)');
function visit344_41_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][3].init(18192, 10, 'f < b.length');
function visit343_41_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][2].init(18181, 5, 'b === a');
function visit342_41_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[41][1].init(18139, 20, '"function" == typeof a');
function visit341_41_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[41][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][22].init(17904, 5, 'a !== H');
function visit340_40_22(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][22].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][21].init(17904, 22, 'a !== H && !("length" in a)');
function visit339_40_21(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][21].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][20].init(17904, 135, '(a !== H && !("length" in a)) && i(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."))');
function visit338_40_20(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][20].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][19].init(17896, 5, 'a !== n');
function visit337_40_19(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][19].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][18].init(17896, 143, 'a !== n && (a !== H && !("length" in a)) && i(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."))');
function visit336_40_18(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][18].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][17].init(17868, 19, '0 == arguments.length');
function visit335_40_17(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][17].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][16].init(17868, 27, '0 == arguments.length && (a = [])');
function visit334_40_16(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][16].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][15].init(17750, 10, 'a[D] === b.j');
function visit333_40_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][14].init(17750, 16, 'a[D] === b.j && a.yb');
function visit332_40_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][13].init(17728, 20, '"function" == typeof a');
function visit331_40_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][12].init(17728, 38, '"function" == typeof a && a[D] === b.j && a.yb');
function visit330_40_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][11].init(17716, 10, 'a[D] === b.m');
function visit329_40_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][10].init(17694, 20, '"function" == typeof a');
function visit328_40_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][9].init(17694, 32, '"function" == typeof a && a[D] === b.m');
function visit327_40_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][8].init(17694, 72, '"function" == typeof a && a[D] === b.m || "function" == typeof a && a[D] === b.j && a.yb');
function visit326_40_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][7].init(17610, 8, 'a[D] === d');
function visit325_40_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][6].init(17599, 8, 'a[D] === H');
function visit324_40_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][5].init(17592, 5, 'a === H');
function visit323_40_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][4].init(17592, 15, 'a === H || a[D] === H');
function visit322_40_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][3].init(17585, 5, 'a === n');
function visit321_40_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][2].init(17585, 22, 'a === n || a === H || a[D] === H');
function visit320_40_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[40][1].init(29, 5, 'a === b');
function visit319_40_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[40][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[39][4].init(7, 5, 'a === n');
function visit318_39_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[39][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[39][3].init(-1, 22, 'a === n || typeof a in la');
function visit317_39_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[39][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[39][2].init(17078, 56, '!d.equalityComparer || !d.equalityComparer(c, arguments[0])');
function visit316_39_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[39][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[39][1].init(17055, 18, '0 < arguments.length');
function visit315_39_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[39][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][9].init(16944, 5, 'c || []');
function visit314_38_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][8].init(16851, 16, '0 <= b.a.i(d.Ka, a)');
function visit313_38_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][7].init(16849, 43, '!(0 <= b.a.i(d.Ka, a)) && (d.Ka.push(a) , d.ha(a))');
function visit312_38_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][6].init(16846, 46, 'd && !(0 <= b.a.i(d.Ka, a)) && (d.Ka.push(a) , d.ha(a))');
function visit311_38_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][5].init(16814, 10, '0 < B.length');
function visit310_38_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][4].init(16741, 69, 'b.Pa(a) || i(Error("Only subscribable things can act as dependencies"))');
function visit309_38_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][3].init(16560, 38, '"function" == typeof a.notifySubscribers');
function visit308_38_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][2].init(16535, 23, '"function" == typeof a.xa');
function visit307_38_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[38][1].init(16535, 63, '"function" == typeof a.xa && "function" == typeof a.notifySubscribers');
function visit306_38_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[38][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][11].init(16463, 22, '"function" == typeof e');
function visit305_37_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][10].init(16463, 37, '"function" == typeof e && (d = e(d, a[c]))');
function visit304_37_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][9].init(16431, 1, 'a');
function visit303_37_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][8].init(16340, 47, 'this.w.hasOwnProperty(b) && (a += this.w[b].length)');
function visit302_37_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][7].init(16272, 8, 'b.Bb !== l');
function visit301_37_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][6].init(16272, 17, 'b.Bb !== l && b.ha(a)');
function visit300_37_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][5].init(16269, 20, 'b && b.Bb !== l && b.ha(a)');
function visit299_37_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][4].init(16204, 94, 'this.w[d] && b.r.K(function() {\n  b.a.o(this.w[d].slice(0), function(b) {\n  b && b.Bb !== l && b.ha(a);\n});\n}, this)');
function visit298_37_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][3].init(16192, 11, 'd || "change"');
function visit297_37_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][2].init(16104, 25, 'this.w[c] || (this.w[c] = [])');
function visit296_37_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[37][1].init(16014, 11, 'c || "change"');
function visit295_37_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[37][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[36][1].init(186, 11, '"always" == d');
function visit294_36_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[36][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[35][4].init(581, 41, 'g.parentNode && g.parentNode.removeChild(g)');
function visit293_35_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[35][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[35][3].init(534, 13, 'd && b.a.P(h, d)');
function visit292_35_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[35][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[35][2].init(505, 3, 'e < f');
function visit291_35_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[35][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[35][1].init(129, 5, 'b || []');
function visit290_35_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[35][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[34][5].init(14846, 5, 'c === H');
function visit289_34_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[34][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[34][4].init(14846, 94, 'c === H && i(Error("Couldn\'t find any memo with ID " + a + ". Perhaps it\'s already been unmemoized."))');
function visit288_34_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[34][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[34][3].init(14562, 20, '"function" != typeof a');
function visit287_34_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[34][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[34][2].init(14562, 90, '"function" != typeof a && i(Error("You can only pass a function to ko.memoization.memoize()"))');
function visit286_34_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[34][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[34][1].init(25, 10, 'e < c.length');
function visit285_34_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[34][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][13].init(14365, 21, '"undefined" != typeof E');
function visit284_33_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][12].init(14328, 18, '"string" != typeof d');
function visit283_33_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][11].init(14328, 36, '"string" != typeof d && (d = d.toString())');
function visit282_33_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][10].init(14328, 58, '"string" != typeof d && (d = d.toString()) , "undefined" != typeof E');
function visit281_33_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][9].init(14319, 5, 'd !== H');
function visit280_33_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][8].init(14312, 5, 'd !== n');
function visit279_33_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][7].init(14312, 12, 'd !== n && d !== H');
function visit278_33_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][6].init(320, 30, '"function" == typeof w.innerShiv');
function visit277_33_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][5].init(128, 36, '!c.indexOf("<td") || !c.indexOf("<th")');
function visit276_33_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][4].init(127, 87, '(!c.indexOf("<td") || !c.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"]');
function visit275_33_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][3].init(60, 98, '(!c.indexOf("<td") || !c.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""]');
function visit274_33_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][2].init(65, 58, '!c.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"]');
function visit273_33_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[33][1].init(61, 159, '!c.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!c.indexOf("<td") || !c.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""]');
function visit272_33_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[33][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[32][7].init(13864, 60, 'c.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"]');
function visit271_32_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[32][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[32][6].init(13864, 221, 'c.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !c.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!c.indexOf("<td") || !c.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""]');
function visit270_32_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[32][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[32][5].init(13760, 41, 'a.parentNode && a.parentNode.removeChild(a)');
function visit269_32_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[32][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[32][4].init(13717, 26, '11 !== a.parentNode.nodeType');
function visit268_32_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[32][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[32][3].init(13703, 40, 'a.parentNode && 11 !== a.parentNode.nodeType');
function visit267_32_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[32][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[32][2].init(13669, 21, '(d = E.clean([a])) && d[0]');
function visit266_32_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[32][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[32][1].init(13642, 21, '"undefined" != typeof E');
function visit265_32_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[32][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][8].init(765, 41, 'a.parentNode && a.parentNode.removeChild(a)');
function visit264_31_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][7].init(709, 3, 'j < k');
function visit263_31_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][6].init(603, 35, 'e[a.nodeType] && (d(a) , f[a.nodeType])');
function visit262_31_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][5].init(554, 11, '0 == f.length');
function visit261_31_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][4].init(554, 29, '0 == f.length && b.a.f.set(d, c, H)');
function visit260_31_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][3].init(538, 46, 'f && (b.a.ga(f, e) , 0 == f.length && b.a.f.set(d, c, H))');
function visit259_31_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][2].init(430, 20, '"function" != typeof d');
function visit258_31_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[31][1].init(430, 61, '"function" != typeof d && i(Error("Callback must be a function"))');
function visit257_31_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[31][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][12].init(12859, 14, '8 === c.nodeType');
function visit256_30_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][11].init(12859, 22, '8 === c.nodeType && d(c)');
function visit255_30_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][10].init(12805, 13, 'f[c.nodeType]');
function visit254_30_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][9].init(12753, 30, '"function" == typeof E.cleanData');
function visit253_30_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][8].init(12753, 48, '"function" == typeof E.cleanData && E.cleanData([c])');
function visit252_30_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][7].init(12731, 20, '"function" == typeof E');
function visit251_30_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][6].init(12731, 70, '"function" == typeof E && "function" == typeof E.cleanData && E.cleanData([c])');
function visit250_30_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][5].init(12693, 10, 'j < e.length');
function visit249_30_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][4].init(12666, 1, 'e');
function visit248_30_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][3].init(12600, 26, 'd && (e = [] , b.a.f.set(a, c, e))');
function visit247_30_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][2].init(12593, 5, 'e === H');
function visit246_30_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[30][1].init(12593, 33, 'e === H && d && (e = [] , b.a.f.set(a, c, e))');
function visit245_30_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[30][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][10].init(12352, 2, '!f');
function visit244_29_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][9].init(12330, 10, '"null" !== g');
function visit243_29_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][8].init(12330, 16, '"null" !== g && c[g]');
function visit242_29_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][7].init(12324, 23, '!g || !("null" !== g && c[g])');
function visit241_29_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][6].init(12240, 21, 'b.a.f.getAll(a, q) === H');
function visit240_29_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][5].init(12233, 5, 'c === H');
function visit239_29_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][4].init(12233, 28, 'c === H && b.a.f.getAll(a, q) === H');
function visit238_29_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][3].init(12233, 54, 'c === H && b.a.f.getAll(a, q) === H || (b.a.f.getAll(a, l)[d] = c)');
function visit237_29_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][2].init(12199, 5, 'c === H');
function visit236_29_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[29][1].init(11865, 211, 'Function.prototype.bind || (Function.prototype.bind = function(a) {\n  var b = this, c = Array.prototype.slice.call(arguments), a = c.shift();\n  return function() {\n  return b.apply(a, c.concat(Array.prototype.slice.call(arguments)));\n};\n})');
function visit235_29_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[29][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][8].init(4837, 4, '0 <= k');
function visit234_26_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][7].init(4790, 4, '0 <= h');
function visit233_26_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][6].init(4740, 17, '"form" === b.a.u(a)');
function visit232_26_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][5].init(4720, 18, '"object" == typeof a');
function visit231_26_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][4].init(4720, 37, '"object" == typeof a && "form" === b.a.u(a)');
function visit230_26_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][3].init(4688, 24, 'c.includeFields || this.Ma');
function visit229_26_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][2].init(4673, 12, 'c.params || {}');
function visit228_26_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[26][1].init(4665, 5, 'c || {}');
function visit227_26_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[26][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][13].init(4351, 34, '"undefined" == typeof JSON.stringify');
function visit226_25_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][12].init(4325, 24, '"undefined" == typeof JSON');
function visit225_25_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][11].init(4325, 60, '"undefined" == typeof JSON || "undefined" == typeof JSON.stringify');
function visit224_25_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][10].init(4325, 277, '("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) && i(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don\'t support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js"))');
function visit223_25_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][9].init(4235, 20, 'w.JSON && w.JSON.parse');
function visit222_25_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][8].init(4202, 18, '"string" == typeof a');
function visit221_25_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][7].init(4202, 32, '"string" == typeof a && (a = b.a.D(a))');
function visit220_25_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][6].init(4149, 21, 'e(c[g]) && f.push(c[g])');
function visit219_25_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][5].init(4140, 4, '0 <= g');
function visit218_25_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][4].init(4075, 10, 'a.name === d');
function visit217_25_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][3].init(4037, 18, '"string" == typeof d');
function visit216_25_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][2].init(3909, 5, '7 === m');
function visit215_25_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[25][1].init(3900, 5, '6 === m');
function visit214_25_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[25][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][11].init(3864, 5, 'd < c');
function visit213_24_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][10].init(3793, 4, 'e <= d');
function visit212_24_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][9].init(3677, 4, '9 <= m');
function visit211_24_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][8].init(3620, 36, 'a.style && (a.style.zoom = a.style.zoom)');
function visit210_24_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][7].init(3591, 13, '1 == a.nodeType');
function visit209_24_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][6].init(3582, 4, '9 <= m');
function visit208_24_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][5].init(3582, 75, '9 <= m && (a = 1 == a.nodeType ? a : a.parentNode , a.style && (a.style.zoom = a.style.zoom))');
function visit207_24_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][4].init(3479, 4, '7 >= m');
function visit206_24_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][3].init(30, 13, '3 != e.nodeType');
function visit205_24_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][2].init(30, 33, '3 != e.nodeType || b.e.nextSibling(e)');
function visit204_24_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[24][1].init(26, 37, '!e || 3 != e.nodeType || b.e.nextSibling(e)');
function visit203_24_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[24][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][12].init(3305, 14, '3 === a.nodeType');
function visit202_23_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][11].init(3291, 5, 'c === H');
function visit201_23_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][10].init(3284, 5, 'c === n');
function visit200_23_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][9].init(3284, 12, 'c === n || c === H');
function visit199_23_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][8].init(3208, 12, 'c && f.push(a)');
function visit198_23_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][7].init(3191, 16, 'c || f.splice(d, 1)');
function visit197_23_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][6].init(3186, 4, '0 <= d');
function visit196_23_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][5].init(3115, 24, 'a.className.match(e) || []');
function visit195_23_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][4].init(3094, 1, 'd');
function visit194_23_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][3].init(284, 13, 'b.checked !== l');
function visit193_23_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][2].init(265, 33, 'a(b, d) && (b.checked = b.checked !== l)');
function visit192_23_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[23][1].init(232, 31, '"undefined" != typeof b.fireEvent');
function visit191_23_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[23][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[22][7].init(2708, 18, 'e[d] || "HTMLEvents"');
function visit190_22_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[22][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[22][6].init(2656, 34, '"function" == typeof b.dispatchEvent');
function visit189_22_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[22][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[22][5].init(2623, 32, '"function" == typeof x.createEvent');
function visit188_22_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[22][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[22][4].init(2570, 30, 'a(b, d) && c.push({\n  mb: b.checked})');
function visit187_22_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[22][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[22][3].init(2538, 21, '"undefined" != typeof E');
function visit186_22_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[22][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[22][2].init(2452, 15, '!b || !b.nodeType');
function visit185_22_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[22][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[22][1].init(2452, 82, '(!b || !b.nodeType) && i(Error("element must be a DOM node when calling triggerEvent"))');
function visit184_22_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[22][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][13].init(2282, 33, '"undefined" != typeof b.attachEvent');
function visit183_21_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][12].init(2218, 37, '"function" == typeof b.addEventListener');
function visit182_21_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][11].init(2214, 41, '!e && "function" == typeof b.addEventListener');
function visit181_21_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][10].init(2154, 8, 'b.mb !== l');
function visit180_21_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][9].init(2137, 26, 'b && (this.checked = b.mb !== l)');
function visit179_21_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][8].init(2087, 6, 'a(b, d)');
function visit178_21_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][7].init(2061, 21, '"undefined" != typeof E');
function visit177_21_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][6].init(2057, 25, '!e && "undefined" != typeof E');
function visit176_21_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][5].init(2046, 7, 'm && k[d]');
function visit175_21_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][4].init(1986, 34, 'a.tagName && a.tagName.toLowerCase()');
function visit174_21_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][3].init(1983, 37, 'a && a.tagName && a.tagName.toLowerCase()');
function visit173_21_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][2].init(91, 4, 'a == b');
function visit172_21_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[21][1].init(81, 4, 'a != n');
function visit171_21_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[21][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][14].init(1820, 39, '16 == (b.compareDocumentPosition(a) & 16)');
function visit170_20_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][13].init(1787, 25, 'b.compareDocumentPosition');
function visit169_20_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][12].init(1738, 27, 'a.substring(0, b.length) === b');
function visit168_20_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][11].init(1718, 17, 'b.length > a.length');
function visit167_20_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][10].init(1705, 5, 'a || ""');
function visit166_20_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][9].init(1658, 6, '"" !== h');
function visit165_20_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][8].init(1658, 17, '"" !== h && c.push(h)');
function visit164_20_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][7].init(1631, 3, 'f < g');
function visit163_20_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][6].init(1600, 5, 'a || ""');
function visit162_20_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][5].init(1545, 5, 'a || ""');
function visit161_20_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][4].init(1477, 3, '7 > m');
function visit160_20_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][3].init(1431, 3, 'f < h');
function visit159_20_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][2].init(1381, 3, 'f < h');
function visit158_20_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[20][1].init(1324, 10, '0 < c.length');
function visit157_20_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[20][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[19][7].init(1250, 3, 'c < e');
function visit156_19_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[19][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[19][6].init(1225, 1, 'd');
function visit155_19_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[19][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[19][5].init(1134, 3, 'c < e');
function visit154_19_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[19][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[19][4].init(1046, 3, 'c < e');
function visit153_19_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[19][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[19][3].init(867, 32, 'b.hasOwnProperty(d) && (a[d] = b[d])');
function visit152_19_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[19][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[19][2].init(850, 1, 'b');
function visit151_19_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[19][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[19][1].init(69, 3, 'd < c');
function visit150_19_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[19][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][15].init(728, 18, 'b instanceof Array');
function visit149_18_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][14].init(677, 21, 'b(a[c]) && d.push(a[c])');
function visit148_18_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][13].init(669, 3, 'c < e');
function visit147_18_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][12].init(643, 5, 'a || []');
function visit146_18_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][11].init(582, 3, 'c < e');
function visit145_18_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][10].init(556, 5, 'a || []');
function visit144_18_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][9].init(490, 15, '0 > b.a.i(d, a[c])');
function visit143_18_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][8].init(490, 29, '0 > b.a.i(d, a[c]) && d.push(a[c])');
function visit142_18_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][7].init(482, 3, 'c < e');
function visit141_18_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][6].init(456, 5, 'a || []');
function visit140_18_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][5].init(410, 4, '0 <= c');
function visit139_18_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][4].init(410, 19, '0 <= c && a.splice(c, 1)');
function visit138_18_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][3].init(339, 14, 'b.call(d, a[c])');
function visit137_18_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][2].init(328, 3, 'c < e');
function visit136_18_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[18][1].init(35, 8, 'a[d] === b');
function visit135_18_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[18][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[17][6].init(880, 5, 'd < c');
function visit134_17_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[17][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[17][5].init(773, 42, '"function" == typeof Array.prototype.indexOf');
function visit133_17_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[17][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[17][4].init(737, 3, 'd < c');
function visit132_17_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[17][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[17][3].init(620, 3, '4 < c');
function visit131_17_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[17][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[17][2].init(443, 3, 'h < j');
function visit130_17_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[17][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[17][1].init(411, 8, 'g.length');
function visit129_17_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[17][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[16][7].init(5389, 10, '"radio" == c');
function visit128_16_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[16][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[16][6].init(5374, 13, '"checkbox" == c');
function visit127_16_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[16][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[16][5].init(5374, 25, '"checkbox" == c || "radio" == c');
function visit126_16_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[16][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[16][4].init(5321, 24, '"click" != d.toLowerCase()');
function visit125_16_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[16][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[16][3].init(5312, 33, '!a.type || "click" != d.toLowerCase()');
function visit124_16_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[16][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[16][2].init(5292, 18, '"input" !== b.a.u(a)');
function visit123_16_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[16][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[16][1].init(5292, 53, '"input" !== b.a.u(a) || !a.type || "click" != d.toLowerCase()');
function visit122_16_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[16][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][13].init(5134, 14, 'f < c.length - 1');
function visit121_15_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][12].init(5057, 22, '"undefined" !== typeof v');
function visit120_15_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][11].init(5008, 12, 'd !== b.k.q(a)');
function visit119_15_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][10].init(5008, 42, 'd !== b.k.q(a) && b.r.K(b.a.Aa, n, [a, "change"])');
function visit118_15_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][9].init(4983, 12, 'd !== b.k.q(a)');
function visit117_15_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][8].init(4983, 24, 'd !== b.k.q(a) && b.k.T(a, d)');
function visit116_15_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][7].init(4980, 27, 'c && d !== b.k.q(a) && b.k.T(a, d)');
function visit115_15_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][6].init(4876, 24, 'm || b.e.N(a, b.a.Ha(h.Ya))');
function visit114_15_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][5].init(4835, 37, 'm && (h.Ya = b.a.Ha(b.e.childNodes(a), l))');
function visit113_15_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][4].init(4826, 8, 'j !== h.pb');
function visit112_15_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][3].init(4823, 11, 'd || j !== h.pb');
function visit111_15_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][2].init(4820, 14, 'm || d || j !== h.pb');
function visit110_15_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[15][1].init(4801, 7, '!c !== !g');
function visit109_15_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[15][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][19].init(4614, 3, 'c < f');
function visit108_14_19(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][19].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][18].init(4562, 13, '1 == a.nodeType');
function visit107_14_18(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][18].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][17].init(4528, 4, 'c != n');
function visit106_14_17(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][17].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][16].init(4528, 25, 'c != n && d.push({\n  rb: a, \n  Eb: c})');
function visit105_14_16(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][16].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][15].init(4487, 13, '8 == a.nodeType');
function visit104_14_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][14].init(4482, 1, 'a');
function visit103_14_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][13].init(384, 27, '"function" == typeof g.toJSON');
function visit102_14_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][12].init(384, 40, '"function" == typeof g.toJSON && e("toJSON")');
function visit101_14_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][11].init(364, 10, 'h < g.length');
function visit100_14_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][10].init(332, 18, 'g instanceof Array');
function visit99_14_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][9].init(240, 5, 'a !== H');
function visit98_14_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][8].init(240, 27, 'a !== H && !(a instanceof Date)');
function visit97_14_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][7].init(233, 5, 'a !== n');
function visit96_14_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][6].init(233, 34, 'a !== n && a !== H && !(a instanceof Date)');
function visit95_14_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][5].init(213, 18, '"object" == typeof a');
function visit94_14_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][4].init(213, 54, '"object" == typeof a && a !== n && a !== H && !(a instanceof Date)');
function visit93_14_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][3].init(211, 57, '!("object" == typeof a && a !== n && a !== H && !(a instanceof Date))');
function visit92_14_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][2].init(191, 9, 'c || new ka()');
function visit91_14_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[14][1].init(141, 5, 'h !== H');
function visit90_14_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[14][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[13][7].init(3975, 4, '0 <= c');
function visit89_13_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[13][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[13][6].init(3899, 4, '0 <= f');
function visit88_13_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[13][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[13][5].init(3768, 4, 'a != c');
function visit87_13_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[13][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[13][4].init(3692, 13, '8 == a.nodeType');
function visit86_13_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[13][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[13][3].init(3692, 47, '8 == a.nodeType && (J ? a.text : a.nodeValue).match(ia)');
function visit85_13_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[13][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[13][2].init(3623, 13, '8 == a.nodeType');
function visit84_13_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[13][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[13][1].init(3623, 47, '8 == a.nodeType && (J ? a.text : a.nodeValue).match(ha)');
function visit83_13_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[13][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][11].init(3521, 71, 'b || i(Error("Cannot find closing comment tag to match: " + a.nodeValue))');
function visit82_12_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][10].init(3511, 9, 'A(c) && e++');
function visit81_12_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][9].init(3485, 5, '0 === e');
function visit80_12_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][8].init(3474, 17, 'G(c) && (e-- , 0 === e)');
function visit79_12_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][7].init(3363, 10, '0 < c.length');
function visit78_12_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][6].init(3231, 12, 'e && Y(a, d, !f)');
function visit77_12_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][5].init(3177, 4, 'f && c');
function visit76_12_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][4].init(3177, 37, 'f && c || b.J.instance.nodeHasBindings(d)');
function visit75_12_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][3].init(3161, 12, 'f && b.e.Sa(d)');
function visit74_12_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][2].init(3146, 14, '1 === d.nodeType');
function visit73_12_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[12][1].init(765, 5, 'k === H');
function visit72_12_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[12][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][15].init(522, 29, '"function" == typeof u.update');
function visit71_11_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][14].init(522, 57, '"function" == typeof u.update && (0 , u.update)(a, f(r), g, p, m)');
function visit70_11_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][13].init(511, 68, '(u = b.c[r]) && "function" == typeof u.update && (0 , u.update)(a, f(r), g, p, m)');
function visit69_11_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][12].init(493, 5, '2 === h');
function visit68_11_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][11].init(304, 5, 'k !== H');
function visit67_11_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][10].init(304, 177, 'k !== H && i(Error("Multiple bindings (" + k + " and " + r + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element."))');
function visit66_11_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][9].init(246, 57, '(u = (0 , u.init)(a, f(r), g, p, m)) && u.controlsDescendantBindings');
function visit65_11_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][8].init(218, 25, '"function" == typeof u.init');
function visit64_11_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][7].init(218, 85, '"function" == typeof u.init && (u = (0 , u.init)(a, f(r), g, p, m)) && u.controlsDescendantBindings');
function visit63_11_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][6].init(215, 88, 'u && "function" == typeof u.init && (u = (0 , u.init)(a, f(r), g, p, m)) && u.controlsDescendantBindings');
function visit62_11_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][5].init(132, 79, '!b.e.I[r] && i(Error("The binding \'" + r + "\' cannot be used with virtual elements"))');
function visit61_11_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][4].init(116, 14, '8 === a.nodeType');
function visit60_11_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][3].init(116, 95, '8 === a.nodeType && !b.e.I[r] && i(Error("The binding \'" + r + "\' cannot be used with virtual elements"))');
function visit59_11_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][2].init(113, 98, 'u && 8 === a.nodeType && !b.e.I[r] && i(Error("The binding \'" + r + "\' cannot be used with virtual elements"))');
function visit58_11_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[11][1].init(73, 5, '0 === h');
function visit57_11_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[11][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][8].init(2515, 20, '"function" == typeof d');
function visit56_10_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][7].init(2515, 63, '("function" == typeof d ? d(m, a) : d) || b.J.instance.getBindings(a, m)');
function visit55_10_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][6].init(2512, 66, 'j = ("function" == typeof d ? d(m, a) : d) || b.J.instance.getBindings(a, m)');
function visit54_10_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][5].init(2496, 12, 'e && b.cb(a, m)');
function visit53_10_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][4].init(2446, 19, 'c && c instanceof b.z');
function visit52_10_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][3].init(66, 93, 'h || i(Error("This template engine does not support the \'" + g + "\' binding within its templates"))');
function visit51_10_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][2].init(36, 29, '(g = h(a[f].value)) && i(Error(g))');
function visit50_10_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[10][1].init(13, 21, '"function" === typeof h');
function visit49_10_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[10][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][12].init(2003, 19, 'e.hasOwnProperty(g)');
function visit48_9_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][11].init(1969, 10, 'f < a.length');
function visit47_9_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][10].init(1897, 14, '8 === e.nodeType');
function visit46_9_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][9].init(1881, 14, '1 === e.nodeType');
function visit45_9_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][8].init(1881, 30, '1 === e.nodeType || 8 === e.nodeType');
function visit44_9_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][7].init(1881, 37, '(1 === e.nodeType || 8 === e.nodeType) && c(e)');
function visit43_9_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][6].init(1849, 8, '(e = a) !== d');
function visit42_9_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][5].init(1845, 12, 'a && (e = a) !== d');
function visit41_9_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][4].init(1694, 8, 'a.length');
function visit40_9_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][3].init(1657, 10, '0 < a.length');
function visit39_9_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][2].init(428, 49, 'f.afterRender && b.r.K(f.afterRender, n, [c, e.$data])');
function visit38_9_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[9][1].init(417, 61, 'g && (T(c, e) , f.afterRender && b.r.K(f.afterRender, n, [c, e.$data]))');
function visit37_9_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[9][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][11].init(1283, 30, '"number" != typeof c[0].nodeType');
function visit36_8_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][10].init(1271, 10, '0 < c.length');
function visit35_8_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][9].init(1271, 42, '0 < c.length && "number" != typeof c[0].nodeType');
function visit34_8_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][8].init(1244, 25, '"number" != typeof c.length');
function visit33_8_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][7].init(1244, 69, '"number" != typeof c.length || 0 < c.length && "number" != typeof c[0].nodeType');
function visit32_8_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][6].init(1244, 133, '("number" != typeof c.length || 0 < c.length && "number" != typeof c[0].nodeType) && i(Error("Template engine must return an array of DOM nodes"))');
function visit31_8_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][5].init(1180, 19, 'f.templateEngine || N');
function visit30_8_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][4].init(1159, 18, 'g && g.ownerDocument');
function visit29_8_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][3].init(1149, 7, 'a && M(a)');
function visit28_8_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][2].init(1141, 5, 'f || {}');
function visit27_8_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[8][1].init(23, 17, 's.value === j.value');
function visit26_8_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[8][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][15].init(494, 3, 'b < a');
function visit25_7_15(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][15].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][14].init(491, 6, 'f || b < a');
function visit24_7_14(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][14].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][13].init(491, 17, '(f || b < a) && (s = h[c])');
function visit23_7_13(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][13].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][12].init(448, 18, 'h.length && u.length');
function visit22_7_12(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][12].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][11].init(332, 13, 'r === j[k - 1][p]');
function visit21_7_11(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][11].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][10].init(329, 16, 'k && r === j[k - 1][p]');
function visit20_7_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][9].init(263, 13, 'r === j[k][p - 1]');
function visit19_7_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][8].init(260, 16, 'p && r === j[k][p - 1]');
function visit18_7_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][7].init(242, 4, 'k || p');
function visit17_7_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][6].init(194, 9, 'I[p - 1] || F');
function visit16_7_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][5].init(186, 7, 'z[p] || F');
function visit15_7_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][4].init(161, 15, 'a[k - 1] === b[p - 1]');
function visit14_7_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][3].init(143, 4, 'p <= y');
function visit13_7_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][2].init(90, 4, 'k <= m');
function visit12_7_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[7][1].init(60, 6, 'r - m || 1');
function visit11_7_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[7][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][10].init(533, 2, '!d');
function visit10_6_10(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][10].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][9].init(506, 5, 'd !== c');
function visit9_6_9(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][9].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][8].init(457, 10, '1 < a.length');
function visit8_6_8(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][8].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][7].init(416, 22, 'a.length && !b.a.X(a[0])');
function visit7_6_7(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][7].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][6].init(343, 11, '0 == g.length');
function visit6_6_6(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][6].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][5].init(343, 25, '0 == g.length || !b.a.X(g[0])');
function visit5_6_5(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][5].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][4].init(259, 21, 'e && b.r.K(e, n, [c, a, f])');
function visit4_6_4(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][4].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][3].init(231, 10, '0 < g.length');
function visit3_6_3(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][3].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][2].init(231, 50, '0 < g.length && (b.a.Xa(L(g), a) , e && b.r.K(e, n, [c, a, f]))');
function visit2_6_2(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][2].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].branchData[6][1].init(220, 10, 'd(c, f) || []');
function visit1_6_1(result) {
  _$jscoverage['knockout-2.2.0.js'].branchData[6][1].ranCondition(result);
  return result;
}_$jscoverage['knockout-2.2.0.js'].lineData[5]++;
(function() {
  function i(v) {
    throw v;
  }
  var l = !0, n = null, q = !1;
  function t(v) {
    return function() {
  return v;
};
  }
  ;
  var w = window, x = document, fa = navigator, E = window.jQuery, H = void 0;
  _$jscoverage['knockout-2.2.0.js'].lineData[6]++;
  function K(v) {
    function ga(a, d, c, e, f) {
      var g = [], a = b.j(function() {
  var a = visit1_6_1(d(c, f) || []);
  visit2_6_2(visit3_6_3(0 < g.length) && (b.a.Xa(L(g), a) , visit4_6_4(e && b.r.K(e, n, [c, a, f]))));
  g.splice(0, g.length);
  b.a.P(g, a);
}, n, {
  W: a, 
  Ja: function() {
  return visit5_6_5(visit6_6_6(0 == g.length) || !b.a.X(g[0]));
}});
      return {
  M: g, 
  j: a.oa() ? a : H};
    }
    function L(a) {
      for (; visit7_6_7(a.length && !b.a.X(a[0])); ) 
        a.splice(0, 1);
      if (visit8_6_8(1 < a.length)) {
        for (var d = a[0], c = a[a.length - 1], e = [d]; visit9_6_9(d !== c); ) {
          d = d.nextSibling;
          if (visit10_6_10(!d)) 
            return;
          e.push(d);
        }
        Array.prototype.splice.apply(a, [0, a.length].concat(e));
      }
      return a;
    }
    function R(a, b, c, e, f) {
      var g = Math.min, h = Math.max, j = [], k, m = a.length, p, r = b.length, u = visit11_7_1(r - m || 1), F = m + r + 1, I, z, y;
      _$jscoverage['knockout-2.2.0.js'].lineData[7]++;
      for (k = 0; visit12_7_2(k <= m); k++) {
        z = I;
        j.push(I = []);
        y = g(r, k + u);
        for (p = h(0, k - 1); visit13_7_3(p <= y); p++) 
          I[p] = p ? k ? visit14_7_4(a[k - 1] === b[p - 1]) ? z[p - 1] : g(visit15_7_5(z[p] || F), visit16_7_6(I[p - 1] || F)) + 1 : p + 1 : k + 1;
      }
      g = [];
      h = [];
      u = [];
      k = m;
      for (p = r; visit17_7_7(k || p); ) 
        r = j[k][p] - 1 , visit18_7_8(p && visit19_7_9(r === j[k][p - 1])) ? h.push(g[g.length] = {
  status: c, 
  value: b[--p], 
  index: p}) : visit20_7_10(k && visit21_7_11(r === j[k - 1][p])) ? u.push(g[g.length] = {
  status: e, 
  value: a[--k], 
  index: k}) : (g.push({
  status: "retained", 
  value: b[--p]}) , --k);
      if (visit22_7_12(h.length && u.length)) 
        for (var a = 10 * m, s, b = c = 0; visit23_7_13((visit24_7_14(f || visit25_7_15(b < a))) && (s = h[c])); c++) {
        for (e = 0; j = u[e]; e++) 
          if (visit26_8_1(s.value === j.value)) {
            s.moved = j.index;
            j.moved = s.index;
            u.splice(e, 1);
            b = e = 0;
            break;
          }
        b += e;
      }
      return g.reverse();
    }
    function S(a, d, c, e, f) {
      var f = visit27_8_2(f || {}), g = visit28_8_3(a && M(a)), g = visit29_8_4(g && g.ownerDocument), h = visit30_8_5(f.templateEngine || N);
      b.ya.ub(c, h, g);
      c = h.renderTemplate(c, e, f, g);
      visit31_8_6((visit32_8_7(visit33_8_8("number" != typeof c.length) || visit34_8_9(visit35_8_10(0 < c.length) && visit36_8_11("number" != typeof c[0].nodeType)))) && i(Error("Template engine must return an array of DOM nodes")));
      g = q;
      switch (d) {
        case "replaceChildren":
          b.e.N(a, c);
          g = l;
          break;
        case "replaceNode":
          b.a.Xa(a, c);
          g = l;
          break;
        case "ignoreTargetNode":
          break;
        default:
          _$jscoverage['knockout-2.2.0.js'].lineData[9]++;
          i(Error("Unknown renderMode: " + d));
      }
      visit37_9_1(g && (T(c, e) , visit38_9_2(f.afterRender && b.r.K(f.afterRender, n, [c, e.$data]))));
      return c;
    }
    function M(a) {
      return a.nodeType ? a : visit39_9_3(0 < a.length) ? a[0] : n;
    }
    function T(a, d) {
      if (visit40_9_4(a.length)) {
        var c = a[0], e = a[a.length - 1];
        U(c, e, function(a) {
  b.Ca(d, a);
});
        U(c, e, function(a) {
  b.s.hb(a, [d]);
});
      }
    }
    function U(a, d, c) {
      for (var e, d = b.e.nextSibling(d); visit41_9_5(a && visit42_9_6((e = a) !== d)); ) 
        a = b.e.nextSibling(e) , visit43_9_7((visit44_9_8(visit45_9_9(1 === e.nodeType) || visit46_9_10(8 === e.nodeType))) && c(e));
    }
    function V(a, d, c) {
      for (var a = b.g.aa(a), e = b.g.Q, f = 0; visit47_9_11(f < a.length); f++) {
        var g = a[f].key;
        if (visit48_9_12(e.hasOwnProperty(g))) {
          var h = e[g];
          _$jscoverage['knockout-2.2.0.js'].lineData[10]++;
                    visit49_10_1("function" === typeof h) ? visit50_10_2((g = h(a[f].value)) && i(Error(g))) : visit51_10_3(h || i(Error("This template engine does not support the '" + g + "' binding within its templates")));
        }
      }
      a = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + b.g.ba(a) + " } })()})";
      return c.createJavaScriptEvaluatorBlock(a) + d;
    }
    function W(a, d, c, e) {
      function f(a) {
        return function() {
  return j[a];
};
      }
      function g() {
        return j;
      }
      var h = 0, j, k;
      b.j(function() {
  var m = visit52_10_4(c && c instanceof b.z) ? c : new b.z(b.a.d(c)), p = m.$data;
  visit53_10_5(e && b.cb(a, m));
  if (visit54_10_6(j = visit55_10_7((visit56_10_8("function" == typeof d) ? d(m, a) : d) || b.J.instance.getBindings(a, m)))) {
    _$jscoverage['knockout-2.2.0.js'].lineData[11]++;
    if (visit57_11_1(0 === h)) {
      h = 1;
      for (var r in j) {
        var u = b.c[r];
        visit58_11_2(u && visit59_11_3(visit60_11_4(8 === a.nodeType) && visit61_11_5(!b.e.I[r] && i(Error("The binding '" + r + "' cannot be used with virtual elements")))));
        if (visit62_11_6(u && visit63_11_7(visit64_11_8("function" == typeof u.init) && visit65_11_9((u = (0 , u.init)(a, f(r), g, p, m)) && u.controlsDescendantBindings)))) 
          visit66_11_10(visit67_11_11(k !== H) && i(Error("Multiple bindings (" + k + " and " + r + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element."))) , k = r;
      }
      h = 2;
    }
    if (visit68_11_12(2 === h)) 
      for (r in j) 
      visit69_11_13((u = b.c[r]) && visit70_11_14(visit71_11_15("function" == typeof u.update) && (0 , u.update)(a, f(r), g, p, m)));
  }
}, n, {
  W: a});
      _$jscoverage['knockout-2.2.0.js'].lineData[12]++;
      return {
  Mb: visit72_12_1(k === H)};
    }
    function X(a, d, c) {
      var e = l, f = visit73_12_2(1 === d.nodeType);
      visit74_12_3(f && b.e.Sa(d));
      if (visit75_12_4(visit76_12_5(f && c) || b.J.instance.nodeHasBindings(d))) 
        e = W(d, n, a, c).Mb;
      visit77_12_6(e && Y(a, d, !f));
    }
    function Y(a, d, c) {
      for (var e = b.e.firstChild(d); d = e; ) 
        e = b.e.nextSibling(d) , X(a, d, c);
    }
    function Z(a, b) {
      var c = $(a, b);
      return c ? visit78_12_7(0 < c.length) ? c[c.length - 1].nextSibling : a.nextSibling : n;
    }
    function $(a, b) {
      for (var c = a, e = 1, f = []; c = c.nextSibling; ) {
        if (visit79_12_8(G(c) && (e-- , visit80_12_9(0 === e)))) 
          return f;
        f.push(c);
        visit81_12_10(A(c) && e++);
      }
      visit82_12_11(b || i(Error("Cannot find closing comment tag to match: " + a.nodeValue)));
      _$jscoverage['knockout-2.2.0.js'].lineData[13]++;
      return n;
    }
    function G(a) {
      return visit83_13_1(visit84_13_2(8 == a.nodeType) && (J ? a.text : a.nodeValue).match(ha));
    }
    function A(a) {
      return visit85_13_3(visit86_13_4(8 == a.nodeType) && (J ? a.text : a.nodeValue).match(ia));
    }
    function O(a, b) {
      for (var c = n; visit87_13_5(a != c); ) 
        c = a , a = a.replace(ja, function(a, c) {
  return b[c];
});
      return a;
    }
    function ka() {
      var a = [], d = [];
      this.save = function(c, e) {
  var f = b.a.i(a, c);
    visit88_13_6(0 <= f) ? d[f] = e : (a.push(c) , d.push(e));
};
      this.get = function(c) {
  c = b.a.i(a, c);
  return visit89_13_7(0 <= c) ? d[c] : H;
};
    }
    function aa(a, b, c) {
      function e(e) {
        var g = b(a[e]);
        switch (typeof g) {
          case "boolean":
          case "number":
          case "string":
          case "function":
            f[e] = g;
            break;
          case "object":
          case "undefined":
            _$jscoverage['knockout-2.2.0.js'].lineData[14]++;
            var h = c.get(g);
            _$jscoverage['knockout-2.2.0.js'].lineData[14]++;
            f[e] = visit90_14_1(h !== H) ? h : aa(g, b, c);
        }
      }
      c = visit91_14_2(c || new ka());
      a = b(a);
      if (visit92_14_3(!(visit93_14_4(visit94_14_5("object" == typeof a) && visit95_14_6(visit96_14_7(a !== n) && visit97_14_8(visit98_14_9(a !== H) && !(a instanceof Date))))))) 
        return a;
      var f = a instanceof Array ? [] : {};
      c.save(a, f);
      var g = a;
      if (visit99_14_10(g instanceof Array)) {
        for (var h = 0; visit100_14_11(h < g.length); h++) 
          e(h);
        visit101_14_12(visit102_14_13("function" == typeof g.toJSON) && e("toJSON"));
      } else 
        for (h in g) 
        e(h);
      return f;
    }
    function ba(a, d) {
      if (visit103_14_14(a)) 
        if (visit104_14_15(8 == a.nodeType)) {
        var c = b.s.Ta(a.nodeValue);
        visit105_14_16(visit106_14_17(c != n) && d.push({
  rb: a, 
  Eb: c}));
      } else if (visit107_14_18(1 == a.nodeType)) 
        for (var c = 0, e = a.childNodes, f = e.length; visit108_14_19(c < f); c++) 
        ba(e[c], d);
    }
    _$jscoverage['knockout-2.2.0.js'].lineData[15]++;
    function P(a, d, c, e) {
      b.c[a] = {
  init: function(a) {
  b.a.f.set(a, ca, {});
  return {
  controlsDescendantBindings: l};
}, 
  update: function(a, g, h, j, k) {
  var h = b.a.f.get(a, ca), g = b.a.d(g()), j = visit109_15_1(!c !== !g), m = !h.Ya;
  if (visit110_15_2(m || visit111_15_3(d || visit112_15_4(j !== h.pb)))) 
    visit113_15_5(m && (h.Ya = b.a.Ha(b.e.childNodes(a), l))) , j ? (visit114_15_6(m || b.e.N(a, b.a.Ha(h.Ya))) , b.Da(e ? e(k, g) : k, a)) : b.e.Y(a) , h.pb = j;
}};
      b.g.Q[a] = q;
      b.e.I[a] = l;
    }
    function da(a, d, c) {
      visit115_15_7(c && visit116_15_8(visit117_15_9(d !== b.k.q(a)) && b.k.T(a, d)));
      visit118_15_10(visit119_15_11(d !== b.k.q(a)) && b.r.K(b.a.Aa, n, [a, "change"]));
    }
    var b = visit120_15_12("undefined" !== typeof v) ? v : {};
    b.b = function(a, d) {
  for (var c = a.split("."), e = b, f = 0; visit121_15_13(f < c.length - 1); f++) {
    _$jscoverage['knockout-2.2.0.js'].lineData[16]++;
    e = e[c[f]];
  }
  e[c[c.length - 1]] = d;
};
    b.p = function(a, b, c) {
  a[b] = c;
};
    b.version = "2.2.0";
    b.b("version", b.version);
    b.a = new function() {
  function a(a, d) {
    if (visit122_16_1(visit123_16_2("input" !== b.a.u(a)) || visit124_16_3(!a.type || visit125_16_4("click" != d.toLowerCase())))) 
      return q;
    var c = a.type;
    return visit126_16_5(visit127_16_6("checkbox" == c) || visit128_16_7("radio" == c));
  }
  var d = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, c = {}, e = {};
  c[/Firefox\/2/i.test(fa.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"];
  c.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
  _$jscoverage['knockout-2.2.0.js'].lineData[17]++;
  for (var f in c) {
    var g = c[f];
    if (visit129_17_1(g.length)) 
      for (var h = 0, j = g.length; visit130_17_2(h < j); h++) 
      e[g[h]] = f;
  }
  var k = {
  propertychange: l}, m, c = 3;
  f = x.createElement("div");
  for (g = f.getElementsByTagName("i"); f.innerHTML = "<!--[if gt IE " + ++c + "]><i></i><![endif]-->" , g[0]; ) 
    ;
  m = visit131_17_3(4 < c) ? c : H;
  return {
  Ma: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/], 
  o: function(a, b) {
  for (var d = 0, c = a.length; visit132_17_4(d < c); d++) 
    b(a[d]);
}, 
  i: function(a, b) {
  if (visit133_17_5("function" == typeof Array.prototype.indexOf)) 
    return Array.prototype.indexOf.call(a, b);
  for (var d = 0, c = a.length; visit134_17_6(d < c); d++) 
    if (visit135_18_1(a[d] === b)) 
      return d;
  return -1;
}, 
  kb: function(a, b, d) {
  for (var c = 0, e = a.length; visit136_18_2(c < e); c++) 
    if (visit137_18_3(b.call(d, a[c]))) 
      return a[c];
  return n;
}, 
  ga: function(a, d) {
  var c = b.a.i(a, d);
  visit138_18_4(visit139_18_5(0 <= c) && a.splice(c, 1));
}, 
  Fa: function(a) {
  for (var a = visit140_18_6(a || []), d = [], c = 0, e = a.length; visit141_18_7(c < e); c++) 
    visit142_18_8(visit143_18_9(0 > b.a.i(d, a[c])) && d.push(a[c]));
  return d;
}, 
  V: function(a, b) {
  for (var a = visit144_18_10(a || []), d = [], c = 0, e = a.length; visit145_18_11(c < e); c++) 
    d.push(b(a[c]));
  return d;
}, 
  fa: function(a, b) {
  for (var a = visit146_18_12(a || []), d = [], c = 0, e = a.length; visit147_18_13(c < e); c++) 
    visit148_18_14(b(a[c]) && d.push(a[c]));
  return d;
}, 
  P: function(a, b) {
  if (visit149_18_15(b instanceof Array)) 
    a.push.apply(a, b);
  else 
    for (var d = 0, c = b.length; visit150_19_1(d < c); d++) 
    a.push(b[d]);
  return a;
}, 
  extend: function(a, b) {
  if (visit151_19_2(b)) 
    for (var d in b) 
    visit152_19_3(b.hasOwnProperty(d) && (a[d] = b[d]));
  return a;
}, 
  ka: function(a) {
  for (; a.firstChild; ) 
    b.removeNode(a.firstChild);
}, 
  Gb: function(a) {
  for (var a = b.a.L(a), d = x.createElement("div"), c = 0, e = a.length; visit153_19_4(c < e); c++) 
    d.appendChild(b.A(a[c]));
  return d;
}, 
  Ha: function(a, d) {
  for (var c = 0, e = a.length, g = []; visit154_19_5(c < e); c++) {
    var f = a[c].cloneNode(l);
    g.push(d ? b.A(f) : f);
  }
  return g;
}, 
  N: function(a, d) {
  b.a.ka(a);
  if (visit155_19_6(d)) 
    for (var c = 0, e = d.length; visit156_19_7(c < e); c++) 
    a.appendChild(d[c]);
}, 
  Xa: function(a, d) {
  _$jscoverage['knockout-2.2.0.js'].lineData[20]++;
  var c = a.nodeType ? [a] : a;
  if (visit157_20_1(0 < c.length)) {
    for (var e = c[0], g = e.parentNode, f = 0, h = d.length; visit158_20_2(f < h); f++) 
      g.insertBefore(d[f], e);
    f = 0;
    for (h = c.length; visit159_20_3(f < h); f++) 
      b.removeNode(c[f]);
  }
}, 
  ab: function(a, b) {
    visit160_20_4(7 > m) ? a.setAttribute("selected", b) : a.selected = b;
}, 
  D: function(a) {
  return (visit161_20_5(a || "")).replace(d, "");
}, 
  Qb: function(a, d) {
  for (var c = [], e = (visit162_20_6(a || "")).split(d), f = 0, g = e.length; visit163_20_7(f < g); f++) {
    var h = b.a.D(e[f]);
    visit164_20_8(visit165_20_9("" !== h) && c.push(h));
  }
  return c;
}, 
  Nb: function(a, b) {
  a = visit166_20_10(a || "");
  return visit167_20_11(b.length > a.length) ? q : visit168_20_12(a.substring(0, b.length) === b);
}, 
  sb: function(a, b) {
  if (visit169_20_13(b.compareDocumentPosition)) 
    return visit170_20_14(16 == (b.compareDocumentPosition(a) & 16));
  _$jscoverage['knockout-2.2.0.js'].lineData[21]++;
  for (; visit171_21_1(a != n); ) {
    if (visit172_21_2(a == b)) 
      return l;
    a = a.parentNode;
  }
  return q;
}, 
  X: function(a) {
  return b.a.sb(a, a.ownerDocument);
}, 
  u: function(a) {
  return visit173_21_3(a && visit174_21_4(a.tagName && a.tagName.toLowerCase()));
}, 
  n: function(b, d, c) {
  var e = visit175_21_5(m && k[d]);
  if (visit176_21_6(!e && visit177_21_7("undefined" != typeof E))) {
    if (visit178_21_8(a(b, d))) 
      var f = c, c = function(a, b) {
  var d = this.checked;
  visit179_21_9(b && (this.checked = visit180_21_10(b.mb !== l)));
  f.call(this, a);
  this.checked = d;
};
    E(b).bind(d, c);
  } else 
    visit181_21_11(!e && visit182_21_12("function" == typeof b.addEventListener)) ? b.addEventListener(d, c, q) : visit183_21_13("undefined" != typeof b.attachEvent) ? b.attachEvent("on" + d, function(a) {
  _$jscoverage['knockout-2.2.0.js'].lineData[22]++;
  c.call(b, a);
}) : i(Error("Browser doesn't support addEventListener or attachEvent"));
}, 
  Aa: function(b, d) {
  visit184_22_1((visit185_22_2(!b || !b.nodeType)) && i(Error("element must be a DOM node when calling triggerEvent")));
  if (visit186_22_3("undefined" != typeof E)) {
    var c = [];
    visit187_22_4(a(b, d) && c.push({
  mb: b.checked}));
    E(b).trigger(d, c);
  } else 
    visit188_22_5("function" == typeof x.createEvent) ? visit189_22_6("function" == typeof b.dispatchEvent) ? (c = x.createEvent(visit190_22_7(e[d] || "HTMLEvents")) , c.initEvent(d, l, l, w, 0, 0, 0, 0, 0, q, q, q, q, 0, b) , b.dispatchEvent(c)) : i(Error("The supplied element doesn't support dispatchEvent")) : visit191_23_1("undefined" != typeof b.fireEvent) ? (visit192_23_2(a(b, d) && (b.checked = visit193_23_3(b.checked !== l))) , b.fireEvent("on" + d)) : i(Error("Browser doesn't support triggering events"));
}, 
  d: function(a) {
  _$jscoverage['knockout-2.2.0.js'].lineData[23]++;
  return b.$(a) ? a() : a;
}, 
  ta: function(a) {
  return b.$(a) ? a.t() : a;
}, 
  da: function(a, d, c) {
  if (visit194_23_4(d)) {
    var e = /[\w-]+/g, f = visit195_23_5(a.className.match(e) || []);
    b.a.o(d.match(e), function(a) {
  var d = b.a.i(f, a);
    visit196_23_6(0 <= d) ? visit197_23_7(c || f.splice(d, 1)) : visit198_23_8(c && f.push(a));
});
    a.className = f.join(" ");
  }
}, 
  bb: function(a, d) {
  var c = b.a.d(d);
  if (visit199_23_9(visit200_23_10(c === n) || visit201_23_11(c === H))) 
    c = "";
  if (visit202_23_12(3 === a.nodeType)) 
    a.data = c;
  else {
    var e = b.e.firstChild(a);
    _$jscoverage['knockout-2.2.0.js'].lineData[24]++;
        visit203_24_1(!e || visit204_24_2(visit205_24_3(3 != e.nodeType) || b.e.nextSibling(e))) ? b.e.N(a, [x.createTextNode(c)]) : e.data = c;
    b.a.vb(a);
  }
}, 
  $a: function(a, b) {
  a.name = b;
  if (visit206_24_4(7 >= m)) 
    try {
    a.mergeAttributes(x.createElement("<input name='" + a.name + "'/>"), q);
  }  catch (d) {
}
}, 
  vb: function(a) {
  visit207_24_5(visit208_24_6(9 <= m) && (a = visit209_24_7(1 == a.nodeType) ? a : a.parentNode , visit210_24_8(a.style && (a.style.zoom = a.style.zoom))));
}, 
  tb: function(a) {
  if (visit211_24_9(9 <= m)) {
    var b = a.style.width;
    a.style.width = 0;
    a.style.width = b;
  }
}, 
  Kb: function(a, d) {
  for (var a = b.a.d(a), d = b.a.d(d), c = [], e = a; visit212_24_10(e <= d); e++) 
    c.push(e);
  return c;
}, 
  L: function(a) {
  for (var b = [], d = 0, c = a.length; visit213_24_11(d < c); d++) {
    _$jscoverage['knockout-2.2.0.js'].lineData[25]++;
    b.push(a[d]);
  }
  return b;
}, 
  Ob: visit214_25_1(6 === m), 
  Pb: visit215_25_2(7 === m), 
  Z: m, 
  Na: function(a, d) {
  for (var c = b.a.L(a.getElementsByTagName("input")).concat(b.a.L(a.getElementsByTagName("textarea"))), e = visit216_25_3("string" == typeof d) ? function(a) {
  return visit217_25_4(a.name === d);
} : function(a) {
  return d.test(a.name);
}, f = [], g = c.length - 1; visit218_25_5(0 <= g); g--) 
    visit219_25_6(e(c[g]) && f.push(c[g]));
  return f;
}, 
  Hb: function(a) {
  return visit220_25_7(visit221_25_8("string" == typeof a) && (a = b.a.D(a))) ? visit222_25_9(w.JSON && w.JSON.parse) ? w.JSON.parse(a) : (new Function("return " + a))() : n;
}, 
  wa: function(a, d, c) {
  visit223_25_10((visit224_25_11(visit225_25_12("undefined" == typeof JSON) || visit226_25_13("undefined" == typeof JSON.stringify))) && i(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")));
  _$jscoverage['knockout-2.2.0.js'].lineData[26]++;
  return JSON.stringify(b.a.d(a), d, c);
}, 
  Ib: function(a, d, c) {
  var c = visit227_26_1(c || {}), e = visit228_26_2(c.params || {}), f = visit229_26_3(c.includeFields || this.Ma), g = a;
  if (visit230_26_4(visit231_26_5("object" == typeof a) && visit232_26_6("form" === b.a.u(a)))) 
    for (var g = a.action, h = f.length - 1; visit233_26_7(0 <= h); h--) 
    for (var j = b.a.Na(a, f[h]), k = j.length - 1; visit234_26_8(0 <= k); k--) 
      e[j[k].name] = j[k].value;
  var d = b.a.d(d), m = x.createElement("form");
  _$jscoverage['knockout-2.2.0.js'].lineData[27]++;
  m.style.display = "none";
  m.action = g;
  m.method = "post";
  for (var v in d) 
    a = x.createElement("input") , a.name = v , a.value = b.a.wa(b.a.d(d[v])) , m.appendChild(a);
  for (v in e) 
    a = x.createElement("input") , a.name = v , a.value = e[v] , m.appendChild(a);
  x.body.appendChild(m);
    c.submitter ? c.submitter(m) : m.submit();
  setTimeout(function() {
  m.parentNode.removeChild(m);
}, 0);
}};
}();
    b.b("utils", b.a);
    b.b("utils.arrayForEach", b.a.o);
    b.b("utils.arrayFirst", b.a.kb);
    b.b("utils.arrayFilter", b.a.fa);
    b.b("utils.arrayGetDistinctValues", b.a.Fa);
    b.b("utils.arrayIndexOf", b.a.i);
    _$jscoverage['knockout-2.2.0.js'].lineData[28]++;
    b.b("utils.arrayMap", b.a.V);
    b.b("utils.arrayPushAll", b.a.P);
    b.b("utils.arrayRemoveItem", b.a.ga);
    b.b("utils.extend", b.a.extend);
    b.b("utils.fieldsIncludedWithJsonPost", b.a.Ma);
    b.b("utils.getFormFields", b.a.Na);
    b.b("utils.peekObservable", b.a.ta);
    b.b("utils.postJson", b.a.Ib);
    b.b("utils.parseJson", b.a.Hb);
    b.b("utils.registerEventHandler", b.a.n);
    b.b("utils.stringifyJson", b.a.wa);
    b.b("utils.range", b.a.Kb);
    b.b("utils.toggleDomNodeCssClass", b.a.da);
    b.b("utils.triggerEvent", b.a.Aa);
    b.b("utils.unwrapObservable", b.a.d);
    _$jscoverage['knockout-2.2.0.js'].lineData[29]++;
    visit235_29_1(Function.prototype.bind || (Function.prototype.bind = function(a) {
  var b = this, c = Array.prototype.slice.call(arguments), a = c.shift();
  return function() {
  return b.apply(a, c.concat(Array.prototype.slice.call(arguments)));
};
}));
    b.a.f = new function() {
  var a = 0, d = "__ko__" + (new Date()).getTime(), c = {};
  return {
  get: function(a, d) {
  var c = b.a.f.getAll(a, q);
  return visit236_29_2(c === H) ? H : c[d];
}, 
  set: function(a, d, c) {
  visit237_29_3(visit238_29_4(visit239_29_5(c === H) && visit240_29_6(b.a.f.getAll(a, q) === H)) || (b.a.f.getAll(a, l)[d] = c));
}, 
  getAll: function(b, f) {
  var g = b[d];
  if (visit241_29_7(!g || !(visit242_29_8(visit243_29_9("null" !== g) && c[g])))) {
    if (visit244_29_10(!f)) 
      return H;
    _$jscoverage['knockout-2.2.0.js'].lineData[30]++;
    g = b[d] = "ko" + a++;
    c[g] = {};
  }
  return c[g];
}, 
  clear: function(a) {
  var b = a[d];
  return b ? (delete c[b] , a[d] = n , l) : q;
}};
}();
    b.b("utils.domData", b.a.f);
    b.b("utils.domData.clear", b.a.f.clear);
    b.a.F = new function() {
  function a(a, d) {
    var e = b.a.f.get(a, c);
    visit245_30_1(visit246_30_2(e === H) && visit247_30_3(d && (e = [] , b.a.f.set(a, c, e))));
    return e;
  }
  function d(c) {
    var e = a(c, q);
    if (visit248_30_4(e)) 
      for (var e = e.slice(0), j = 0; visit249_30_5(j < e.length); j++) 
      e[j](c);
    b.a.f.clear(c);
    visit250_30_6(visit251_30_7("function" == typeof E) && visit252_30_8(visit253_30_9("function" == typeof E.cleanData) && E.cleanData([c])));
    if (visit254_30_10(f[c.nodeType])) 
      for (e = c.firstChild; c = e; ) 
      e = c.nextSibling , visit255_30_11(visit256_30_12(8 === c.nodeType) && d(c));
  }
  _$jscoverage['knockout-2.2.0.js'].lineData[31]++;
  var c = "__ko_domNodeDisposal__" + (new Date()).getTime(), e = {
  1: l, 
  8: l, 
  9: l}, f = {
  1: l, 
  9: l};
  return {
  Ba: function(b, d) {
  visit257_31_1(visit258_31_2("function" != typeof d) && i(Error("Callback must be a function")));
  a(b, l).push(d);
}, 
  Wa: function(d, e) {
  var f = a(d, q);
  visit259_31_3(f && (b.a.ga(f, e) , visit260_31_4(visit261_31_5(0 == f.length) && b.a.f.set(d, c, H))));
}, 
  A: function(a) {
  if (visit262_31_6(e[a.nodeType] && (d(a) , f[a.nodeType]))) {
    var c = [];
    b.a.P(c, a.getElementsByTagName("*"));
    for (var j = 0, k = c.length; visit263_31_7(j < k); j++) 
      d(c[j]);
  }
  return a;
}, 
  removeNode: function(a) {
  b.A(a);
  visit264_31_8(a.parentNode && a.parentNode.removeChild(a));
}};
}();
    b.A = b.a.F.A;
    _$jscoverage['knockout-2.2.0.js'].lineData[32]++;
    b.removeNode = b.a.F.removeNode;
    b.b("cleanNode", b.A);
    b.b("removeNode", b.removeNode);
    b.b("utils.domNodeDisposal", b.a.F);
    b.b("utils.domNodeDisposal.addDisposeCallback", b.a.F.Ba);
    b.b("utils.domNodeDisposal.removeDisposeCallback", b.a.F.Wa);
    b.a.sa = function(a) {
  var d;
  if (visit265_32_1("undefined" != typeof E)) {
    if (visit266_32_2((d = E.clean([a])) && d[0])) {
      for (a = d[0]; visit267_32_3(a.parentNode && visit268_32_4(11 !== a.parentNode.nodeType)); ) 
        a = a.parentNode;
      visit269_32_5(a.parentNode && a.parentNode.removeChild(a));
    }
  } else {
    var c = b.a.D(a).toLowerCase();
    d = x.createElement("div");
    c = visit270_32_6(visit271_32_7(c.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"]) || visit272_33_1(visit273_33_2(!c.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"]) || visit274_33_3(visit275_33_4((visit276_33_5(!c.indexOf("<td") || !c.indexOf("<th"))) && [3, "<table><tbody><tr>", "</tr></tbody></table>"]) || [0, "", ""])));
    _$jscoverage['knockout-2.2.0.js'].lineData[33]++;
    a = "ignored<div>" + c[1] + a + c[2] + "</div>";
    for (visit277_33_6("function" == typeof w.innerShiv) ? d.appendChild(w.innerShiv(a)) : d.innerHTML = a; c[0]--; ) 
      d = d.lastChild;
    d = b.a.L(d.lastChild.childNodes);
  }
  return d;
};
    b.a.ca = function(a, d) {
  b.a.ka(a);
  d = b.a.d(d);
  if (visit278_33_7(visit279_33_8(d !== n) && visit280_33_9(d !== H))) 
    if (visit281_33_10(visit282_33_11(visit283_33_12("string" != typeof d) && (d = d.toString())) , visit284_33_13("undefined" != typeof E))) 
    E(a).html(d);
  else 
    for (var c = b.a.sa(d), e = 0; visit285_34_1(e < c.length); e++) {
    _$jscoverage['knockout-2.2.0.js'].lineData[34]++;
    a.appendChild(c[e]);
  }
};
    b.b("utils.parseHtmlFragment", b.a.sa);
    b.b("utils.setHtml", b.a.ca);
    var Q = {};
    b.s = {
  qa: function(a) {
  visit286_34_2(visit287_34_3("function" != typeof a) && i(Error("You can only pass a function to ko.memoization.memoize()")));
  var b = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
  Q[b] = a;
  return "<!--[ko_memo:" + b + "]-->";
}, 
  gb: function(a, b) {
  var c = Q[a];
  visit288_34_4(visit289_34_5(c === H) && i(Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized.")));
  _$jscoverage['knockout-2.2.0.js'].lineData[35]++;
  try {
    return c.apply(n, visit290_35_1(b || [])) , l;
  } finally   {
    delete Q[a];
  }
}, 
  hb: function(a, d) {
  var c = [];
  ba(a, c);
  for (var e = 0, f = c.length; visit291_35_2(e < f); e++) {
    var g = c[e].rb, h = [g];
    visit292_35_3(d && b.a.P(h, d));
    b.s.gb(c[e].Eb, h);
    g.nodeValue = "";
    visit293_35_4(g.parentNode && g.parentNode.removeChild(g));
  }
}, 
  Ta: function(a) {
  return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : n;
}};
    b.b("memoization", b.s);
    b.b("memoization.memoize", b.s.qa);
    b.b("memoization.unmemoize", b.s.gb);
    b.b("memoization.parseMemoText", b.s.Ta);
    b.b("memoization.unmemoizeDomNodeAndDescendants", b.s.hb);
    b.La = {
  throttle: function(a, d) {
  _$jscoverage['knockout-2.2.0.js'].lineData[36]++;
  a.throttleEvaluation = d;
  var c = n;
  return b.j({
  read: a, 
  write: function(b) {
  clearTimeout(c);
  c = setTimeout(function() {
  a(b);
}, d);
}});
}, 
  notify: function(a, d) {
  a.equalityComparer = visit294_36_1("always" == d) ? t(q) : b.m.fn.equalityComparer;
  return a;
}};
    b.b("extenders", b.La);
    b.eb = function(a, d, c) {
  this.target = a;
  this.ha = d;
  this.qb = c;
  b.p(this, "dispose", this.B);
};
    b.eb.prototype.B = function() {
  this.Bb = l;
  this.qb();
};
    b.S = function() {
  this.w = {};
  b.a.extend(this, b.S.fn);
  b.p(this, "subscribe", this.xa);
  b.p(this, "extend", this.extend);
  b.p(this, "getSubscriptionsCount", this.xb);
};
    _$jscoverage['knockout-2.2.0.js'].lineData[37]++;
    b.S.fn = {
  xa: function(a, d, c) {
  var c = visit295_37_1(c || "change"), a = d ? a.bind(d) : a, e = new b.eb(this, a, function() {
  b.a.ga(this.w[c], e);
}.bind(this));
  visit296_37_2(this.w[c] || (this.w[c] = []));
  this.w[c].push(e);
  return e;
}, 
  notifySubscribers: function(a, d) {
  d = visit297_37_3(d || "change");
  visit298_37_4(this.w[d] && b.r.K(function() {
  b.a.o(this.w[d].slice(0), function(b) {
  visit299_37_5(b && visit300_37_6(visit301_37_7(b.Bb !== l) && b.ha(a)));
});
}, this));
}, 
  xb: function() {
  var a = 0, b;
  for (b in this.w) 
    visit302_37_8(this.w.hasOwnProperty(b) && (a += this.w[b].length));
  return a;
}, 
  extend: function(a) {
  var d = this;
  if (visit303_37_9(a)) 
    for (var c in a) {
    var e = b.La[c];
    visit304_37_10(visit305_37_11("function" == typeof e) && (d = e(d, a[c])));
  }
  _$jscoverage['knockout-2.2.0.js'].lineData[38]++;
  return d;
}};
    b.Pa = function(a) {
  return visit306_38_1(visit307_38_2("function" == typeof a.xa) && visit308_38_3("function" == typeof a.notifySubscribers));
};
    b.b("subscribable", b.S);
    b.b("isSubscribable", b.Pa);
    var B = [];
    b.r = {
  lb: function(a) {
  B.push({
  ha: a, 
  Ka: []});
}, 
  end: function() {
  B.pop();
}, 
  Va: function(a) {
  visit309_38_4(b.Pa(a) || i(Error("Only subscribable things can act as dependencies")));
  if (visit310_38_5(0 < B.length)) {
    var d = B[B.length - 1];
    visit311_38_6(d && visit312_38_7(!(visit313_38_8(0 <= b.a.i(d.Ka, a))) && (d.Ka.push(a) , d.ha(a))));
  }
}, 
  K: function(a, b, c) {
  try {
    return B.push(n) , a.apply(b, visit314_38_9(c || []));
  } finally   {
    B.pop();
  }
}};
    var la = {
  undefined: l, 
  "boolean": l, 
  number: l, 
  string: l};
    _$jscoverage['knockout-2.2.0.js'].lineData[39]++;
    b.m = function(a) {
  function d() {
    if (visit315_39_1(0 < arguments.length)) {
      if (visit316_39_2(!d.equalityComparer || !d.equalityComparer(c, arguments[0]))) 
        d.H() , c = arguments[0] , d.G();
      return this;
    }
    b.r.Va(d);
    return c;
  }
  var c = a;
  b.S.call(d);
  d.t = function() {
  return c;
};
  d.G = function() {
  d.notifySubscribers(c);
};
  d.H = function() {
  d.notifySubscribers(c, "beforeChange");
};
  b.a.extend(d, b.m.fn);
  b.p(d, "peek", d.t);
  b.p(d, "valueHasMutated", d.G);
  b.p(d, "valueWillMutate", d.H);
  return d;
};
    b.m.fn = {
  equalityComparer: function(a, b) {
  return visit317_39_3(visit318_39_4(a === n) || typeof a in la) ? visit319_40_1(a === b) : q;
}};
    _$jscoverage['knockout-2.2.0.js'].lineData[40]++;
    var D = b.m.Jb = "__ko_proto__";
    b.m.fn[D] = b.m;
    b.la = function(a, d) {
  return visit320_40_2(visit321_40_3(a === n) || visit322_40_4(visit323_40_5(a === H) || visit324_40_6(a[D] === H))) ? q : visit325_40_7(a[D] === d) ? l : b.la(a[D], d);
};
    b.$ = function(a) {
  return b.la(a, b.m);
};
    b.Qa = function(a) {
  return visit326_40_8(visit327_40_9(visit328_40_10("function" == typeof a) && visit329_40_11(a[D] === b.m)) || visit330_40_12(visit331_40_13("function" == typeof a) && visit332_40_14(visit333_40_15(a[D] === b.j) && a.yb))) ? l : q;
};
    b.b("observable", b.m);
    b.b("isObservable", b.$);
    b.b("isWriteableObservable", b.Qa);
    b.R = function(a) {
  visit334_40_16(visit335_40_17(0 == arguments.length) && (a = []));
  visit336_40_18(visit337_40_19(a !== n) && visit338_40_20((visit339_40_21(visit340_40_22(a !== H) && !("length" in a))) && i(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."))));
  _$jscoverage['knockout-2.2.0.js'].lineData[41]++;
  var d = b.m(a);
  b.a.extend(d, b.R.fn);
  return d;
};
    b.R.fn = {
  remove: function(a) {
  for (var b = this.t(), c = [], e = visit341_41_1("function" == typeof a) ? a : function(b) {
  return visit342_41_2(b === a);
}, f = 0; visit343_41_3(f < b.length); f++) {
    var g = b[f];
    visit344_41_4(e(g) && (visit345_41_5(visit346_41_6(0 === c.length) && this.H()) , c.push(g) , b.splice(f, 1) , f--));
  }
  visit347_41_7(c.length && this.G());
  return c;
}, 
  removeAll: function(a) {
  if (visit348_41_8(a === H)) {
    var d = this.t(), c = d.slice(0);
    this.H();
    d.splice(0, d.length);
    this.G();
    return c;
  }
  return !a ? [] : this.remove(function(d) {
  return visit349_41_9(0 <= b.a.i(a, d));
});
}, 
  destroy: function(a) {
  var b = this.t(), c = visit350_41_10("function" == typeof a) ? a : function(b) {
  return visit351_41_11(b === a);
};
  _$jscoverage['knockout-2.2.0.js'].lineData[42]++;
  this.H();
  for (var e = b.length - 1; visit352_42_1(0 <= e); e--) 
    visit353_42_2(c(b[e]) && (b[e]._destroy = l));
  this.G();
}, 
  destroyAll: function(a) {
  return visit354_42_3(a === H) ? this.destroy(t(l)) : !a ? [] : this.destroy(function(d) {
  return visit355_42_4(0 <= b.a.i(a, d));
});
}, 
  indexOf: function(a) {
  var d = this();
  return b.a.i(d, a);
}, 
  replace: function(a, b) {
  var c = this.indexOf(a);
  visit356_42_5(visit357_42_6(0 <= c) && (this.H() , this.t()[c] = b , this.G()));
}};
    b.a.o("pop push reverse shift sort splice unshift".split(" "), function(a) {
  b.R.fn[a] = function() {
  var b = this.t();
  this.H();
  b = b[a].apply(b, arguments);
  this.G();
  return b;
};
});
    b.a.o(["slice"], function(a) {
  _$jscoverage['knockout-2.2.0.js'].lineData[43]++;
  b.R.fn[a] = function() {
  var b = this();
  return b[a].apply(b, arguments);
};
});
    b.b("observableArray", b.R);
    b.j = function(a, d, c) {
  function e() {
    b.a.o(y, function(a) {
  a.B();
});
    y = [];
  }
  function f() {
    var a = h.throttleEvaluation;
        visit358_43_1(a && visit359_43_2(0 <= a)) ? (clearTimeout(s) , s = setTimeout(g, a)) : g();
  }
  function g() {
    if (visit360_43_3(!p)) 
      if (visit361_43_4(m && v())) 
      z();
    else {
      p = l;
      try {
        var a = b.a.V(y, function(a) {
  return a.target;
});
        b.r.lb(function(c) {
  var d;
    visit362_43_5(0 <= (d = b.a.i(a, c))) ? a[d] = H : y.push(c.xa(f));
});
        for (var c = r.call(d), e = a.length - 1; visit363_43_6(0 <= e); e--) 
          visit364_43_7(a[e] && y.splice(e, 1)[0].B());
        m = l;
        h.notifySubscribers(k, "beforeChange");
        _$jscoverage['knockout-2.2.0.js'].lineData[44]++;
        k = c;
      } finally       {
        b.r.end();
      }
      h.notifySubscribers(k);
      p = q;
      visit365_44_1(y.length || z());
    }
  }
  function h() {
    if (visit366_44_2(0 < arguments.length)) 
      return visit367_44_3("function" === typeof u) ? u.apply(d, arguments) : i(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")) , this;
    visit368_44_4(m || g());
    b.r.Va(h);
    return k;
  }
  function j() {
    return visit369_44_5(!m || visit370_44_6(0 < y.length));
  }
  var k, m = q, p = q, r = a;
    visit371_44_7(r && visit372_44_8("object" == typeof r)) ? (c = r , r = c.read) : (c = visit373_44_9(c || {}) , visit374_44_10(r || (r = c.read)));
  visit375_44_11(visit376_44_12("function" != typeof r) && i(Error("Pass a function that returns the value of the ko.computed")));
  _$jscoverage['knockout-2.2.0.js'].lineData[45]++;
  var u = c.write, F = visit377_45_1(c.disposeWhenNodeIsRemoved || visit378_45_2(c.W || n)), v = visit379_45_3(c.disposeWhen || visit380_45_4(c.Ja || t(q))), z = e, y = [], s = n;
  visit381_45_5(d || (d = c.owner));
  h.t = function() {
  visit382_45_6(m || g());
  return k;
};
  h.wb = function() {
  return y.length;
};
  h.yb = visit383_45_7("function" === typeof c.write);
  h.B = function() {
  z();
};
  h.oa = j;
  b.S.call(h);
  b.a.extend(h, b.j.fn);
  b.p(h, "peek", h.t);
  b.p(h, "dispose", h.B);
  b.p(h, "isActive", h.oa);
  b.p(h, "getDependenciesCount", h.wb);
  visit384_45_8(visit385_45_9(c.deferEvaluation !== l) && g());
  if (visit386_45_10(F && j())) {
    z = function() {
  b.a.F.Wa(F, arguments.callee);
  e();
};
    b.a.F.Ba(F, z);
    var C = v, v = function() {
  return visit387_45_11(!b.a.X(F) || C());
};
  }
  return h;
};
    _$jscoverage['knockout-2.2.0.js'].lineData[46]++;
    b.Ab = function(a) {
  return b.la(a, b.j);
};
    v = b.m.Jb;
    b.j[v] = b.m;
    b.j.fn = {};
    b.j.fn[v] = b.j;
    b.b("dependentObservable", b.j);
    b.b("computed", b.j);
    b.b("isComputed", b.Ab);
    b.fb = function(a) {
  visit388_46_1(visit389_46_2(0 == arguments.length) && i(Error("When calling ko.toJS, pass the object you want to convert.")));
  return aa(a, function(a) {
  for (var c = 0; visit390_46_3(b.$(a) && visit391_46_4(10 > c)); c++) 
    a = a();
  return a;
});
};
    b.toJSON = function(a, d, c) {
  a = b.fb(a);
  return b.a.wa(a, d, c);
};
    b.b("toJS", b.fb);
    b.b("toJSON", b.toJSON);
    b.k = {
  q: function(a) {
  switch (b.a.u(a)) {
    case "option":
      return visit392_46_5(a.__ko__hasDomDataOptionValue__ === l) ? b.a.f.get(a, b.c.options.ra) : visit393_47_1(7 >= b.a.Z) ? a.getAttributeNode("value").specified ? a.value : a.text : a.value;
    case "select":
      _$jscoverage['knockout-2.2.0.js'].lineData[47]++;
      return visit394_47_2(0 <= a.selectedIndex) ? b.k.q(a.options[a.selectedIndex]) : H;
    default:
      return a.value;
  }
}, 
  T: function(a, d) {
  switch (b.a.u(a)) {
    case "option":
      switch (typeof d) {
        case "string":
          b.a.f.set(a, b.c.options.ra, H);
          visit395_47_3("__ko__hasDomDataOptionValue__" in a && delete a.__ko__hasDomDataOptionValue__);
          a.value = d;
          break;
        default:
          b.a.f.set(a, b.c.options.ra, d) , a.__ko__hasDomDataOptionValue__ = l , a.value = visit396_47_4("number" === typeof d) ? d : "";
      }
      break;
    case "select":
      _$jscoverage['knockout-2.2.0.js'].lineData[48]++;
      for (var c = a.options.length - 1; visit397_48_1(0 <= c); c--) 
        if (visit398_48_2(b.k.q(a.options[c]) == d)) {
          a.selectedIndex = c;
          break;
        }
      _$jscoverage['knockout-2.2.0.js'].lineData[48]++;
      break;
    default:
      if (visit399_48_3(visit400_48_4(d === n) || visit401_48_5(d === H))) 
        d = "";
      a.value = d;
  }
}};
    b.b("selectExtensions", b.k);
    b.b("selectExtensions.readValue", b.k.q);
    b.b("selectExtensions.writeValue", b.k.T);
    var ja = /\@ko_token_(\d+)\@/g, ma = ["true", "false"], na = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;
    b.g = {
  Q: [], 
  aa: function(a) {
  var d = b.a.D(a);
  if (visit402_48_6(3 > d.length)) 
    return [];
  visit403_48_7(visit404_48_8("{" === d.charAt(0)) && (d = d.substring(1, d.length - 1)));
  for (var a = [], c = n, e, f = 0; visit405_49_1(f < d.length); f++) {
    _$jscoverage['knockout-2.2.0.js'].lineData[49]++;
    var g = d.charAt(f);
    if (visit406_49_2(c === n)) 
      switch (g) {
      case '"':
      case "'":
      case "/":
        c = f , e = g;
    }
    else if (visit407_49_3(visit408_49_4(g == e) && visit409_49_5("\\" !== d.charAt(f - 1)))) {
      g = d.substring(c, f + 1);
      a.push(g);
      var h = "@ko_token_" + (a.length - 1) + "@", d = d.substring(0, c) + h + d.substring(f + 1), f = f - (g.length - h.length), c = n;
    }
  }
  e = c = n;
  for (var j = 0, k = n, f = 0; visit410_49_6(f < d.length); f++) {
    g = d.charAt(f);
    if (visit411_49_7(c === n)) 
      switch (g) {
      case "{":
        c = f;
        k = g;
        e = "}";
        break;
      case "(":
        c = f;
        k = g;
        e = ")";
        break;
      case "[":
        c = f , k = g , e = "]";
    }
        visit412_49_8(g === k) ? j++ : visit413_49_9(visit414_49_10(g === e) && (j-- , visit415_49_11(visit416_49_12(0 === j) && (g = d.substring(c, f + 1) , a.push(g) , h = "@ko_token_" + (a.length - 1) + "@" , d = d.substring(0, c) + h + d.substring(f + 1) , f -= g.length - h.length , c = n))));
  }
  _$jscoverage['knockout-2.2.0.js'].lineData[50]++;
  e = [];
  d = d.split(",");
  c = 0;
  for (f = d.length; visit417_50_1(c < f); c++) 
    j = d[c] , k = j.indexOf(":") , visit418_50_2(visit419_50_3(0 < k) && visit420_50_4(k < j.length - 1)) ? (g = j.substring(k + 1) , e.push({
  key: O(j.substring(0, k), a), 
  value: O(g, a)})) : e.push({
  unknown: O(j, a)});
  return e;
}, 
  ba: function(a) {
  for (var d = visit421_50_5("string" === typeof a) ? b.g.aa(a) : a, c = [], a = [], e, f = 0; e = d[f]; f++) 
    if (visit422_50_6(visit423_50_7(visit424_50_8(0 < c.length) && c.push(",")) , e.key)) {
      var g;
      a:
        {
          g = e.key;
          var h = b.a.D(g);
          switch (h.length && h.charAt(0)) {
            case "'":
            case '"':
              break a;
            default:
              g = "'" + h + "'";
          }
        }
      e = e.value;
      _$jscoverage['knockout-2.2.0.js'].lineData[51]++;
      c.push(g);
      c.push(":");
      c.push(e);
      e = b.a.D(e);
            visit426_51_1(0 <= b.a.i(ma, b.a.D(e).toLowerCase())) ? e = q : (h = e.match(na) , e = visit427_51_2(h === n) ? q : h[1] ? "Object(" + h[1] + ")" + h[2] : e);
      visit428_51_3(e && (visit429_51_4(visit430_51_5(0 < a.length) && a.push(", ")) , a.push(g + " : function(__ko_value) { " + e + " = __ko_value; }")));
    } else 
      visit431_51_6(e.unknown && c.push(e.unknown));
  d = c.join("");
  visit432_51_7(visit433_51_8(0 < a.length) && (d = d + ", '_ko_property_writers' : { " + a.join("") + " } "));
  return d;
}, 
  Db: function(a, d) {
  for (var c = 0; visit434_51_9(c < a.length); c++) 
    if (visit435_51_10(b.a.D(a[c].key) == d)) 
      return l;
  return q;
}, 
  ea: function(a, d, c, e, f) {
  if (visit436_51_11(!a || !b.Qa(a))) {
    if (visit437_51_12((a = d()._ko_property_writers) && a[c])) {
      _$jscoverage['knockout-2.2.0.js'].lineData[52]++;
      a[c](e);
    }
  } else 
    visit438_52_1((visit439_52_2(!f || visit440_52_3(a.t() !== e))) && a(e));
}};
    b.b("expressionRewriting", b.g);
    b.b("expressionRewriting.bindingRewriteValidators", b.g.Q);
    b.b("expressionRewriting.parseObjectLiteral", b.g.aa);
    b.b("expressionRewriting.preProcessBindings", b.g.ba);
    b.b("jsonExpressionRewriting", b.g);
    b.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", b.g.ba);
    var J = visit441_52_4("<!--test-->" === x.createComment("test").text), ia = J ? /^<\!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\>$/ : /^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/, ha = J ? /^<\!--\s*\/ko\s*--\>$/ : /^\s*\/ko\s*$/, oa = {
  ul: l, 
  ol: l};
    _$jscoverage['knockout-2.2.0.js'].lineData[53]++;
    b.e = {
  I: {}, 
  childNodes: function(a) {
  return A(a) ? $(a) : a.childNodes;
}, 
  Y: function(a) {
  if (visit442_53_1(A(a))) 
    for (var a = b.e.childNodes(a), d = 0, c = a.length; visit443_53_2(d < c); d++) 
    b.removeNode(a[d]);
  else 
    b.a.ka(a);
}, 
  N: function(a, d) {
  if (visit444_53_3(A(a))) {
    b.e.Y(a);
    for (var c = a.nextSibling, e = 0, f = d.length; visit445_53_4(e < f); e++) 
      c.parentNode.insertBefore(d[e], c);
  } else 
    b.a.N(a, d);
}, 
  Ua: function(a, b) {
    A(a) ? a.parentNode.insertBefore(b, a.nextSibling) : a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b);
}, 
  Oa: function(a, d, c) {
    c ? A(a) ? a.parentNode.insertBefore(d, c.nextSibling) : c.nextSibling ? a.insertBefore(d, c.nextSibling) : a.appendChild(d) : b.e.Ua(a, d);
}, 
  firstChild: function(a) {
  _$jscoverage['knockout-2.2.0.js'].lineData[54]++;
  return !A(a) ? a.firstChild : visit446_54_1(!a.nextSibling || G(a.nextSibling)) ? n : a.nextSibling;
}, 
  nextSibling: function(a) {
  visit447_54_2(A(a) && (a = Z(a)));
  return visit448_54_3(a.nextSibling && G(a.nextSibling)) ? n : a.nextSibling;
}, 
  ib: function(a) {
  return (a = A(a)) ? a[1] : n;
}, 
  Sa: function(a) {
  if (visit449_54_4(oa[b.a.u(a)])) {
    var d = a.firstChild;
    if (visit450_54_5(d)) {
      do if (visit451_54_6(1 === d.nodeType)) {
        var c;
        c = d.firstChild;
        var e = n;
        if (visit452_54_7(c)) {
          do if (visit453_54_8(e)) 
            e.push(c);
          else if (visit454_54_9(A(c))) {
            var f = Z(c, l);
                        f ? c = f : e = [c];
          } else 
            visit455_54_10(G(c) && (e = [c])); while (c = c.nextSibling);
        }
        _$jscoverage['knockout-2.2.0.js'].lineData[55]++;
        if (visit456_55_1(c = e)) {
          e = d.nextSibling;
          for (f = 0; visit457_55_2(f < c.length); f++) 
                        e ? a.insertBefore(c[f], e) : a.appendChild(c[f]);
        }
      } while (d = d.nextSibling);
    }
  }
}};
    b.b("virtualElements", b.e);
    b.b("virtualElements.allowedBindings", b.e.I);
    b.b("virtualElements.emptyNode", b.e.Y);
    b.b("virtualElements.insertAfter", b.e.Oa);
    b.b("virtualElements.prepend", b.e.Ua);
    b.b("virtualElements.setDomNodeChildren", b.e.N);
    b.J = function() {
  this.Ga = {};
};
    b.a.extend(b.J.prototype, {
  nodeHasBindings: function(a) {
  switch (a.nodeType) {
    case 1:
      return visit458_55_3(a.getAttribute("data-bind") != n);
    case 8:
      _$jscoverage['knockout-2.2.0.js'].lineData[56]++;
      return visit459_56_1(b.e.ib(a) != n);
    default:
      return q;
  }
}, 
  getBindings: function(a, b) {
  var c = this.getBindingsString(a, b);
  return c ? this.parseBindingsString(c, b, a) : n;
}, 
  getBindingsString: function(a) {
  switch (a.nodeType) {
    case 1:
      return a.getAttribute("data-bind");
    case 8:
      return b.e.ib(a);
    default:
      return n;
  }
}, 
  parseBindingsString: function(a, d, c) {
  try {
    var e;
    if (visit460_56_2(!(e = this.Ga[a]))) {
      var f = this.Ga, g = "with($context){with($data||{}){return{" + b.g.ba(a) + "}}}";
      e = f[a] = new Function("$context", "$element", g);
    }
    return e(d, c);
  }  catch (h) {
  i(Error("Unable to parse bindings.\nMessage: " + h + ";\nBindings value: " + a));
}
}});
    _$jscoverage['knockout-2.2.0.js'].lineData[57]++;
    b.J.instance = new b.J();
    b.b("bindingProvider", b.J);
    b.c = {};
    b.z = function(a, d, c) {
    d ? (b.a.extend(this, d) , this.$parentContext = d , this.$parent = d.$data , this.$parents = (visit461_57_1(d.$parents || [])).slice(0) , this.$parents.unshift(this.$parent)) : (this.$parents = [] , this.$root = a , this.ko = b);
  this.$data = a;
  visit462_57_2(c && (this[c] = a));
};
    b.z.prototype.createChildContext = function(a, d) {
  return new b.z(a, this, d);
};
    b.z.prototype.extend = function(a) {
  var d = b.a.extend(new b.z(), this);
  return b.a.extend(d, a);
};
    b.cb = function(a, d) {
  if (visit463_57_3(2 == arguments.length)) {
    _$jscoverage['knockout-2.2.0.js'].lineData[58]++;
    b.a.f.set(a, "__ko_bindingContext__", d);
  } else 
    return b.a.f.get(a, "__ko_bindingContext__");
};
    b.Ea = function(a, d, c) {
  visit464_58_1(visit465_58_2(1 === a.nodeType) && b.e.Sa(a));
  return W(a, d, c, l);
};
    b.Da = function(a, b) {
  visit466_58_3((visit467_58_4(visit468_58_5(1 === b.nodeType) || visit469_58_6(8 === b.nodeType))) && Y(a, b, l));
};
    b.Ca = function(a, b) {
  visit470_58_7(b && visit471_58_8((visit472_58_9(visit473_58_10(1 !== b.nodeType) && visit474_58_11(8 !== b.nodeType))) && i(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"))));
  b = visit475_58_12(b || w.document.body);
  X(a, b, l);
};
    b.ja = function(a) {
  switch (a.nodeType) {
    case 1:
    case 8:
      var d = b.cb(a);
      if (visit476_58_13(d)) 
        return d;
      if (visit477_59_1(a.parentNode)) 
        return b.ja(a.parentNode);
  }
  return H;
};
    b.ob = function(a) {
  return (a = b.ja(a)) ? a.$data : H;
};
    b.b("bindingHandlers", b.c);
    b.b("applyBindings", b.Ca);
    b.b("applyBindingsToDescendants", b.Da);
    b.b("applyBindingsToNode", b.Ea);
    b.b("contextFor", b.ja);
    b.b("dataFor", b.ob);
    var ea = {
  "class": "className", 
  "for": "htmlFor"};
    b.c.attr = {
  update: function(a, d) {
  var c = visit478_59_2(b.a.d(d()) || {}), e;
  for (e in c) 
    if (visit479_59_3("string" == typeof e)) {
      var f = b.a.d(c[e]), g = visit480_59_4(visit481_59_5(f === q) || visit482_59_6(visit483_59_7(f === n) || visit484_59_8(f === H)));
      visit485_59_9(g && a.removeAttribute(e));
            visit486_59_10(visit487_59_11(8 >= b.a.Z) && e in ea) ? (e = ea[e] , g ? a.removeAttribute(e) : a[e] = f) : visit488_60_1(g || a.setAttribute(e, f.toString()));
      _$jscoverage['knockout-2.2.0.js'].lineData[60]++;
      visit489_60_2(visit490_60_3("name" === e) && b.a.$a(a, g ? "" : f.toString()));
    }
}};
    b.c.checked = {
  init: function(a, d, c) {
  b.a.n(a, "click", function() {
  var e;
  if (visit491_60_4("checkbox" == a.type)) 
    e = a.checked;
  else if (visit492_60_5(visit493_60_6("radio" == a.type) && a.checked)) 
    e = a.value;
  else 
    return;
  var f = d(), g = b.a.d(f);
    visit494_60_7(visit495_60_8("checkbox" == a.type) && g instanceof Array) ? (e = b.a.i(g, a.value) , visit496_60_9(a.checked && visit497_60_10(0 > e)) ? f.push(a.value) : visit498_60_11(!a.checked && visit499_60_12(visit500_60_13(0 <= e) && f.splice(e, 1)))) : b.g.ea(f, c, "checked", e, l);
});
  visit501_60_14(visit502_60_15("radio" == a.type) && visit503_60_16(!a.name && b.c.uniqueName.init(a, t(l))));
}, 
  update: function(a, d) {
  var c = b.a.d(d());
  _$jscoverage['knockout-2.2.0.js'].lineData[61]++;
    visit504_61_1("checkbox" == a.type) ? a.checked = c instanceof Array ? visit505_61_2(0 <= b.a.i(c, a.value)) : c : visit506_61_3(visit507_61_4("radio" == a.type) && (a.checked = visit508_61_5(a.value == c)));
}};
    b.c.css = {
  update: function(a, d) {
  var c = b.a.d(d());
  if (visit509_61_6("object" == typeof c)) 
    for (var e in c) {
    var f = b.a.d(c[e]);
    b.a.da(a, e, f);
  }
  else 
    c = String(visit510_61_7(c || "")) , b.a.da(a, a.__ko__cssValue, q) , a.__ko__cssValue = c , b.a.da(a, c, l);
}};
    b.c.enable = {
  update: function(a, d) {
  var c = b.a.d(d());
    visit511_61_8(c && a.disabled) ? a.removeAttribute("disabled") : visit512_61_9(!c && visit513_61_10(!a.disabled && (a.disabled = l)));
}};
    b.c.disable = {
  update: function(a, d) {
  b.c.enable.update(a, function() {
  return !b.a.d(d());
});
}};
    _$jscoverage['knockout-2.2.0.js'].lineData[62]++;
    b.c.event = {
  init: function(a, d, c, e) {
  var f = visit514_62_1(d() || {}), g;
  for (g in f) 
    (function() {
  var f = g;
  visit515_62_2(visit516_62_3("string" == typeof f) && b.a.n(a, f, function(a) {
  var g, m = d()[f];
  if (visit517_62_4(m)) {
    var p = c();
    try {
      var r = b.a.L(arguments);
      r.unshift(e);
      g = m.apply(e, r);
    } finally     {
      visit518_62_5(visit519_62_6(g !== l) && (a.preventDefault ? a.preventDefault() : a.returnValue = q));
    }
    visit520_62_7(visit521_62_8(p[f + "Bubble"] === q) && (a.cancelBubble = l , visit522_62_9(a.stopPropagation && a.stopPropagation())));
  }
}));
})();
}};
    b.c.foreach = {
  Ra: function(a) {
  return function() {
  var d = a(), c = b.a.ta(d);
  if (visit523_62_10(!c || visit524_62_11("number" == typeof c.length))) 
    return {
  foreach: d, 
  templateEngine: b.C.na};
  _$jscoverage['knockout-2.2.0.js'].lineData[63]++;
  b.a.d(d);
  return {
  foreach: c.data, 
  as: c.as, 
  includeDestroyed: c.includeDestroyed, 
  afterAdd: c.afterAdd, 
  beforeRemove: c.beforeRemove, 
  afterRender: c.afterRender, 
  beforeMove: c.beforeMove, 
  afterMove: c.afterMove, 
  templateEngine: b.C.na};
};
}, 
  init: function(a, d) {
  return b.c.template.init(a, b.c.foreach.Ra(d));
}, 
  update: function(a, d, c, e, f) {
  return b.c.template.update(a, b.c.foreach.Ra(d), c, e, f);
}};
    b.g.Q.foreach = q;
    b.e.I.foreach = l;
    b.c.hasfocus = {
  init: function(a, d, c) {
  function e(e) {
    a.__ko_hasfocusUpdating = l;
    var f = a.ownerDocument;
    visit525_63_1("activeElement" in f && (e = visit526_64_1(f.activeElement === a)));
    _$jscoverage['knockout-2.2.0.js'].lineData[64]++;
    f = d();
    b.g.ea(f, c, "hasfocus", e, l);
    a.__ko_hasfocusUpdating = q;
  }
  var f = e.bind(n, l), g = e.bind(n, q);
  b.a.n(a, "focus", f);
  b.a.n(a, "focusin", f);
  b.a.n(a, "blur", g);
  b.a.n(a, "focusout", g);
}, 
  update: function(a, d) {
  var c = b.a.d(d());
  visit527_64_2(a.__ko_hasfocusUpdating || (c ? a.focus() : a.blur() , b.r.K(b.a.Aa, n, [a, c ? "focusin" : "focusout"])));
}};
    b.c.html = {
  init: function() {
  return {
  controlsDescendantBindings: l};
}, 
  update: function(a, d) {
  b.a.ca(a, d());
}};
    var ca = "__ko_withIfBindingData";
    P("if");
    P("ifnot", q, l);
    P("with", l, q, function(a, b) {
  _$jscoverage['knockout-2.2.0.js'].lineData[65]++;
  return a.createChildContext(b);
});
    b.c.options = {
  update: function(a, d, c) {
  visit528_65_1(visit529_65_2("select" !== b.a.u(a)) && i(Error("options binding applies only to SELECT elements")));
  for (var e = visit530_65_3(0 == a.length), f = b.a.V(b.a.fa(a.childNodes, function(a) {
  return visit531_65_4(a.tagName && visit532_65_5(visit533_65_6("option" === b.a.u(a)) && a.selected));
}), function(a) {
  return visit534_65_7(b.k.q(a) || visit535_65_8(a.innerText || a.textContent));
}), g = a.scrollTop, h = b.a.d(d()); visit536_65_9(0 < a.length); ) 
    b.A(a.options[0]) , a.remove(0);
  if (visit537_65_10(h)) {
    var c = c(), j = c.optionsIncludeDestroyed;
    visit538_65_11(visit539_65_12("number" != typeof h.length) && (h = [h]));
    if (visit540_65_13(c.optionsCaption)) {
      var k = x.createElement("option");
      _$jscoverage['knockout-2.2.0.js'].lineData[66]++;
      b.a.ca(k, c.optionsCaption);
      b.k.T(k, H);
      a.appendChild(k);
    }
    for (var d = 0, m = h.length; visit541_66_1(d < m); d++) {
      var p = h[d];
      if (visit542_66_2(!p || visit543_66_3(!p._destroy || j))) {
        var k = x.createElement("option"), r = function(a, b, c) {
  var d = typeof b;
  return visit544_66_4("function" == d) ? b(a) : visit545_66_5("string" == d) ? a[b] : c;
}, u = r(p, c.optionsValue, p);
        b.k.T(k, b.a.d(u));
        p = r(p, c.optionsText, u);
        b.a.bb(k, p);
        a.appendChild(k);
      }
    }
    h = a.getElementsByTagName("option");
    d = j = 0;
    for (m = h.length; visit546_66_6(d < m); d++) 
      visit547_66_7(visit548_66_8(0 <= b.a.i(f, b.k.q(h[d]))) && (b.a.ab(h[d], l) , j++));
    a.scrollTop = g;
    visit549_66_9(e && visit550_66_10("value" in c && da(a, b.a.ta(c.value), l)));
    b.a.tb(a);
  }
}};
    _$jscoverage['knockout-2.2.0.js'].lineData[67]++;
    b.c.options.ra = "__ko.optionValueDomData__";
    b.c.selectedOptions = {
  init: function(a, d, c) {
  b.a.n(a, "change", function() {
  var e = d(), f = [];
  b.a.o(a.getElementsByTagName("option"), function(a) {
  visit551_67_1(a.selected && f.push(b.k.q(a)));
});
  b.g.ea(e, c, "value", f);
});
}, 
  update: function(a, d) {
  visit552_67_2(visit553_67_3("select" != b.a.u(a)) && i(Error("values binding applies only to SELECT elements")));
  var c = b.a.d(d());
  visit554_67_4(c && visit555_67_5(visit556_67_6("number" == typeof c.length) && b.a.o(a.getElementsByTagName("option"), function(a) {
  var d = visit557_67_7(0 <= b.a.i(c, b.k.q(a)));
  b.a.ab(a, d);
})));
}};
    b.c.style = {
  update: function(a, d) {
  _$jscoverage['knockout-2.2.0.js'].lineData[68]++;
  var c = b.a.d(visit558_68_1(d() || {})), e;
  for (e in c) 
    if (visit559_68_2("string" == typeof e)) {
      var f = b.a.d(c[e]);
      a.style[e] = visit560_68_3(f || "");
    }
}};
    b.c.submit = {
  init: function(a, d, c, e) {
  visit561_68_4(visit562_68_5("function" != typeof d()) && i(Error("The value for a submit binding must be a function")));
  b.a.n(a, "submit", function(b) {
  var c, h = d();
  try {
    c = h.call(e, a);
  } finally   {
    visit563_68_6(visit564_68_7(c !== l) && (b.preventDefault ? b.preventDefault() : b.returnValue = q));
  }
});
}};
    b.c.text = {
  update: function(a, d) {
  b.a.bb(a, d());
}};
    b.e.I.text = l;
    b.c.uniqueName = {
  init: function(a, d) {
  if (visit565_68_8(d())) {
    var c = "ko_unique_" + ++b.c.uniqueName.nb;
    b.a.$a(a, c);
  }
}};
    _$jscoverage['knockout-2.2.0.js'].lineData[69]++;
    b.c.uniqueName.nb = 0;
    b.c.value = {
  init: function(a, d, c) {
  function e() {
    h = q;
    var e = d(), f = b.k.q(a);
    b.g.ea(e, c, "value", f);
  }
  var f = ["change"], g = c().valueUpdate, h = q;
  visit566_69_1(g && (visit567_69_2(visit568_69_3("string" == typeof g) && (g = [g])) , b.a.P(f, g) , f = b.a.Fa(f)));
  if (visit569_69_4(b.a.Z && visit570_69_5((visit571_69_6(visit572_69_7("input" == a.tagName.toLowerCase()) && visit573_69_8(visit574_69_9("text" == a.type) && visit575_69_10(visit576_69_11("off" != a.autocomplete) && (visit577_69_12(!a.form || visit578_69_13("off" != a.form.autocomplete))))))) && visit579_69_14(-1 == b.a.i(f, "propertychange"))))) 
    b.a.n(a, "propertychange", function() {
  h = l;
}) , b.a.n(a, "blur", function() {
  visit580_69_15(h && e());
});
  b.a.o(f, function(c) {
  var d = e;
  visit581_69_16(b.a.Nb(c, "after") && (d = function() {
  setTimeout(e, 0);
} , c = c.substring(5)));
  _$jscoverage['knockout-2.2.0.js'].lineData[70]++;
  b.a.n(a, c, d);
});
}, 
  update: function(a, d) {
  var c = visit582_70_1("select" === b.a.u(a)), e = b.a.d(d()), f = b.k.q(a), g = visit583_70_2(e != f);
  visit584_70_3(visit585_70_4(0 === e) && visit586_70_5((visit587_70_6(visit588_70_7(0 !== f) && visit589_70_8("0" !== f))) && (g = l)));
  visit590_70_9(g && (f = function() {
  b.k.T(a, e);
} , f() , visit591_70_10(c && setTimeout(f, 0))));
  visit592_70_11(c && visit593_70_12(visit594_70_13(0 < a.length) && da(a, e, q)));
}};
    b.c.visible = {
  update: function(a, d) {
  var c = b.a.d(d()), e = visit595_70_14("none" != a.style.display);
    visit596_70_15(c && !e) ? a.style.display = "" : visit597_70_16(!c && visit598_70_17(e && (a.style.display = "none")));
}};
    b.c.click = {
  init: function(a, d, c, e) {
  return b.c.event.init.call(this, a, function() {
  var a = {};
  a.click = d();
  return a;
}, c, e);
}};
    b.v = function() {
};
    b.v.prototype.renderTemplateSource = function() {
  _$jscoverage['knockout-2.2.0.js'].lineData[71]++;
  i(Error("Override renderTemplateSource"));
};
    b.v.prototype.createJavaScriptEvaluatorBlock = function() {
  i(Error("Override createJavaScriptEvaluatorBlock"));
};
    b.v.prototype.makeTemplateSource = function(a, d) {
  if (visit599_71_1("string" == typeof a)) {
    var d = visit600_71_2(d || x), c = d.getElementById(a);
    visit601_71_3(c || i(Error("Cannot find template with ID " + a)));
    return new b.l.h(c);
  }
  if (visit602_71_4(visit603_71_5(1 == a.nodeType) || visit604_71_6(8 == a.nodeType))) 
    return new b.l.O(a);
  i(Error("Unknown template type: " + a));
};
    b.v.prototype.renderTemplate = function(a, b, c, e) {
  a = this.makeTemplateSource(a, e);
  _$jscoverage['knockout-2.2.0.js'].lineData[72]++;
  return this.renderTemplateSource(a, b, c);
};
    b.v.prototype.isTemplateRewritten = function(a, b) {
  return visit605_72_1(this.allowTemplateRewriting === q) ? l : this.makeTemplateSource(a, b).data("isRewritten");
};
    b.v.prototype.rewriteTemplate = function(a, b, c) {
  a = this.makeTemplateSource(a, c);
  b = b(a.text());
  a.text(b);
  a.data("isRewritten", l);
};
    b.b("templateEngine", b.v);
    var pa = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi, qa = /<\!--\s*ko\b\s*([\s\S]*?)\s*--\>/g;
    b.ya = {
  ub: function(a, d, c) {
  _$jscoverage['knockout-2.2.0.js'].lineData[73]++;
  visit606_73_1(d.isTemplateRewritten(a, c) || d.rewriteTemplate(a, function(a) {
  return b.ya.Fb(a, d);
}, c));
}, 
  Fb: function(a, b) {
  return a.replace(pa, function(a, e, f, g, h, j, k) {
  return V(k, e, b);
}).replace(qa, function(a, e) {
  return V(e, "<!-- ko -->", b);
});
}, 
  jb: function(a) {
  return b.s.qa(function(d, c) {
  visit607_73_2(d.nextSibling && b.Ea(d.nextSibling, a, c));
});
}};
    b.b("__tr_ambtns", b.ya.jb);
    b.l = {};
    b.l.h = function(a) {
  this.h = a;
};
    b.l.h.prototype.text = function() {
  var a = b.a.u(this.h), a = visit608_73_3("script" === a) ? "text" : visit609_73_4("textarea" === a) ? "value" : "innerHTML";
  if (visit610_73_5(0 == arguments.length)) 
    return this.h[a];
  _$jscoverage['knockout-2.2.0.js'].lineData[74]++;
  var d = arguments[0];
    visit611_74_1("innerHTML" === a) ? b.a.ca(this.h, d) : this.h[a] = d;
};
    b.l.h.prototype.data = function(a) {
  if (visit612_74_2(1 === arguments.length)) 
    return b.a.f.get(this.h, "templateSourceData_" + a);
  b.a.f.set(this.h, "templateSourceData_" + a, arguments[1]);
};
    b.l.O = function(a) {
  this.h = a;
};
    b.l.O.prototype = new b.l.h();
    b.l.O.prototype.text = function() {
  if (visit613_74_3(0 == arguments.length)) {
    var a = visit614_74_4(b.a.f.get(this.h, "__ko_anon_template__") || {});
    visit615_74_5(visit616_74_6(a.za === H) && visit617_74_7(a.ia && (a.za = a.ia.innerHTML)));
    return a.za;
  }
  b.a.f.set(this.h, "__ko_anon_template__", {
  za: arguments[0]});
};
    b.l.h.prototype.nodes = function() {
  _$jscoverage['knockout-2.2.0.js'].lineData[75]++;
  if (visit618_75_1(0 == arguments.length)) 
    return (visit619_75_2(b.a.f.get(this.h, "__ko_anon_template__") || {})).ia;
  b.a.f.set(this.h, "__ko_anon_template__", {
  ia: arguments[0]});
};
    b.b("templateSources", b.l);
    b.b("templateSources.domElement", b.l.h);
    b.b("templateSources.anonymousTemplate", b.l.O);
    var N;
    b.va = function(a) {
  visit620_75_3(visit621_75_4(a != H) && visit622_75_5(!(a instanceof b.v) && i(Error("templateEngine must inherit from ko.templateEngine"))));
  N = a;
};
    b.ua = function(a, d, c, e, f) {
  c = visit623_75_6(c || {});
  visit624_75_7(visit625_75_8((visit626_75_9(c.templateEngine || N)) == H) && i(Error("Set a template engine before calling renderTemplate")));
  _$jscoverage['knockout-2.2.0.js'].lineData[76]++;
  f = visit627_76_1(f || "replaceChildren");
  if (visit628_76_2(e)) {
    var g = M(e);
    return b.j(function() {
  var h = visit629_76_3(d && d instanceof b.z) ? d : new b.z(b.a.d(d)), j = visit630_76_4("function" == typeof a) ? a(h.$data, h) : a, h = S(e, f, j, h, c);
  visit631_76_5(visit632_76_6("replaceNode" == f) && (e = h , g = M(e)));
}, n, {
  Ja: function() {
  return visit633_76_7(!g || !b.a.X(g));
}, 
  W: visit634_76_8(g && visit635_76_9("replaceNode" == f)) ? g.parentNode : g});
  }
  return b.s.qa(function(e) {
  b.ua(a, d, c, e, "replaceNode");
});
};
    b.Lb = function(a, d, c, e, f) {
  function g(a, b) {
    T(b, j);
    visit636_76_10(c.afterRender && c.afterRender(b, a));
  }
  function h(d, e) {
    j = f.createChildContext(b.a.d(d), c.as);
    j.$index = e;
    var g = visit637_76_11("function" == typeof a) ? a(d, j) : a;
    _$jscoverage['knockout-2.2.0.js'].lineData[77]++;
    return S(n, "ignoreTargetNode", g, j, c);
  }
  var j;
  return b.j(function() {
  var a = visit638_77_1(b.a.d(d) || []);
  visit639_77_2(visit640_77_3("undefined" == typeof a.length) && (a = [a]));
  a = b.a.fa(a, function(a) {
  return visit641_77_4(c.includeDestroyed || visit642_77_5(visit643_77_6(a === H) || visit644_77_7(visit645_77_8(a === n) || !b.a.d(a._destroy))));
});
  b.r.K(b.a.Za, n, [e, a, h, c, g]);
}, n, {
  W: e});
};
    b.c.template = {
  init: function(a, d) {
  var c = b.a.d(d());
  if (visit646_77_9(visit647_77_10("string" != typeof c) && visit648_77_11(!c.name && (visit649_77_12(visit650_77_13(1 == a.nodeType) || visit651_77_14(8 == a.nodeType)))))) 
    c = visit652_77_15(1 == a.nodeType) ? a.childNodes : b.e.childNodes(a) , c = b.a.Gb(c) , (new b.l.O(a)).nodes(c);
  return {
  controlsDescendantBindings: l};
}, 
  update: function(a, d, c, e, f) {
  _$jscoverage['knockout-2.2.0.js'].lineData[78]++;
  var d = b.a.d(d()), c = {}, e = l, g, h = n;
  visit653_78_1(visit654_78_2("string" != typeof d) && (c = d , d = c.name , visit655_78_3("if" in c && (e = b.a.d(c["if"]))) , visit656_78_4(e && visit657_78_5("ifnot" in c && (e = !b.a.d(c.ifnot)))) , g = b.a.d(c.data)));
    "foreach" in c ? h = b.Lb(visit658_78_6(d || a), visit659_78_7(visit660_78_8(e && c.foreach) || []), c, a, f) : e ? (f = "data" in c ? f.createChildContext(g, c.as) : f , h = b.ua(visit661_78_9(d || a), f, c, a)) : b.e.Y(a);
  f = h;
  visit662_78_10((g = b.a.f.get(a, "__ko__templateComputedDomDataKey__")) && visit663_78_11(visit664_78_12("function" == typeof g.B) && g.B()));
  b.a.f.set(a, "__ko__templateComputedDomDataKey__", visit665_78_13(f && f.oa()) ? f : H);
}};
    b.g.Q.template = function(a) {
  a = b.g.aa(a);
  return visit666_78_14(visit667_78_15(visit668_78_16(1 == a.length) && a[0].unknown) || b.g.Db(a, "name")) ? n : "This template engine does not support anonymous templates nested within its templates";
};
    _$jscoverage['knockout-2.2.0.js'].lineData[79]++;
    b.e.I.template = l;
    b.b("setTemplateEngine", b.va);
    b.b("renderTemplate", b.ua);
    b.a.Ia = function(a, b, c) {
  a = visit669_79_1(a || []);
  b = visit670_79_2(b || []);
  return visit671_79_3(a.length <= b.length) ? R(a, b, "added", "deleted", c) : R(b, a, "deleted", "added", c);
};
    b.b("utils.compareArrays", b.a.Ia);
    b.a.Za = function(a, d, c, e, f) {
  function g(a, b) {
    s = k[b];
    visit672_79_4(visit673_79_5(v !== b) && (y[a] = s));
    s.ma(v++);
    L(s.M);
    r.push(s);
    z.push(s);
  }
  function h(a, c) {
    if (visit674_79_6(a)) 
      for (var d = 0, e = c.length; visit675_79_7(d < e); d++) 
      visit676_79_8(c[d] && b.a.o(c[d].M, function(b) {
  _$jscoverage['knockout-2.2.0.js'].lineData[80]++;
  a(b, d, c[d].U);
}));
  }
  for (var d = visit677_80_1(d || []), e = visit678_80_2(e || {}), j = visit679_80_3(b.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === H), k = visit680_80_4(b.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || []), m = b.a.V(k, function(a) {
  return a.U;
}), p = b.a.Ia(m, d), r = [], u = 0, v = 0, A = [], z = [], d = [], y = [], m = [], s, C = 0, B, D; B = p[C]; C++) 
    switch (D = B.moved , B.status) {
      case "deleted":
        visit681_80_5(visit682_80_6(D === H) && (s = k[u] , visit683_80_7(s.j && s.j.B()) , A.push.apply(A, L(s.M)) , visit684_80_8(e.beforeRemove && (d[C] = s , z.push(s)))));
        u++;
        break;
      case "retained":
        g(C, u++);
        break;
      case "added":
                visit685_80_9(D !== H) ? g(C, D) : (s = {
  U: B.value, 
  ma: b.m(v++)} , r.push(s) , z.push(s) , visit686_81_1(j || (m[C] = s)));
    }
  _$jscoverage['knockout-2.2.0.js'].lineData[81]++;
  h(e.beforeMove, y);
  b.a.o(A, e.beforeRemove ? b.A : b.removeNode);
  for (var C = 0, j = b.e.firstChild(a), G; s = z[C]; C++) {
    visit687_81_2(s.M || b.a.extend(s, ga(a, c, s.U, f, s.ma)));
    for (u = 0; p = s.M[u]; j = p.nextSibling , G = p , u++) 
      visit688_81_3(visit689_81_4(p !== j) && b.e.Oa(a, p, G));
    visit690_81_5(!s.zb && visit691_81_6(f && (f(s.U, s.M, s.ma) , s.zb = l)));
  }
  h(e.beforeRemove, d);
  h(e.afterMove, y);
  h(e.afterAdd, m);
  b.a.f.set(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult", r);
};
    b.b("utils.setDomNodeChildrenFromArrayMapping", b.a.Za);
    b.C = function() {
  this.allowTemplateRewriting = q;
};
    _$jscoverage['knockout-2.2.0.js'].lineData[82]++;
    b.C.prototype = new b.v();
    b.C.prototype.renderTemplateSource = function(a) {
  var d = visit692_82_1(!(visit693_82_2(9 > b.a.Z)) && a.nodes) ? a.nodes() : n;
  if (visit694_82_3(d)) 
    return b.a.L(d.cloneNode(l).childNodes);
  a = a.text();
  return b.a.sa(a);
};
    b.C.na = new b.C();
    b.va(b.C.na);
    b.b("nativeTemplateEngine", b.C);
    b.pa = function() {
  var a = this.Cb = function() {
  if (visit695_82_4(visit696_82_5("undefined" == typeof E) || !E.tmpl)) 
    return 0;
  try {
    if (visit697_82_6(0 <= E.tmpl.tag.tmpl.open.toString().indexOf("__"))) 
      return 2;
  }  catch (a) {
}
  return 1;
}();
  this.renderTemplateSource = function(b, c, e) {
  e = visit698_82_7(e || {});
  visit699_82_8(visit700_82_9(2 > a) && i(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.")));
  _$jscoverage['knockout-2.2.0.js'].lineData[83]++;
  var f = b.data("precompiled");
  visit701_83_1(f || (f = visit702_83_2(b.text() || "") , f = E.template(n, "{{ko_with $item.koBindingContext}}" + f + "{{/ko_with}}") , b.data("precompiled", f)));
  b = [c.$data];
  c = E.extend({
  koBindingContext: c}, e.templateOptions);
  c = E.tmpl(f, b, c);
  c.appendTo(x.createElement("div"));
  E.fragments = {};
  return c;
};
  this.createJavaScriptEvaluatorBlock = function(a) {
  return "{{ko_code ((function() { return " + a + " })()) }}";
};
  this.addTemplate = function(a, b) {
  x.write("<script type='text/html' id='" + a + "'>" + b + "</script>");
};
  visit703_83_3(visit704_83_4(0 < a) && (E.tmpl.tag.ko_code = {
  open: "__.push($1 || '');"} , E.tmpl.tag.ko_with = {
  open: "with($1) {", 
  close: "} "}));
};
    _$jscoverage['knockout-2.2.0.js'].lineData[84]++;
    b.pa.prototype = new b.v();
    v = new b.pa();
    visit705_84_1(visit706_84_2(0 < v.Cb) && b.va(v));
    b.b("jqueryTmplTemplateEngine", b.pa);
  }
    visit707_84_3(visit708_84_4("function" === typeof require) && visit709_84_5(visit710_84_6("object" === typeof exports) && visit711_84_7("object" === typeof module))) ? K(visit712_84_8(module.exports || exports)) : visit713_84_9(visit714_84_10("function" === typeof define) && define.amd) ? define(["exports"], K) : K(w.ko = {});
  l;
})();

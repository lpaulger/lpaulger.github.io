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
if (! _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js']) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'] = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[1] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[3] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[4] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[6] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[7] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[9] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[10] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[12] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[13] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[18] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[19] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[20] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[22] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[26] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[29] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[30] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[31] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[32] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[33] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[36] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[39] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[40] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[41] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[42] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[44] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[45] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[46] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[48] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[51] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[55] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[56] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[57] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[61] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[62] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[63] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[65] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[67] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[70] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[72] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[73] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[75] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[76] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[79] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[80] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[81] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[83] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[84] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[87] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[88] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[91] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[92] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[95] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[96] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[97] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[101] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[102] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[105] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[106] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[107] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[108] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[109] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[111] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[116] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[117] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[118] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[121] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[124] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[126] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[127] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[129] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[130] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[131] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[134] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[135] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[137] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[138] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[139] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[142] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[145] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[148] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[149] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[165] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[166] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[169] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[170] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[171] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[172] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[174] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[175] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[176] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[177] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[179] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[181] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[182] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[185] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[188] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[189] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[191] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[192] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[193] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[195] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[196] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[200] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[201] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[202] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[204] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[205] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[207] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[209] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[210] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[211] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[213] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[214] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[216] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[217] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[219] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[220] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[223] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[225] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[226] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[227] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[228] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[229] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[230] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[231] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[232] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[234] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[235] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[240] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[241] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[244] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[245] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[249] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[250] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[252] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[257] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[258] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[259] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[260] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[261] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[266] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[267] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[269] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[270] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[273] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[275] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[277] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[278] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[281] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[282] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[285] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[286] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[289] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[290] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[293] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[294] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[295] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[296] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[298] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[301] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[303] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[304] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[308] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[309] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[310] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[312] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[315] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[316] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[319] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[321] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[322] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[326] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[327] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[329] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[332] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[333] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[335] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[337] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[338] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[339] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[343] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[344] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[347] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[348] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[350] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[352] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[353] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[355] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[358] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[361] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[363] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[364] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[365] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[369] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[370] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[373] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[374] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[377] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[378] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[379] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[380] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[382] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[387] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[390] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[391] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[392] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[393] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[395] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[396] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[398] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[406] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[415] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[416] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[419] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[420] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[422] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[424] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[427] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[428] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[431] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[432] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[433] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[437] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[438] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[439] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[442] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[443] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[445] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[446] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[448] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[449] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[451] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[452] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[453] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[454] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[456] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[457] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[462] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[463] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[464] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[468] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[469] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[470] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[471] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[473] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[477] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[480] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[481] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[484] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[485] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[488] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[492] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[493] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[494] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[495] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[498] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[499] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[501] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[502] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[504] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[505] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[507] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[511] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[512] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[513] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[515] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[519] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[522] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[523] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[525] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[545] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[547] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[548] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[549] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[550] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[553] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[554] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[555] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[556] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[558] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[561] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[563] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[564] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[565] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[566] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[568] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[572] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[573] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[574] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[576] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[581] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[582] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[583] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[584] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[586] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[587] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[588] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[589] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[590] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[591] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[594] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[595] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[596] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[598] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[601] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[602] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[603] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[604] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[605] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[607] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[610] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[611] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[612] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[616] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[617] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[618] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[619] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[620] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[622] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[631] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[632] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[633] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[634] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[636] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[637] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[638] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[639] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[641] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[642] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[647] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[648] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[651] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[654] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[655] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[656] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[657] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[658] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[660] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[665] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[666] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[669] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[670] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[671] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[672] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[673] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[674] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[677] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[678] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[680] = 0;
}
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[1]++;
jasmine.HtmlReporterHelpers = {};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[3]++;
jasmine.HtmlReporterHelpers.createDom = function(type, attrs, childrenVarArgs) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[4]++;
  var el = document.createElement(type);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[6]++;
  for (var i = 2; i < arguments.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[7]++;
    var child = arguments[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[9]++;
    if (typeof child === 'string') {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[10]++;
      el.appendChild(document.createTextNode(child));
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[12]++;
      if (child) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[13]++;
        el.appendChild(child);
      }
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[18]++;
  for (var attr in attrs) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[19]++;
    if (attr == "className") {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[20]++;
      el[attr] = attrs[attr];
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[22]++;
      el.setAttribute(attr, attrs[attr]);
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[26]++;
  return el;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[29]++;
jasmine.HtmlReporterHelpers.getSpecStatus = function(child) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[30]++;
  var results = child.results();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[31]++;
  var status = results.passed() ? 'passed' : 'failed';
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[32]++;
  if (results.skipped) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[33]++;
    status = 'skipped';
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[36]++;
  return status;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[39]++;
jasmine.HtmlReporterHelpers.appendToSummary = function(child, childElement) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[40]++;
  var parentDiv = this.dom.summary;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[41]++;
  var parentSuite = (typeof child.parentSuite == 'undefined') ? 'suite' : 'parentSuite';
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[42]++;
  var parent = child[parentSuite];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[44]++;
  if (parent) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[45]++;
    if (typeof this.views.suites[parent.id] == 'undefined') {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[46]++;
      this.views.suites[parent.id] = new jasmine.HtmlReporter.SuiteView(parent, this.dom, this.views);
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[48]++;
    parentDiv = this.views.suites[parent.id].element;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[51]++;
  parentDiv.appendChild(childElement);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[55]++;
jasmine.HtmlReporterHelpers.addHelpers = function(ctor) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[56]++;
  for (var fn in jasmine.HtmlReporterHelpers) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[57]++;
    ctor.prototype[fn] = jasmine.HtmlReporterHelpers[fn];
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[61]++;
jasmine.HtmlReporter = function(_doc) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[62]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[63]++;
  var doc = _doc || window.document;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[65]++;
  var reporterView;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[67]++;
  var dom = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[70]++;
  self.logRunningSpecs = false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[72]++;
  self.reportRunnerStarting = function(runner) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[73]++;
  var specs = runner.specs() || [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[75]++;
  if (specs.length == 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[76]++;
    return;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[79]++;
  createReporterDom(runner.env.versionString());
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[80]++;
  doc.body.appendChild(dom.reporter);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[81]++;
  setExceptionHandling();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[83]++;
  reporterView = new jasmine.HtmlReporter.ReporterView(dom);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[84]++;
  reporterView.addSpecs(specs, self.specFilter);
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[87]++;
  self.reportRunnerResults = function(runner) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[88]++;
  reporterView && reporterView.complete();
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[91]++;
  self.reportSuiteResults = function(suite) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[92]++;
  reporterView.suiteComplete(suite);
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[95]++;
  self.reportSpecStarting = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[96]++;
  if (self.logRunningSpecs) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[97]++;
    self.log('>> Jasmine Running ' + spec.suite.description + ' ' + spec.description + '...');
  }
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[101]++;
  self.reportSpecResults = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[102]++;
  reporterView.specComplete(spec);
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[105]++;
  self.log = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[106]++;
  var console = jasmine.getGlobal().console;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[107]++;
  if (console && console.log) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[108]++;
    if (console.log.apply) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[109]++;
      console.log.apply(console, arguments);
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[111]++;
      console.log(arguments);
    }
  }
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[116]++;
  self.specFilter = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[117]++;
  if (!focusedSpecName()) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[118]++;
    return true;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[121]++;
  return spec.getFullName().indexOf(focusedSpecName()) === 0;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[124]++;
  return self;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[126]++;
  function focusedSpecName() {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[127]++;
    var specName;
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[129]++;
    (function memoizeFocusedSpec() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[130]++;
  if (specName) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[131]++;
    return;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[134]++;
  var paramMap = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[135]++;
  var params = jasmine.HtmlReporter.parameters(doc);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[137]++;
  for (var i = 0; i < params.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[138]++;
    var p = params[i].split('=');
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[139]++;
    paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[142]++;
  specName = paramMap.spec;
})();
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[145]++;
    return specName;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[148]++;
  function createReporterDom(version) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[149]++;
    dom.reporter = self.createDom('div', {
  id: 'HTMLReporter', 
  className: 'jasmine_reporter'}, dom.banner = self.createDom('div', {
  className: 'banner'}, self.createDom('span', {
  className: 'title'}, "Jasmine "), self.createDom('span', {
  className: 'version'}, version)), dom.symbolSummary = self.createDom('ul', {
  className: 'symbolSummary'}), dom.alert = self.createDom('div', {
  className: 'alert'}, self.createDom('span', {
  className: 'exceptions'}, self.createDom('label', {
  className: 'label', 
  'for': 'no_try_catch'}, 'No try/catch'), self.createDom('input', {
  id: 'no_try_catch', 
  type: 'checkbox'}))), dom.results = self.createDom('div', {
  className: 'results'}, dom.summary = self.createDom('div', {
  className: 'summary'}), dom.details = self.createDom('div', {
  id: 'details'})));
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[165]++;
  function noTryCatch() {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[166]++;
    return window.location.search.match(/catch=false/);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[169]++;
  function searchWithCatch() {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[170]++;
    var params = jasmine.HtmlReporter.parameters(window.document);
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[171]++;
    var removed = false;
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[172]++;
    var i = 0;
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[174]++;
    while (!removed && i < params.length) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[175]++;
      if (params[i].match(/catch=/)) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[176]++;
        params.splice(i, 1);
        _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[177]++;
        removed = true;
      }
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[179]++;
      i++;
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[181]++;
    if (jasmine.CATCH_EXCEPTIONS) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[182]++;
      params.push("catch=false");
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[185]++;
    return params.join("&");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[188]++;
  function setExceptionHandling() {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[189]++;
    var chxCatch = document.getElementById('no_try_catch');
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[191]++;
    if (noTryCatch()) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[192]++;
      chxCatch.setAttribute('checked', true);
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[193]++;
      jasmine.CATCH_EXCEPTIONS = false;
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[195]++;
    chxCatch.onclick = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[196]++;
  window.location.search = searchWithCatch();
};
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[200]++;
jasmine.HtmlReporter.parameters = function(doc) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[201]++;
  var paramStr = doc.location.search.substring(1);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[202]++;
  var params = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[204]++;
  if (paramStr.length > 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[205]++;
    params = paramStr.split('&');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[207]++;
  return params;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[209]++;
jasmine.HtmlReporter.sectionLink = function(sectionName) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[210]++;
  var link = '?';
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[211]++;
  var params = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[213]++;
  if (sectionName) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[214]++;
    params.push('spec=' + encodeURIComponent(sectionName));
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[216]++;
  if (!jasmine.CATCH_EXCEPTIONS) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[217]++;
    params.push("catch=false");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[219]++;
  if (params.length > 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[220]++;
    link += params.join("&");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[223]++;
  return link;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[225]++;
jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter);
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[226]++;
jasmine.HtmlReporter.ReporterView = function(dom) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[227]++;
  this.startedAt = new Date();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[228]++;
  this.runningSpecCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[229]++;
  this.completeSpecCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[230]++;
  this.passedCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[231]++;
  this.failedCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[232]++;
  this.skippedCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[234]++;
  this.createResultsMenu = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[235]++;
  this.resultsMenu = this.createDom('span', {
  className: 'resultsMenu bar'}, this.summaryMenuItem = this.createDom('a', {
  className: 'summaryMenuItem', 
  href: "#"}, '0 specs'), ' | ', this.detailsMenuItem = this.createDom('a', {
  className: 'detailsMenuItem', 
  href: "#"}, '0 failing'));
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[240]++;
  this.summaryMenuItem.onclick = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[241]++;
  dom.reporter.className = dom.reporter.className.replace(/ showDetails/g, '');
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[244]++;
  this.detailsMenuItem.onclick = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[245]++;
  showDetails();
};
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[249]++;
  this.addSpecs = function(specs, specFilter) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[250]++;
  this.totalSpecCount = specs.length;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[252]++;
  this.views = {
  specs: {}, 
  suites: {}};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[257]++;
  for (var i = 0; i < specs.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[258]++;
    var spec = specs[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[259]++;
    this.views.specs[spec.id] = new jasmine.HtmlReporter.SpecView(spec, dom, this.views);
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[260]++;
    if (specFilter(spec)) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[261]++;
      this.runningSpecCount++;
    }
  }
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[266]++;
  this.specComplete = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[267]++;
  this.completeSpecCount++;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[269]++;
  if (isUndefined(this.views.specs[spec.id])) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[270]++;
    this.views.specs[spec.id] = new jasmine.HtmlReporter.SpecView(spec, dom);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[273]++;
  var specView = this.views.specs[spec.id];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[275]++;
  switch (specView.status()) {
    case 'passed':
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[277]++;
      this.passedCount++;
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[278]++;
      break;
    case 'failed':
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[281]++;
      this.failedCount++;
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[282]++;
      break;
    case 'skipped':
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[285]++;
      this.skippedCount++;
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[286]++;
      break;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[289]++;
  specView.refresh();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[290]++;
  this.refresh();
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[293]++;
  this.suiteComplete = function(suite) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[294]++;
  var suiteView = this.views.suites[suite.id];
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[295]++;
  if (isUndefined(suiteView)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[296]++;
    return;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[298]++;
  suiteView.refresh();
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[301]++;
  this.refresh = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[303]++;
  if (isUndefined(this.resultsMenu)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[304]++;
    this.createResultsMenu();
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[308]++;
  if (isUndefined(this.runningAlert)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[309]++;
    this.runningAlert = this.createDom('a', {
  href: jasmine.HtmlReporter.sectionLink(), 
  className: "runningAlert bar"});
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[310]++;
    dom.alert.appendChild(this.runningAlert);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[312]++;
  this.runningAlert.innerHTML = "Running " + this.completeSpecCount + " of " + specPluralizedFor(this.totalSpecCount);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[315]++;
  if (isUndefined(this.skippedAlert)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[316]++;
    this.skippedAlert = this.createDom('a', {
  href: jasmine.HtmlReporter.sectionLink(), 
  className: "skippedAlert bar"});
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[319]++;
  this.skippedAlert.innerHTML = "Skipping " + this.skippedCount + " of " + specPluralizedFor(this.totalSpecCount) + " - run all";
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[321]++;
  if (this.skippedCount === 1 && isDefined(dom.alert)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[322]++;
    dom.alert.appendChild(this.skippedAlert);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[326]++;
  if (isUndefined(this.passedAlert)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[327]++;
    this.passedAlert = this.createDom('span', {
  href: jasmine.HtmlReporter.sectionLink(), 
  className: "passingAlert bar"});
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[329]++;
  this.passedAlert.innerHTML = "Passing " + specPluralizedFor(this.passedCount);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[332]++;
  if (isUndefined(this.failedAlert)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[333]++;
    this.failedAlert = this.createDom('span', {
  href: "?", 
  className: "failingAlert bar"});
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[335]++;
  this.failedAlert.innerHTML = "Failing " + specPluralizedFor(this.failedCount);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[337]++;
  if (this.failedCount === 1 && isDefined(dom.alert)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[338]++;
    dom.alert.appendChild(this.failedAlert);
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[339]++;
    dom.alert.appendChild(this.resultsMenu);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[343]++;
  this.summaryMenuItem.innerHTML = "" + specPluralizedFor(this.runningSpecCount);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[344]++;
  this.detailsMenuItem.innerHTML = "" + this.failedCount + " failing";
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[347]++;
  this.complete = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[348]++;
  dom.alert.removeChild(this.runningAlert);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[350]++;
  this.skippedAlert.innerHTML = "Ran " + this.runningSpecCount + " of " + specPluralizedFor(this.totalSpecCount) + " - run all";
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[352]++;
  if (this.failedCount === 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[353]++;
    dom.alert.appendChild(this.createDom('span', {
  className: 'passingAlert bar'}, "Passing " + specPluralizedFor(this.passedCount)));
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[355]++;
    showDetails();
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[358]++;
  dom.banner.appendChild(this.createDom('span', {
  className: 'duration'}, "finished in " + ((new Date().getTime() - this.startedAt.getTime()) / 1000) + "s"));
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[361]++;
  return this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[363]++;
  function showDetails() {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[364]++;
    if (dom.reporter.className.search(/showDetails/) === -1) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[365]++;
      dom.reporter.className += " showDetails";
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[369]++;
  function isUndefined(obj) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[370]++;
    return typeof obj === 'undefined';
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[373]++;
  function isDefined(obj) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[374]++;
    return !isUndefined(obj);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[377]++;
  function specPluralizedFor(count) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[378]++;
    var str = count + " spec";
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[379]++;
    if (count > 1) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[380]++;
      str += "s";
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[382]++;
    return str;
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[387]++;
jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter.ReporterView);
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[390]++;
jasmine.HtmlReporter.SpecView = function(spec, dom, views) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[391]++;
  this.spec = spec;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[392]++;
  this.dom = dom;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[393]++;
  this.views = views;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[395]++;
  this.symbol = this.createDom('li', {
  className: 'pending'});
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[396]++;
  this.dom.symbolSummary.appendChild(this.symbol);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[398]++;
  this.summary = this.createDom('div', {
  className: 'specSummary'}, this.createDom('a', {
  className: 'description', 
  href: jasmine.HtmlReporter.sectionLink(this.spec.getFullName()), 
  title: this.spec.getFullName()}, this.spec.description));
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[406]++;
  this.detail = this.createDom('div', {
  className: 'specDetail'}, this.createDom('a', {
  className: 'description', 
  href: '?spec=' + encodeURIComponent(this.spec.getFullName()), 
  title: this.spec.getFullName()}, this.spec.getFullName()));
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[415]++;
jasmine.HtmlReporter.SpecView.prototype.status = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[416]++;
  return this.getSpecStatus(this.spec);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[419]++;
jasmine.HtmlReporter.SpecView.prototype.refresh = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[420]++;
  this.symbol.className = this.status();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[422]++;
  switch (this.status()) {
    case 'skipped':
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[424]++;
      break;
    case 'passed':
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[427]++;
      this.appendSummaryToSuiteDiv();
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[428]++;
      break;
    case 'failed':
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[431]++;
      this.appendSummaryToSuiteDiv();
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[432]++;
      this.appendFailureDetail();
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[433]++;
      break;
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[437]++;
jasmine.HtmlReporter.SpecView.prototype.appendSummaryToSuiteDiv = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[438]++;
  this.summary.className += ' ' + this.status();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[439]++;
  this.appendToSummary(this.spec, this.summary);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[442]++;
jasmine.HtmlReporter.SpecView.prototype.appendFailureDetail = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[443]++;
  this.detail.className += ' ' + this.status();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[445]++;
  var resultItems = this.spec.results().getItems();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[446]++;
  var messagesDiv = this.createDom('div', {
  className: 'messages'});
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[448]++;
  for (var i = 0; i < resultItems.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[449]++;
    var result = resultItems[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[451]++;
    if (result.type == 'log') {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[452]++;
      messagesDiv.appendChild(this.createDom('div', {
  className: 'resultMessage log'}, result.toString()));
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[453]++;
      if (result.type == 'expect' && result.passed && !result.passed()) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[454]++;
        messagesDiv.appendChild(this.createDom('div', {
  className: 'resultMessage fail'}, result.message));
        _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[456]++;
        if (result.trace.stack) {
          _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[457]++;
          messagesDiv.appendChild(this.createDom('div', {
  className: 'stackTrace'}, result.trace.stack));
        }
      }
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[462]++;
  if (messagesDiv.childNodes.length > 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[463]++;
    this.detail.appendChild(messagesDiv);
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[464]++;
    this.dom.details.appendChild(this.detail);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[468]++;
jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter.SpecView);
jasmine.HtmlReporter.SuiteView = function(suite, dom, views) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[469]++;
  this.suite = suite;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[470]++;
  this.dom = dom;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[471]++;
  this.views = views;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[473]++;
  this.element = this.createDom('div', {
  className: 'suite'}, this.createDom('a', {
  className: 'description', 
  href: jasmine.HtmlReporter.sectionLink(this.suite.getFullName())}, this.suite.description));
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[477]++;
  this.appendToSummary(this.suite, this.element);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[480]++;
jasmine.HtmlReporter.SuiteView.prototype.status = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[481]++;
  return this.getSpecStatus(this.suite);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[484]++;
jasmine.HtmlReporter.SuiteView.prototype.refresh = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[485]++;
  this.element.className += " " + this.status();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[488]++;
jasmine.HtmlReporterHelpers.addHelpers(jasmine.HtmlReporter.SuiteView);
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[492]++;
jasmine.TrivialReporter = function(doc) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[493]++;
  this.document = doc || document;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[494]++;
  this.suiteDivs = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[495]++;
  this.logRunningSpecs = false;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[498]++;
jasmine.TrivialReporter.prototype.createDom = function(type, attrs, childrenVarArgs) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[499]++;
  var el = document.createElement(type);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[501]++;
  for (var i = 2; i < arguments.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[502]++;
    var child = arguments[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[504]++;
    if (typeof child === 'string') {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[505]++;
      el.appendChild(document.createTextNode(child));
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[507]++;
      if (child) {
        el.appendChild(child);
      }
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[511]++;
  for (var attr in attrs) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[512]++;
    if (attr == "className") {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[513]++;
      el[attr] = attrs[attr];
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[515]++;
      el.setAttribute(attr, attrs[attr]);
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[519]++;
  return el;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[522]++;
jasmine.TrivialReporter.prototype.reportRunnerStarting = function(runner) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[523]++;
  var showPassed, showSkipped;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[525]++;
  this.outerDiv = this.createDom('div', {
  id: 'TrivialReporter', 
  className: 'jasmine_reporter'}, this.createDom('div', {
  className: 'banner'}, this.createDom('div', {
  className: 'logo'}, this.createDom('span', {
  className: 'title'}, "Jasmine"), this.createDom('span', {
  className: 'version'}, runner.env.versionString())), this.createDom('div', {
  className: 'options'}, "Show ", showPassed = this.createDom('input', {
  id: "__jasmine_TrivialReporter_showPassed__", 
  type: 'checkbox'}), this.createDom('label', {
  "for": "__jasmine_TrivialReporter_showPassed__"}, " passed "), showSkipped = this.createDom('input', {
  id: "__jasmine_TrivialReporter_showSkipped__", 
  type: 'checkbox'}), this.createDom('label', {
  "for": "__jasmine_TrivialReporter_showSkipped__"}, " skipped"))), this.runnerDiv = this.createDom('div', {
  className: 'runner running'}, this.createDom('a', {
  className: 'run_spec', 
  href: '?'}, "run all"), this.runnerMessageSpan = this.createDom('span', {}, "Running..."), this.finishedAtSpan = this.createDom('span', {
  className: 'finished-at'}, "")));
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[545]++;
  this.document.body.appendChild(this.outerDiv);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[547]++;
  var suites = runner.suites();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[548]++;
  for (var i = 0; i < suites.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[549]++;
    var suite = suites[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[550]++;
    var suiteDiv = this.createDom('div', {
  className: 'suite'}, this.createDom('a', {
  className: 'run_spec', 
  href: '?spec=' + encodeURIComponent(suite.getFullName())}, "run"), this.createDom('a', {
  className: 'description', 
  href: '?spec=' + encodeURIComponent(suite.getFullName())}, suite.description));
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[553]++;
    this.suiteDivs[suite.id] = suiteDiv;
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[554]++;
    var parentDiv = this.outerDiv;
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[555]++;
    if (suite.parentSuite) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[556]++;
      parentDiv = this.suiteDivs[suite.parentSuite.id];
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[558]++;
    parentDiv.appendChild(suiteDiv);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[561]++;
  this.startedAt = new Date();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[563]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[564]++;
  showPassed.onclick = function(evt) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[565]++;
  if (showPassed.checked) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[566]++;
    self.outerDiv.className += ' show-passed';
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[568]++;
    self.outerDiv.className = self.outerDiv.className.replace(/ show-passed/, '');
  }
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[572]++;
  showSkipped.onclick = function(evt) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[573]++;
  if (showSkipped.checked) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[574]++;
    self.outerDiv.className += ' show-skipped';
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[576]++;
    self.outerDiv.className = self.outerDiv.className.replace(/ show-skipped/, '');
  }
};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[581]++;
jasmine.TrivialReporter.prototype.reportRunnerResults = function(runner) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[582]++;
  var results = runner.results();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[583]++;
  var className = (results.failedCount > 0) ? "runner failed" : "runner passed";
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[584]++;
  this.runnerDiv.setAttribute("class", className);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[586]++;
  this.runnerDiv.setAttribute("className", className);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[587]++;
  var specs = runner.specs();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[588]++;
  var specCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[589]++;
  for (var i = 0; i < specs.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[590]++;
    if (this.specFilter(specs[i])) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[591]++;
      specCount++;
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[594]++;
  var message = "" + specCount + " spec" + (specCount == 1 ? "" : "s") + ", " + results.failedCount + " failure" + ((results.failedCount == 1) ? "" : "s");
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[595]++;
  message += " in " + ((new Date().getTime() - this.startedAt.getTime()) / 1000) + "s";
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[596]++;
  this.runnerMessageSpan.replaceChild(this.createDom('a', {
  className: 'description', 
  href: '?'}, message), this.runnerMessageSpan.firstChild);
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[598]++;
  this.finishedAtSpan.appendChild(document.createTextNode("Finished at " + new Date().toString()));
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[601]++;
jasmine.TrivialReporter.prototype.reportSuiteResults = function(suite) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[602]++;
  var results = suite.results();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[603]++;
  var status = results.passed() ? 'passed' : 'failed';
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[604]++;
  if (results.totalCount === 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[605]++;
    status = 'skipped';
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[607]++;
  this.suiteDivs[suite.id].className += " " + status;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[610]++;
jasmine.TrivialReporter.prototype.reportSpecStarting = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[611]++;
  if (this.logRunningSpecs) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[612]++;
    this.log('>> Jasmine Running ' + spec.suite.description + ' ' + spec.description + '...');
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[616]++;
jasmine.TrivialReporter.prototype.reportSpecResults = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[617]++;
  var results = spec.results();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[618]++;
  var status = results.passed() ? 'passed' : 'failed';
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[619]++;
  if (results.skipped) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[620]++;
    status = 'skipped';
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[622]++;
  var specDiv = this.createDom('div', {
  className: 'spec ' + status}, this.createDom('a', {
  className: 'run_spec', 
  href: '?spec=' + encodeURIComponent(spec.getFullName())}, "run"), this.createDom('a', {
  className: 'description', 
  href: '?spec=' + encodeURIComponent(spec.getFullName()), 
  title: spec.getFullName()}, spec.description));
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[631]++;
  var resultItems = results.getItems();
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[632]++;
  var messagesDiv = this.createDom('div', {
  className: 'messages'});
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[633]++;
  for (var i = 0; i < resultItems.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[634]++;
    var result = resultItems[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[636]++;
    if (result.type == 'log') {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[637]++;
      messagesDiv.appendChild(this.createDom('div', {
  className: 'resultMessage log'}, result.toString()));
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[638]++;
      if (result.type == 'expect' && result.passed && !result.passed()) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[639]++;
        messagesDiv.appendChild(this.createDom('div', {
  className: 'resultMessage fail'}, result.message));
        _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[641]++;
        if (result.trace.stack) {
          _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[642]++;
          messagesDiv.appendChild(this.createDom('div', {
  className: 'stackTrace'}, result.trace.stack));
        }
      }
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[647]++;
  if (messagesDiv.childNodes.length > 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[648]++;
    specDiv.appendChild(messagesDiv);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[651]++;
  this.suiteDivs[spec.suite.id].appendChild(specDiv);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[654]++;
jasmine.TrivialReporter.prototype.log = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[655]++;
  var console = jasmine.getGlobal().console;
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[656]++;
  if (console && console.log) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[657]++;
    if (console.log.apply) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[658]++;
      console.log.apply(console, arguments);
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[660]++;
      console.log(arguments);
    }
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[665]++;
jasmine.TrivialReporter.prototype.getLocation = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[666]++;
  return this.document.location;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[669]++;
jasmine.TrivialReporter.prototype.specFilter = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[670]++;
  var paramMap = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[671]++;
  var params = this.getLocation().search.substring(1).split('&');
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[672]++;
  for (var i = 0; i < params.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[673]++;
    var p = params[i].split('=');
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[674]++;
    paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[677]++;
  if (!paramMap.spec) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[678]++;
    return true;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine-html.js'].lineData[680]++;
  return spec.getFullName().indexOf(paramMap.spec) === 0;
};

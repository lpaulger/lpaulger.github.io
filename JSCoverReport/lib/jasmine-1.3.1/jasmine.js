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
if (! _$jscoverage['lib/jasmine-1.3.1/jasmine.js']) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'] = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[8] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[9] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[13] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[14] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[23] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[29] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[35] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[40] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[45] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[52] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[54] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[55] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[56] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[59] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[70] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[71] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[72] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[73] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[74] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[78] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[82] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[83] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[84] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[85] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[87] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[88] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[89] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[90] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[93] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[94] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[95] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[96] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[97] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[98] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[100] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[103] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[106] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[107] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[108] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[109] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[110] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[111] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[112] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[114] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[115] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[118] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[119] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[122] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[123] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[129] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[130] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[131] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[140] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[141] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[150] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[151] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[160] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[161] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[171] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[172] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[181] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[182] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[183] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[184] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[193] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[194] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[207] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[208] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[222] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[223] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[270] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[274] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[278] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[282] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[291] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[303] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[304] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[318] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[319] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[320] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[335] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[336] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[337] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[339] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[354] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[355] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[356] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[358] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[376] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[377] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[378] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[395] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[396] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[397] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[398] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[399] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[400] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[403] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[405] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[406] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[407] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[408] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[409] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[410] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[411] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[412] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[413] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[416] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[418] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[419] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[422] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[424] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[433] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[434] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[444] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[445] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[446] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[448] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[449] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[450] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[452] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[460] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[461] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[462] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[480] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[481] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[483] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[498] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[499] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[501] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[511] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[512] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[514] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[525] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[526] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[528] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[535] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[536] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[538] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[546] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[547] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[549] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[558] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[559] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[561] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[570] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[571] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[573] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[582] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[583] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[585] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[602] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[603] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[605] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[613] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[614] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[616] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[620] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[621] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[622] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[623] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[626] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[629] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[630] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[633] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[636] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[639] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[642] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[644] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[649] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[658] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[662] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[664] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[665] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[668] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[669] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[670] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[671] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[673] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[674] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[677] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[679] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[680] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[682] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[683] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[686] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[688] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[689] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[692] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[695] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[696] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[697] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[702] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[703] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[704] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[705] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[708] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[709] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[710] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[718] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[719] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[720] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[721] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[723] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[725] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[726] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[727] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[728] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[729] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[732] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[733] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[734] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[737] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[738] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[740] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[742] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[746] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[747] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[748] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[749] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[754] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[755] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[756] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[758] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[765] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[766] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[767] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[770] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[771] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[772] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[773] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[775] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[776] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[782] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[783] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[789] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[790] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[797] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[798] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[801] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[802] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[805] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[806] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[808] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[809] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[810] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[812] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[815] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[817] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[818] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[819] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[821] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[824] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[825] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[826] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[830] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[832] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[835] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[836] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[837] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[839] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[843] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[844] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[847] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[848] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[849] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[851] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[856] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[857] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[863] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[864] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[865] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[866] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[868] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[869] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[872] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[875] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[876] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[883] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[884] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[885] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[887] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[888] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[890] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[891] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[893] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[894] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[896] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[897] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[899] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[902] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[903] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[904] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[907] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[908] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[910] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[911] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[914] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[915] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[916] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[919] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[920] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[921] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[924] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[925] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[926] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[927] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[931] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[932] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[935] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[936] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[937] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[940] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[941] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[942] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[944] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[945] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[946] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[947] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[950] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[952] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[953] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[956] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[957] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[960] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[961] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[964] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[965] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[968] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[969] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[972] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[973] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[976] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[977] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[980] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[981] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[984] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[985] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[988] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[989] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[992] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[993] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[997] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1000] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1001] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1002] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1003] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1005] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1007] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1010] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1011] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1017] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1021] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1025] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1029] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1033] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1037] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1041] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1052] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1053] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1054] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1055] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1058] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1059] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1060] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1063] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1064] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1066] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1069] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1075] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1076] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1077] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1078] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1079] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1082] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1083] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1084] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1085] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1086] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1087] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1091] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1092] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1095] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1096] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1097] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1104] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1105] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1106] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1107] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1110] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1113] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1114] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1117] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1118] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1122] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1123] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1127] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1131] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1132] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1139] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1142] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1143] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1144] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1145] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1146] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1148] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1151] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1152] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1153] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1154] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1155] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1156] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1167] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1179] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1180] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1181] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1182] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1183] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1184] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1188] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1189] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1193] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1194] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1197] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1198] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1199] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1200] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1201] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1205] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1206] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1207] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1208] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1210] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1211] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1214] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1216] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1217] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1218] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1219] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1220] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1221] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1224] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1225] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1226] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1227] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1228] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1229] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1232] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1235] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1242] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1243] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1254] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1255] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1263] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1264] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1272] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1273] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1281] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1282] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1291] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1292] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1300] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1301] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1307] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1308] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1314] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1315] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1321] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1322] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1328] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1329] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1330] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1333] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1339] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1340] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1347] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1348] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1355] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1356] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1357] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1360] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1361] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1364] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1365] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1371] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1375] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1382] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1383] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1384] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1387] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1388] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1391] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1392] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1398] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1407] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1408] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1409] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1410] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1412] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1413] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1414] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1415] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1416] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1418] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1420] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1423] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1427] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1430] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1431] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1432] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1433] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1436] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1437] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1443] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1451] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1452] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1461] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1462] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1465] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1466] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1469] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1470] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1480] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1481] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1482] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1484] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1492] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1493] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1494] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1495] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1496] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1498] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1499] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1501] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1503] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1504] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1507] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1509] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1510] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1511] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1513] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1517] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1520] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1521] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1524] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1525] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1526] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1529] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1530] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1533] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1534] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1537] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1538] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1541] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1544] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1545] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1548] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1549] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1552] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1553] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1554] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1556] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1558] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1559] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1562] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1563] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1564] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1566] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1567] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1571] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1574] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1575] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1580] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1581] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1583] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1584] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1585] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1586] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1587] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1590] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1591] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1592] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1593] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1596] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1597] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1600] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1601] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1606] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1607] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1608] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1609] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1612] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1613] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1614] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1615] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1616] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1619] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1620] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1621] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1622] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1623] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1624] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1627] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1628] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1632] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1633] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1634] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1636] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1637] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1638] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1639] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1640] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1641] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1642] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1650] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1654] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1655] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1667] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1671] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1672] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1676] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1677] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1681] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1685] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1689] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1690] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1691] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1693] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1698] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1702] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1703] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1714] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1715] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1720] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1725] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1728] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1729] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1730] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1732] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1736] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1737] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1738] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1740] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1744] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1745] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1746] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1748] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1752] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1753] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1754] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1756] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1763] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1764] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1766] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1768] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1769] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1772] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1773] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1781] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1782] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1783] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1784] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1785] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1786] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1787] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1788] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1800] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1804] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1808] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1812] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1816] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1820] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1828] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1829] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1830] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1831] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1838] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1839] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1845] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1846] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1853] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1854] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1855] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1856] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1858] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1859] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1860] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1862] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1866] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1872] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1873] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1878] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1879] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1887] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1888] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1889] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1890] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1891] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1892] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1893] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1894] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1895] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1896] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1897] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1898] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1899] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1900] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1901] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1902] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1903] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1904] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1905] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1906] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1907] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1908] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1909] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1910] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1911] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1912] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1913] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1914] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1915] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1917] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1919] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1921] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1924] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1928] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1929] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1930] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1931] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1932] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1937] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1938] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1939] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1940] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1942] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1943] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1945] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1947] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1949] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1950] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1953] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1954] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1957] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1958] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1959] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1960] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1963] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1964] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1965] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1966] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1968] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1970] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1973] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1974] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1975] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1976] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1979] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1980] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1981] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1983] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1984] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1985] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1987] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1990] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1991] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1992] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1993] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1995] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1999] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2002] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2003] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2005] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2006] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2010] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2011] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2012] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2013] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2014] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2015] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2018] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2019] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2020] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2023] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2024] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2027] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2028] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2029] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2032] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2033] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2036] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2037] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2038] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2041] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2042] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2043] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2046] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2047] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2048] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2049] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2052] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2053] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2056] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2058] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2059] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2060] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2062] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2063] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2065] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2066] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2067] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2069] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2070] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2071] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2072] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2075] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2076] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2079] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2080] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2082] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2083] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2084] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2085] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2086] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2089] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2090] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2092] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2096] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2098] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2099] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2100] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2104] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2105] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2106] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2112] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2113] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2114] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2115] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2116] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2119] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2129] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2130] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2131] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2132] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2133] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2134] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2135] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2138] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2139] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2140] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2141] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2143] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2144] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2148] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2149] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2150] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2153] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2154] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2155] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2159] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2160] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2163] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2164] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2167] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2168] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2169] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2171] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2174] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2175] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2176] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2177] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2178] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2180] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2183] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2184] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2187] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2188] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2189] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2190] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2191] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2194] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2197] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2198] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2208] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2209] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2210] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2212] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2213] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2215] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2216] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2217] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2218] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2219] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2220] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2222] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2223] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2225] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2226] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2227] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2230] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2231] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2235] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2236] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2244] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2245] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2248] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2249] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2250] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2251] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2254] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2255] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2256] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2258] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2265] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2266] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2269] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2270] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2271] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2272] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2281] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2282] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2283] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2284] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2294] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2295] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2296] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2297] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2299] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2300] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2301] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2303] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2304] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2306] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2307] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2309] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2310] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2314] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2315] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2316] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2319] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2320] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2325] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2328] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2329] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2332] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2333] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2334] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2335] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2337] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2338] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2339] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2342] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2343] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2346] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2347] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2348] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2349] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2350] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2354] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2355] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2356] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2358] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2362] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2363] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2364] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2365] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2366] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2367] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2370] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2372] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2374] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2376] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2377] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2381] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2382] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2383] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2385] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2386] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2387] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2390] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2391] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2393] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2394] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2396] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2397] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2398] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2401] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2402] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2406] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2407] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2410] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2411] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2412] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2415] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2416] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2419] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2420] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2423] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2425] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2426] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2427] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2428] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2430] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2432] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2435] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2436] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2437] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2438] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2440] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2452] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2453] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2454] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2455] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2456] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2457] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2458] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2459] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2460] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2461] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2462] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2463] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2466] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2467] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2468] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2469] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2471] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2474] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2475] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2476] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2477] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2478] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2482] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2483] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2484] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2487] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2488] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2489] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2492] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2493] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2496] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2497] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2498] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2499] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2500] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2502] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2504] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2507] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2508] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2511] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2512] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2515] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2516] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2519] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2520] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2521] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2522] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2525] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2526] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2527] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2530] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2532] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2533] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2534] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2536] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2537] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2551] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2552] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2553] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2554] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2555] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2556] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2558] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2560] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2562] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2563] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2564] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2566] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2567] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2568] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2570] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2571] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2572] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2575] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2576] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2577] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2578] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2579] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2584] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2585] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2587] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2588] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2589] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2590] = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2595] = 0;
}
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1]++;
var isCommonJS = typeof window == "undefined" && typeof exports == "object";
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[8]++;
var jasmine = {};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[9]++;
if (isCommonJS) 
  exports.jasmine = jasmine;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[13]++;
jasmine.unimplementedMethod_ = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[14]++;
  throw new Error("unimplemented method");
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[23]++;
jasmine.undefined = jasmine.___undefined___;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[29]++;
jasmine.VERBOSE = false;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[35]++;
jasmine.DEFAULT_UPDATE_INTERVAL = 250;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[40]++;
jasmine.MAX_PRETTY_PRINT_DEPTH = 40;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[45]++;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[52]++;
jasmine.CATCH_EXCEPTIONS = true;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[54]++;
jasmine.getGlobal = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[55]++;
  function getGlobal() {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[56]++;
    return this;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[59]++;
  return getGlobal();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[70]++;
jasmine.bindOriginal_ = function(base, name) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[71]++;
  var original = base[name];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[72]++;
  if (original.apply) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[73]++;
    return function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[74]++;
  return original.apply(base, arguments);
};
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[78]++;
    return jasmine.getGlobal()[name];
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[82]++;
jasmine.setTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'setTimeout');
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[83]++;
jasmine.clearTimeout = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearTimeout');
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[84]++;
jasmine.setInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'setInterval');
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[85]++;
jasmine.clearInterval = jasmine.bindOriginal_(jasmine.getGlobal(), 'clearInterval');
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[87]++;
jasmine.MessageResult = function(values) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[88]++;
  this.type = 'log';
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[89]++;
  this.values = values;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[90]++;
  this.trace = new Error();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[93]++;
jasmine.MessageResult.prototype.toString = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[94]++;
  var text = "";
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[95]++;
  for (var i = 0; i < this.values.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[96]++;
    if (i > 0) 
      text += " ";
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[97]++;
    if (jasmine.isString_(this.values[i])) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[98]++;
      text += this.values[i];
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[100]++;
      text += jasmine.pp(this.values[i]);
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[103]++;
  return text;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[106]++;
jasmine.ExpectationResult = function(params) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[107]++;
  this.type = 'expect';
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[108]++;
  this.matcherName = params.matcherName;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[109]++;
  this.passed_ = params.passed;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[110]++;
  this.expected = params.expected;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[111]++;
  this.actual = params.actual;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[112]++;
  this.message = this.passed_ ? 'Passed.' : params.message;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[114]++;
  var trace = (params.trace || new Error(this.message));
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[115]++;
  this.trace = this.passed_ ? '' : trace;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[118]++;
jasmine.ExpectationResult.prototype.toString = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[119]++;
  return this.message;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[122]++;
jasmine.ExpectationResult.prototype.passed = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[123]++;
  return this.passed_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[129]++;
jasmine.getEnv = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[130]++;
  var env = jasmine.currentEnv_ = jasmine.currentEnv_ || new jasmine.Env();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[131]++;
  return env;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[140]++;
jasmine.isArray_ = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[141]++;
  return jasmine.isA_("Array", value);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[150]++;
jasmine.isString_ = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[151]++;
  return jasmine.isA_("String", value);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[160]++;
jasmine.isNumber_ = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[161]++;
  return jasmine.isA_("Number", value);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[171]++;
jasmine.isA_ = function(typeName, value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[172]++;
  return Object.prototype.toString.apply(value) === '[object ' + typeName + ']';
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[181]++;
jasmine.pp = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[182]++;
  var stringPrettyPrinter = new jasmine.StringPrettyPrinter();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[183]++;
  stringPrettyPrinter.format(value);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[184]++;
  return stringPrettyPrinter.string;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[193]++;
jasmine.isDomNode = function(obj) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[194]++;
  return obj.nodeType > 0;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[207]++;
jasmine.any = function(clazz) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[208]++;
  return new jasmine.Matchers.Any(clazz);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[222]++;
jasmine.objectContaining = function(sample) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[223]++;
  return new jasmine.Matchers.ObjectContaining(sample);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[270]++;
jasmine.Spy = function(name) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[274]++;
  this.identity = name || 'unknown';
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[278]++;
  this.isSpy = true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[282]++;
  this.plan = function() {
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[291]++;
  this.mostRecentCall = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[303]++;
  this.argsForCall = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[304]++;
  this.calls = [];
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[318]++;
jasmine.Spy.prototype.andCallThrough = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[319]++;
  this.plan = this.originalValue;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[320]++;
  return this;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[335]++;
jasmine.Spy.prototype.andReturn = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[336]++;
  this.plan = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[337]++;
  return value;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[339]++;
  return this;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[354]++;
jasmine.Spy.prototype.andThrow = function(exceptionMsg) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[355]++;
  this.plan = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[356]++;
  throw exceptionMsg;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[358]++;
  return this;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[376]++;
jasmine.Spy.prototype.andCallFake = function(fakeFunc) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[377]++;
  this.plan = fakeFunc;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[378]++;
  return this;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[395]++;
jasmine.Spy.prototype.reset = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[396]++;
  this.wasCalled = false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[397]++;
  this.callCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[398]++;
  this.argsForCall = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[399]++;
  this.calls = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[400]++;
  this.mostRecentCall = {};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[403]++;
jasmine.createSpy = function(name) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[405]++;
  var spyObj = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[406]++;
  spyObj.wasCalled = true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[407]++;
  spyObj.callCount++;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[408]++;
  var args = jasmine.util.argsToArray(arguments);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[409]++;
  spyObj.mostRecentCall.object = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[410]++;
  spyObj.mostRecentCall.args = args;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[411]++;
  spyObj.argsForCall.push(args);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[412]++;
  spyObj.calls.push({
  object: this, 
  args: args});
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[413]++;
  return spyObj.plan.apply(this, arguments);
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[416]++;
  var spy = new jasmine.Spy(name);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[418]++;
  for (var prop in spy) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[419]++;
    spyObj[prop] = spy[prop];
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[422]++;
  spyObj.reset();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[424]++;
  return spyObj;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[433]++;
jasmine.isSpy = function(putativeSpy) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[434]++;
  return putativeSpy && putativeSpy.isSpy;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[444]++;
jasmine.createSpyObj = function(baseName, methodNames) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[445]++;
  if (!jasmine.isArray_(methodNames) || methodNames.length === 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[446]++;
    throw new Error('createSpyObj requires a non-empty array of method names to create spies for');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[448]++;
  var obj = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[449]++;
  for (var i = 0; i < methodNames.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[450]++;
    obj[methodNames[i]] = jasmine.createSpy(baseName + '.' + methodNames[i]);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[452]++;
  return obj;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[460]++;
jasmine.log = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[461]++;
  var spec = jasmine.getEnv().currentSpec;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[462]++;
  spec.log.apply(spec, arguments);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[480]++;
var spyOn = function(obj, methodName) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[481]++;
  return jasmine.getEnv().currentSpec.spyOn(obj, methodName);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[483]++;
if (isCommonJS) 
  exports.spyOn = spyOn;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[498]++;
var it = function(desc, func) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[499]++;
  return jasmine.getEnv().it(desc, func);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[501]++;
if (isCommonJS) 
  exports.it = it;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[511]++;
var xit = function(desc, func) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[512]++;
  return jasmine.getEnv().xit(desc, func);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[514]++;
if (isCommonJS) 
  exports.xit = xit;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[525]++;
var expect = function(actual) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[526]++;
  return jasmine.getEnv().currentSpec.expect(actual);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[528]++;
if (isCommonJS) 
  exports.expect = expect;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[535]++;
var runs = function(func) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[536]++;
  jasmine.getEnv().currentSpec.runs(func);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[538]++;
if (isCommonJS) 
  exports.runs = runs;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[546]++;
var waits = function(timeout) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[547]++;
  jasmine.getEnv().currentSpec.waits(timeout);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[549]++;
if (isCommonJS) 
  exports.waits = waits;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[558]++;
var waitsFor = function(latchFunction, optional_timeoutMessage, optional_timeout) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[559]++;
  jasmine.getEnv().currentSpec.waitsFor.apply(jasmine.getEnv().currentSpec, arguments);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[561]++;
if (isCommonJS) 
  exports.waitsFor = waitsFor;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[570]++;
var beforeEach = function(beforeEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[571]++;
  jasmine.getEnv().beforeEach(beforeEachFunction);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[573]++;
if (isCommonJS) 
  exports.beforeEach = beforeEach;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[582]++;
var afterEach = function(afterEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[583]++;
  jasmine.getEnv().afterEach(afterEachFunction);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[585]++;
if (isCommonJS) 
  exports.afterEach = afterEach;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[602]++;
var describe = function(description, specDefinitions) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[603]++;
  return jasmine.getEnv().describe(description, specDefinitions);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[605]++;
if (isCommonJS) 
  exports.describe = describe;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[613]++;
var xdescribe = function(description, specDefinitions) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[614]++;
  return jasmine.getEnv().xdescribe(description, specDefinitions);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[616]++;
if (isCommonJS) 
  exports.xdescribe = xdescribe;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[620]++;
jasmine.XmlHttpRequest = (typeof XMLHttpRequest == "undefined") ? function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[621]++;
  function tryIt(f) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[622]++;
    try {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[623]++;
      return f();
    }    catch (e) {
}
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[626]++;
    return null;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[629]++;
  var xhr = tryIt(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[630]++;
  return new ActiveXObject("Msxml2.XMLHTTP.6.0");
}) || tryIt(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[633]++;
  return new ActiveXObject("Msxml2.XMLHTTP.3.0");
}) || tryIt(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[636]++;
  return new ActiveXObject("Msxml2.XMLHTTP");
}) || tryIt(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[639]++;
  return new ActiveXObject("Microsoft.XMLHTTP");
});
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[642]++;
  if (!xhr) 
    throw new Error("This browser does not support XMLHttpRequest.");
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[644]++;
  return xhr;
} : XMLHttpRequest;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[649]++;
jasmine.util = {};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[658]++;
jasmine.util.inherit = function(childClass, parentClass) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[662]++;
  var subclass = function() {
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[664]++;
  subclass.prototype = parentClass.prototype;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[665]++;
  childClass.prototype = new subclass();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[668]++;
jasmine.util.formatException = function(e) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[669]++;
  var lineNumber;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[670]++;
  if (e.line) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[671]++;
    lineNumber = e.line;
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[673]++;
    if (e.lineNumber) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[674]++;
      lineNumber = e.lineNumber;
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[677]++;
  var file;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[679]++;
  if (e.sourceURL) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[680]++;
    file = e.sourceURL;
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[682]++;
    if (e.fileName) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[683]++;
      file = e.fileName;
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[686]++;
  var message = (e.name && e.message) ? (e.name + ': ' + e.message) : e.toString();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[688]++;
  if (file && lineNumber) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[689]++;
    message += ' in ' + file + ' (line ' + lineNumber + ')';
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[692]++;
  return message;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[695]++;
jasmine.util.htmlEscape = function(str) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[696]++;
  if (!str) 
    return str;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[697]++;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[702]++;
jasmine.util.argsToArray = function(args) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[703]++;
  var arrayOfArgs = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[704]++;
  for (var i = 0; i < args.length; i++) 
    arrayOfArgs.push(args[i]);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[705]++;
  return arrayOfArgs;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[708]++;
jasmine.util.extend = function(destination, source) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[709]++;
  for (var property in source) 
    destination[property] = source[property];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[710]++;
  return destination;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[718]++;
jasmine.Env = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[719]++;
  this.currentSpec = null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[720]++;
  this.currentSuite = null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[721]++;
  this.currentRunner_ = new jasmine.Runner(this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[723]++;
  this.reporter = new jasmine.MultiReporter();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[725]++;
  this.updateInterval = jasmine.DEFAULT_UPDATE_INTERVAL;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[726]++;
  this.defaultTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[727]++;
  this.lastUpdate = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[728]++;
  this.specFilter = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[729]++;
  return true;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[732]++;
  this.nextSpecId_ = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[733]++;
  this.nextSuiteId_ = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[734]++;
  this.equalityTesters_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[737]++;
  this.matchersClass = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[738]++;
  jasmine.Matchers.apply(this, arguments);
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[740]++;
  jasmine.util.inherit(this.matchersClass, jasmine.Matchers);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[742]++;
  jasmine.Matchers.wrapInto_(jasmine.Matchers.prototype, this.matchersClass);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[746]++;
jasmine.Env.prototype.setTimeout = jasmine.setTimeout;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[747]++;
jasmine.Env.prototype.clearTimeout = jasmine.clearTimeout;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[748]++;
jasmine.Env.prototype.setInterval = jasmine.setInterval;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[749]++;
jasmine.Env.prototype.clearInterval = jasmine.clearInterval;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[754]++;
jasmine.Env.prototype.version = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[755]++;
  if (jasmine.version_) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[756]++;
    return jasmine.version_;
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[758]++;
    throw new Error('Version not set');
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[765]++;
jasmine.Env.prototype.versionString = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[766]++;
  if (!jasmine.version_) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[767]++;
    return "version unknown";
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[770]++;
  var version = this.version();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[771]++;
  var versionString = version.major + "." + version.minor + "." + version.build;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[772]++;
  if (version.release_candidate) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[773]++;
    versionString += ".rc" + version.release_candidate;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[775]++;
  versionString += " revision " + version.revision;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[776]++;
  return versionString;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[782]++;
jasmine.Env.prototype.nextSpecId = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[783]++;
  return this.nextSpecId_++;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[789]++;
jasmine.Env.prototype.nextSuiteId = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[790]++;
  return this.nextSuiteId_++;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[797]++;
jasmine.Env.prototype.addReporter = function(reporter) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[798]++;
  this.reporter.addReporter(reporter);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[801]++;
jasmine.Env.prototype.execute = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[802]++;
  this.currentRunner_.execute();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[805]++;
jasmine.Env.prototype.describe = function(description, specDefinitions) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[806]++;
  var suite = new jasmine.Suite(this, description, specDefinitions, this.currentSuite);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[808]++;
  var parentSuite = this.currentSuite;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[809]++;
  if (parentSuite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[810]++;
    parentSuite.add(suite);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[812]++;
    this.currentRunner_.add(suite);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[815]++;
  this.currentSuite = suite;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[817]++;
  var declarationError = null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[818]++;
  try {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[819]++;
    specDefinitions.call(suite);
  }  catch (e) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[821]++;
  declarationError = e;
}
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[824]++;
  if (declarationError) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[825]++;
    this.it("encountered a declaration exception", function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[826]++;
  throw declarationError;
});
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[830]++;
  this.currentSuite = parentSuite;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[832]++;
  return suite;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[835]++;
jasmine.Env.prototype.beforeEach = function(beforeEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[836]++;
  if (this.currentSuite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[837]++;
    this.currentSuite.beforeEach(beforeEachFunction);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[839]++;
    this.currentRunner_.beforeEach(beforeEachFunction);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[843]++;
jasmine.Env.prototype.currentRunner = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[844]++;
  return this.currentRunner_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[847]++;
jasmine.Env.prototype.afterEach = function(afterEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[848]++;
  if (this.currentSuite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[849]++;
    this.currentSuite.afterEach(afterEachFunction);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[851]++;
    this.currentRunner_.afterEach(afterEachFunction);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[856]++;
jasmine.Env.prototype.xdescribe = function(desc, specDefinitions) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[857]++;
  return {
  execute: function() {
}};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[863]++;
jasmine.Env.prototype.it = function(description, func) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[864]++;
  var spec = new jasmine.Spec(this, this.currentSuite, description);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[865]++;
  this.currentSuite.add(spec);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[866]++;
  this.currentSpec = spec;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[868]++;
  if (func) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[869]++;
    spec.runs(func);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[872]++;
  return spec;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[875]++;
jasmine.Env.prototype.xit = function(desc, func) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[876]++;
  return {
  id: this.nextSpecId(), 
  runs: function() {
}};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[883]++;
jasmine.Env.prototype.compareRegExps_ = function(a, b, mismatchKeys, mismatchValues) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[884]++;
  if (a.source != b.source) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[885]++;
    mismatchValues.push("expected pattern /" + b.source + "/ is not equal to the pattern /" + a.source + "/");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[887]++;
  if (a.ignoreCase != b.ignoreCase) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[888]++;
    mismatchValues.push("expected modifier i was" + (b.ignoreCase ? " " : " not ") + "set and does not equal the origin modifier");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[890]++;
  if (a.global != b.global) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[891]++;
    mismatchValues.push("expected modifier g was" + (b.global ? " " : " not ") + "set and does not equal the origin modifier");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[893]++;
  if (a.multiline != b.multiline) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[894]++;
    mismatchValues.push("expected modifier m was" + (b.multiline ? " " : " not ") + "set and does not equal the origin modifier");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[896]++;
  if (a.sticky != b.sticky) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[897]++;
    mismatchValues.push("expected modifier y was" + (b.sticky ? " " : " not ") + "set and does not equal the origin modifier");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[899]++;
  return (mismatchValues.length === 0);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[902]++;
jasmine.Env.prototype.compareObjects_ = function(a, b, mismatchKeys, mismatchValues) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[903]++;
  if (a.__Jasmine_been_here_before__ === b && b.__Jasmine_been_here_before__ === a) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[904]++;
    return true;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[907]++;
  a.__Jasmine_been_here_before__ = b;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[908]++;
  b.__Jasmine_been_here_before__ = a;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[910]++;
  var hasKey = function(obj, keyName) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[911]++;
  return obj !== null && obj[keyName] !== jasmine.undefined;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[914]++;
  for (var property in b) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[915]++;
    if (!hasKey(a, property) && hasKey(b, property)) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[916]++;
      mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[919]++;
  for (property in a) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[920]++;
    if (!hasKey(b, property) && hasKey(a, property)) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[921]++;
      mismatchKeys.push("expected missing key '" + property + "', but present in actual.");
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[924]++;
  for (property in b) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[925]++;
    if (property == '__Jasmine_been_here_before__') 
      continue;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[926]++;
    if (!this.equals_(a[property], b[property], mismatchKeys, mismatchValues)) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[927]++;
      mismatchValues.push("'" + property + "' was '" + (b[property] ? jasmine.util.htmlEscape(b[property].toString()) : b[property]) + "' in expected, but was '" + (a[property] ? jasmine.util.htmlEscape(a[property].toString()) : a[property]) + "' in actual.");
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[931]++;
  if (jasmine.isArray_(a) && jasmine.isArray_(b) && a.length != b.length) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[932]++;
    mismatchValues.push("arrays were not the same length");
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[935]++;
  delete a.__Jasmine_been_here_before__;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[936]++;
  delete b.__Jasmine_been_here_before__;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[937]++;
  return (mismatchKeys.length === 0 && mismatchValues.length === 0);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[940]++;
jasmine.Env.prototype.equals_ = function(a, b, mismatchKeys, mismatchValues) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[941]++;
  mismatchKeys = mismatchKeys || [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[942]++;
  mismatchValues = mismatchValues || [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[944]++;
  for (var i = 0; i < this.equalityTesters_.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[945]++;
    var equalityTester = this.equalityTesters_[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[946]++;
    var result = equalityTester(a, b, this, mismatchKeys, mismatchValues);
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[947]++;
    if (result !== jasmine.undefined) 
      return result;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[950]++;
  if (a === b) 
    return true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[952]++;
  if (a === jasmine.undefined || a === null || b === jasmine.undefined || b === null) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[953]++;
    return (a == jasmine.undefined && b == jasmine.undefined);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[956]++;
  if (jasmine.isDomNode(a) && jasmine.isDomNode(b)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[957]++;
    return a === b;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[960]++;
  if (a instanceof Date && b instanceof Date) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[961]++;
    return a.getTime() == b.getTime();
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[964]++;
  if (a.jasmineMatches) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[965]++;
    return a.jasmineMatches(b);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[968]++;
  if (b.jasmineMatches) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[969]++;
    return b.jasmineMatches(a);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[972]++;
  if (a instanceof jasmine.Matchers.ObjectContaining) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[973]++;
    return a.matches(b);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[976]++;
  if (b instanceof jasmine.Matchers.ObjectContaining) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[977]++;
    return b.matches(a);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[980]++;
  if (jasmine.isString_(a) && jasmine.isString_(b)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[981]++;
    return (a == b);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[984]++;
  if (jasmine.isNumber_(a) && jasmine.isNumber_(b)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[985]++;
    return (a == b);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[988]++;
  if (a instanceof RegExp && b instanceof RegExp) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[989]++;
    return this.compareRegExps_(a, b, mismatchKeys, mismatchValues);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[992]++;
  if (typeof a === "object" && typeof b === "object") {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[993]++;
    return this.compareObjects_(a, b, mismatchKeys, mismatchValues);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[997]++;
  return (a === b);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1000]++;
jasmine.Env.prototype.contains_ = function(haystack, needle) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1001]++;
  if (jasmine.isArray_(haystack)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1002]++;
    for (var i = 0; i < haystack.length; i++) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1003]++;
      if (this.equals_(haystack[i], needle)) 
        return true;
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1005]++;
    return false;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1007]++;
  return haystack.indexOf(needle) >= 0;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1010]++;
jasmine.Env.prototype.addEqualityTester = function(equalityTester) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1011]++;
  this.equalityTesters_.push(equalityTester);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1017]++;
jasmine.Reporter = function() {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1021]++;
jasmine.Reporter.prototype.reportRunnerStarting = function(runner) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1025]++;
jasmine.Reporter.prototype.reportRunnerResults = function(runner) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1029]++;
jasmine.Reporter.prototype.reportSuiteResults = function(suite) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1033]++;
jasmine.Reporter.prototype.reportSpecStarting = function(spec) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1037]++;
jasmine.Reporter.prototype.reportSpecResults = function(spec) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1041]++;
jasmine.Reporter.prototype.log = function(str) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1052]++;
jasmine.Block = function(env, func, spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1053]++;
  this.env = env;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1054]++;
  this.func = func;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1055]++;
  this.spec = spec;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1058]++;
jasmine.Block.prototype.execute = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1059]++;
  if (!jasmine.CATCH_EXCEPTIONS) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1060]++;
    this.func.apply(this.spec);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1063]++;
    try {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1064]++;
      this.func.apply(this.spec);
    }    catch (e) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1066]++;
  this.spec.fail(e);
}
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1069]++;
  onComplete();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1075]++;
jasmine.JsApiReporter = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1076]++;
  this.started = false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1077]++;
  this.finished = false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1078]++;
  this.suites_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1079]++;
  this.results_ = {};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1082]++;
jasmine.JsApiReporter.prototype.reportRunnerStarting = function(runner) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1083]++;
  this.started = true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1084]++;
  var suites = runner.topLevelSuites();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1085]++;
  for (var i = 0; i < suites.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1086]++;
    var suite = suites[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1087]++;
    this.suites_.push(this.summarize_(suite));
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1091]++;
jasmine.JsApiReporter.prototype.suites = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1092]++;
  return this.suites_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1095]++;
jasmine.JsApiReporter.prototype.summarize_ = function(suiteOrSpec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1096]++;
  var isSuite = suiteOrSpec instanceof jasmine.Suite;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1097]++;
  var summary = {
  id: suiteOrSpec.id, 
  name: suiteOrSpec.description, 
  type: isSuite ? 'suite' : 'spec', 
  children: []};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1104]++;
  if (isSuite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1105]++;
    var children = suiteOrSpec.children();
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1106]++;
    for (var i = 0; i < children.length; i++) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1107]++;
      summary.children.push(this.summarize_(children[i]));
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1110]++;
  return summary;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1113]++;
jasmine.JsApiReporter.prototype.results = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1114]++;
  return this.results_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1117]++;
jasmine.JsApiReporter.prototype.resultsForSpec = function(specId) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1118]++;
  return this.results_[specId];
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1122]++;
jasmine.JsApiReporter.prototype.reportRunnerResults = function(runner) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1123]++;
  this.finished = true;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1127]++;
jasmine.JsApiReporter.prototype.reportSuiteResults = function(suite) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1131]++;
jasmine.JsApiReporter.prototype.reportSpecResults = function(spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1132]++;
  this.results_[spec.id] = {
  messages: spec.results().getItems(), 
  result: spec.results().failedCount > 0 ? "failed" : "passed"};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1139]++;
jasmine.JsApiReporter.prototype.log = function(str) {
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1142]++;
jasmine.JsApiReporter.prototype.resultsForSpecs = function(specIds) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1143]++;
  var results = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1144]++;
  for (var i = 0; i < specIds.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1145]++;
    var specId = specIds[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1146]++;
    results[specId] = this.summarizeResult_(this.results_[specId]);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1148]++;
  return results;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1151]++;
jasmine.JsApiReporter.prototype.summarizeResult_ = function(result) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1152]++;
  var summaryMessages = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1153]++;
  var messagesLength = result.messages.length;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1154]++;
  for (var messageIndex = 0; messageIndex < messagesLength; messageIndex++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1155]++;
    var resultMessage = result.messages[messageIndex];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1156]++;
    summaryMessages.push({
  text: resultMessage.type == 'log' ? resultMessage.toString() : jasmine.undefined, 
  passed: resultMessage.passed ? resultMessage.passed() : true, 
  type: resultMessage.type, 
  message: resultMessage.message, 
  trace: {
  stack: resultMessage.passed && !resultMessage.passed() ? resultMessage.trace.stack : jasmine.undefined}});
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1167]++;
  return {
  result: result.result, 
  messages: summaryMessages};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1179]++;
jasmine.Matchers = function(env, actual, spec, opt_isNot) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1180]++;
  this.env = env;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1181]++;
  this.actual = actual;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1182]++;
  this.spec = spec;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1183]++;
  this.isNot = opt_isNot || false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1184]++;
  this.reportWasCalled_ = false;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1188]++;
jasmine.Matchers.pp = function(str) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1189]++;
  throw new Error("jasmine.Matchers.pp() is no longer supported, please use jasmine.pp() instead!");
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1193]++;
jasmine.Matchers.prototype.report = function(result, failing_message, details) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1194]++;
  throw new Error("As of jasmine 0.11, custom matchers must be implemented differently -- please see jasmine docs");
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1197]++;
jasmine.Matchers.wrapInto_ = function(prototype, matchersClass) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1198]++;
  for (var methodName in prototype) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1199]++;
    if (methodName == 'report') 
      continue;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1200]++;
    var orig = prototype[methodName];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1201]++;
    matchersClass.prototype[methodName] = jasmine.Matchers.matcherFn_(methodName, orig);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1205]++;
jasmine.Matchers.matcherFn_ = function(matcherName, matcherFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1206]++;
  return function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1207]++;
  var matcherArgs = jasmine.util.argsToArray(arguments);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1208]++;
  var result = matcherFunction.apply(this, arguments);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1210]++;
  if (this.isNot) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1211]++;
    result = !result;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1214]++;
  if (this.reportWasCalled_) 
    return result;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1216]++;
  var message;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1217]++;
  if (!result) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1218]++;
    if (this.message) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1219]++;
      message = this.message.apply(this, arguments);
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1220]++;
      if (jasmine.isArray_(message)) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1221]++;
        message = message[this.isNot ? 1 : 0];
      }
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1224]++;
      var englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) {
  return ' ' + s.toLowerCase();
});
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1225]++;
      message = "Expected " + jasmine.pp(this.actual) + (this.isNot ? " not " : " ") + englishyPredicate;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1226]++;
      if (matcherArgs.length > 0) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1227]++;
        for (var i = 0; i < matcherArgs.length; i++) {
          _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1228]++;
          if (i > 0) 
            message += ",";
          _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1229]++;
          message += " " + jasmine.pp(matcherArgs[i]);
        }
      }
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1232]++;
      message += ".";
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1235]++;
  var expectationResult = new jasmine.ExpectationResult({
  matcherName: matcherName, 
  passed: result, 
  expected: matcherArgs.length > 1 ? matcherArgs : matcherArgs[0], 
  actual: this.actual, 
  message: message});
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1242]++;
  this.spec.addMatcherResult(expectationResult);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1243]++;
  return jasmine.undefined;
};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1254]++;
jasmine.Matchers.prototype.toBe = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1255]++;
  return this.actual === expected;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1263]++;
jasmine.Matchers.prototype.toNotBe = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1264]++;
  return this.actual !== expected;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1272]++;
jasmine.Matchers.prototype.toEqual = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1273]++;
  return this.env.equals_(this.actual, expected);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1281]++;
jasmine.Matchers.prototype.toNotEqual = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1282]++;
  return !this.env.equals_(this.actual, expected);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1291]++;
jasmine.Matchers.prototype.toMatch = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1292]++;
  return new RegExp(expected).test(this.actual);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1300]++;
jasmine.Matchers.prototype.toNotMatch = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1301]++;
  return !(new RegExp(expected).test(this.actual));
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1307]++;
jasmine.Matchers.prototype.toBeDefined = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1308]++;
  return (this.actual !== jasmine.undefined);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1314]++;
jasmine.Matchers.prototype.toBeUndefined = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1315]++;
  return (this.actual === jasmine.undefined);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1321]++;
jasmine.Matchers.prototype.toBeNull = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1322]++;
  return (this.actual === null);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1328]++;
jasmine.Matchers.prototype.toBeNaN = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1329]++;
  this.message = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1330]++;
  return ["Expected " + jasmine.pp(this.actual) + " to be NaN."];
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1333]++;
  return (this.actual !== this.actual);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1339]++;
jasmine.Matchers.prototype.toBeTruthy = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1340]++;
  return !!this.actual;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1347]++;
jasmine.Matchers.prototype.toBeFalsy = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1348]++;
  return !this.actual;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1355]++;
jasmine.Matchers.prototype.toHaveBeenCalled = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1356]++;
  if (arguments.length > 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1357]++;
    throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1360]++;
  if (!jasmine.isSpy(this.actual)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1361]++;
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1364]++;
  this.message = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1365]++;
  return ["Expected spy " + this.actual.identity + " to have been called.", "Expected spy " + this.actual.identity + " not to have been called."];
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1371]++;
  return this.actual.wasCalled;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1375]++;
jasmine.Matchers.prototype.wasCalled = jasmine.Matchers.prototype.toHaveBeenCalled;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1382]++;
jasmine.Matchers.prototype.wasNotCalled = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1383]++;
  if (arguments.length > 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1384]++;
    throw new Error('wasNotCalled does not take arguments');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1387]++;
  if (!jasmine.isSpy(this.actual)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1388]++;
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1391]++;
  this.message = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1392]++;
  return ["Expected spy " + this.actual.identity + " to not have been called.", "Expected spy " + this.actual.identity + " to have been called."];
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1398]++;
  return !this.actual.wasCalled;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1407]++;
jasmine.Matchers.prototype.toHaveBeenCalledWith = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1408]++;
  var expectedArgs = jasmine.util.argsToArray(arguments);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1409]++;
  if (!jasmine.isSpy(this.actual)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1410]++;
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1412]++;
  this.message = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1413]++;
  var invertedMessage = "Expected spy " + this.actual.identity + " not to have been called with " + jasmine.pp(expectedArgs) + " but it was.";
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1414]++;
  var positiveMessage = "";
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1415]++;
  if (this.actual.callCount === 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1416]++;
    positiveMessage = "Expected spy " + this.actual.identity + " to have been called with " + jasmine.pp(expectedArgs) + " but it was never called.";
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1418]++;
    positiveMessage = "Expected spy " + this.actual.identity + " to have been called with " + jasmine.pp(expectedArgs) + " but actual calls were " + jasmine.pp(this.actual.argsForCall).replace(/^\[ | \]$/g, '');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1420]++;
  return [positiveMessage, invertedMessage];
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1423]++;
  return this.env.contains_(this.actual.argsForCall, expectedArgs);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1427]++;
jasmine.Matchers.prototype.wasCalledWith = jasmine.Matchers.prototype.toHaveBeenCalledWith;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1430]++;
jasmine.Matchers.prototype.wasNotCalledWith = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1431]++;
  var expectedArgs = jasmine.util.argsToArray(arguments);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1432]++;
  if (!jasmine.isSpy(this.actual)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1433]++;
    throw new Error('Expected a spy, but got ' + jasmine.pp(this.actual) + '.');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1436]++;
  this.message = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1437]++;
  return ["Expected spy not to have been called with " + jasmine.pp(expectedArgs) + " but it was", "Expected spy to have been called with " + jasmine.pp(expectedArgs) + " but it was"];
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1443]++;
  return !this.env.contains_(this.actual.argsForCall, expectedArgs);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1451]++;
jasmine.Matchers.prototype.toContain = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1452]++;
  return this.env.contains_(this.actual, expected);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1461]++;
jasmine.Matchers.prototype.toNotContain = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1462]++;
  return !this.env.contains_(this.actual, expected);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1465]++;
jasmine.Matchers.prototype.toBeLessThan = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1466]++;
  return this.actual < expected;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1469]++;
jasmine.Matchers.prototype.toBeGreaterThan = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1470]++;
  return this.actual > expected;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1480]++;
jasmine.Matchers.prototype.toBeCloseTo = function(expected, precision) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1481]++;
  if (!(precision === 0)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1482]++;
    precision = precision || 2;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1484]++;
  return Math.abs(expected - this.actual) < (Math.pow(10, -precision) / 2);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1492]++;
jasmine.Matchers.prototype.toThrow = function(expected) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1493]++;
  var result = false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1494]++;
  var exception;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1495]++;
  if (typeof this.actual != 'function') {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1496]++;
    throw new Error('Actual is not a function');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1498]++;
  try {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1499]++;
    this.actual();
  }  catch (e) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1501]++;
  exception = e;
}
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1503]++;
  if (exception) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1504]++;
    result = (expected === jasmine.undefined || this.env.equals_(exception.message || exception, expected.message || expected));
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1507]++;
  var not = this.isNot ? "not " : "";
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1509]++;
  this.message = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1510]++;
  if (exception && (expected === jasmine.undefined || !this.env.equals_(exception.message || exception, expected.message || expected))) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1511]++;
    return ["Expected function " + not + "to throw", expected ? expected.message || expected : "an exception", ", but it threw", exception.message || exception].join(' ');
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1513]++;
    return "Expected function to throw an exception.";
  }
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1517]++;
  return result;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1520]++;
jasmine.Matchers.Any = function(expectedClass) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1521]++;
  this.expectedClass = expectedClass;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1524]++;
jasmine.Matchers.Any.prototype.jasmineMatches = function(other) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1525]++;
  if (this.expectedClass == String) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1526]++;
    return typeof other == 'string' || other instanceof String;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1529]++;
  if (this.expectedClass == Number) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1530]++;
    return typeof other == 'number' || other instanceof Number;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1533]++;
  if (this.expectedClass == Function) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1534]++;
    return typeof other == 'function' || other instanceof Function;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1537]++;
  if (this.expectedClass == Object) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1538]++;
    return typeof other == 'object';
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1541]++;
  return other instanceof this.expectedClass;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1544]++;
jasmine.Matchers.Any.prototype.jasmineToString = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1545]++;
  return '<jasmine.any(' + this.expectedClass + ')>';
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1548]++;
jasmine.Matchers.ObjectContaining = function(sample) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1549]++;
  this.sample = sample;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1552]++;
jasmine.Matchers.ObjectContaining.prototype.jasmineMatches = function(other, mismatchKeys, mismatchValues) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1553]++;
  mismatchKeys = mismatchKeys || [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1554]++;
  mismatchValues = mismatchValues || [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1556]++;
  var env = jasmine.getEnv();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1558]++;
  var hasKey = function(obj, keyName) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1559]++;
  return obj != null && obj[keyName] !== jasmine.undefined;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1562]++;
  for (var property in this.sample) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1563]++;
    if (!hasKey(other, property) && hasKey(this.sample, property)) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1564]++;
      mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1566]++;
      if (!env.equals_(this.sample[property], other[property], mismatchKeys, mismatchValues)) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1567]++;
        mismatchValues.push("'" + property + "' was '" + (other[property] ? jasmine.util.htmlEscape(other[property].toString()) : other[property]) + "' in expected, but was '" + (this.sample[property] ? jasmine.util.htmlEscape(this.sample[property].toString()) : this.sample[property]) + "' in actual.");
      }
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1571]++;
  return (mismatchKeys.length === 0 && mismatchValues.length === 0);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1574]++;
jasmine.Matchers.ObjectContaining.prototype.jasmineToString = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1575]++;
  return "<jasmine.objectContaining(" + jasmine.pp(this.sample) + ")>";
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1580]++;
jasmine.FakeTimer = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1581]++;
  this.reset();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1583]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1584]++;
  self.setTimeout = function(funcToCall, millis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1585]++;
  self.timeoutsMade++;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1586]++;
  self.scheduleFunction(self.timeoutsMade, funcToCall, millis, false);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1587]++;
  return self.timeoutsMade;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1590]++;
  self.setInterval = function(funcToCall, millis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1591]++;
  self.timeoutsMade++;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1592]++;
  self.scheduleFunction(self.timeoutsMade, funcToCall, millis, true);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1593]++;
  return self.timeoutsMade;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1596]++;
  self.clearTimeout = function(timeoutKey) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1597]++;
  self.scheduledFunctions[timeoutKey] = jasmine.undefined;
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1600]++;
  self.clearInterval = function(timeoutKey) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1601]++;
  self.scheduledFunctions[timeoutKey] = jasmine.undefined;
};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1606]++;
jasmine.FakeTimer.prototype.reset = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1607]++;
  this.timeoutsMade = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1608]++;
  this.scheduledFunctions = {};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1609]++;
  this.nowMillis = 0;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1612]++;
jasmine.FakeTimer.prototype.tick = function(millis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1613]++;
  var oldMillis = this.nowMillis;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1614]++;
  var newMillis = oldMillis + millis;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1615]++;
  this.runFunctionsWithinRange(oldMillis, newMillis);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1616]++;
  this.nowMillis = newMillis;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1619]++;
jasmine.FakeTimer.prototype.runFunctionsWithinRange = function(oldMillis, nowMillis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1620]++;
  var scheduledFunc;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1621]++;
  var funcsToRun = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1622]++;
  for (var timeoutKey in this.scheduledFunctions) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1623]++;
    scheduledFunc = this.scheduledFunctions[timeoutKey];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1624]++;
    if (scheduledFunc != jasmine.undefined && scheduledFunc.runAtMillis >= oldMillis && scheduledFunc.runAtMillis <= nowMillis) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1627]++;
      funcsToRun.push(scheduledFunc);
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1628]++;
      this.scheduledFunctions[timeoutKey] = jasmine.undefined;
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1632]++;
  if (funcsToRun.length > 0) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1633]++;
    funcsToRun.sort(function(a, b) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1634]++;
  return a.runAtMillis - b.runAtMillis;
});
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1636]++;
    for (var i = 0; i < funcsToRun.length; ++i) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1637]++;
      try {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1638]++;
        var funcToRun = funcsToRun[i];
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1639]++;
        this.nowMillis = funcToRun.runAtMillis;
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1640]++;
        funcToRun.funcToCall();
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1641]++;
        if (funcToRun.recurring) {
          _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1642]++;
          this.scheduleFunction(funcToRun.timeoutKey, funcToRun.funcToCall, funcToRun.millis, true);
        }
      }      catch (e) {
}
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1650]++;
    this.runFunctionsWithinRange(oldMillis, nowMillis);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1654]++;
jasmine.FakeTimer.prototype.scheduleFunction = function(timeoutKey, funcToCall, millis, recurring) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1655]++;
  this.scheduledFunctions[timeoutKey] = {
  runAtMillis: this.nowMillis + millis, 
  funcToCall: funcToCall, 
  recurring: recurring, 
  timeoutKey: timeoutKey, 
  millis: millis};
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1667]++;
jasmine.Clock = {
  defaultFakeTimer: new jasmine.FakeTimer(), 
  reset: function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1671]++;
  jasmine.Clock.assertInstalled();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1672]++;
  jasmine.Clock.defaultFakeTimer.reset();
}, 
  tick: function(millis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1676]++;
  jasmine.Clock.assertInstalled();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1677]++;
  jasmine.Clock.defaultFakeTimer.tick(millis);
}, 
  runFunctionsWithinRange: function(oldMillis, nowMillis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1681]++;
  jasmine.Clock.defaultFakeTimer.runFunctionsWithinRange(oldMillis, nowMillis);
}, 
  scheduleFunction: function(timeoutKey, funcToCall, millis, recurring) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1685]++;
  jasmine.Clock.defaultFakeTimer.scheduleFunction(timeoutKey, funcToCall, millis, recurring);
}, 
  useMock: function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1689]++;
  if (!jasmine.Clock.isInstalled()) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1690]++;
    var spec = jasmine.getEnv().currentSpec;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1691]++;
    spec.after(jasmine.Clock.uninstallMock);
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1693]++;
    jasmine.Clock.installMock();
  }
}, 
  installMock: function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1698]++;
  jasmine.Clock.installed = jasmine.Clock.defaultFakeTimer;
}, 
  uninstallMock: function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1702]++;
  jasmine.Clock.assertInstalled();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1703]++;
  jasmine.Clock.installed = jasmine.Clock.real;
}, 
  real: {
  setTimeout: jasmine.getGlobal().setTimeout, 
  clearTimeout: jasmine.getGlobal().clearTimeout, 
  setInterval: jasmine.getGlobal().setInterval, 
  clearInterval: jasmine.getGlobal().clearInterval}, 
  assertInstalled: function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1714]++;
  if (!jasmine.Clock.isInstalled()) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1715]++;
    throw new Error("Mock clock is not installed, use jasmine.Clock.useMock()");
  }
}, 
  isInstalled: function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1720]++;
  return jasmine.Clock.installed == jasmine.Clock.defaultFakeTimer;
}, 
  installed: null};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1725]++;
jasmine.Clock.installed = jasmine.Clock.real;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1728]++;
jasmine.getGlobal().setTimeout = function(funcToCall, millis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1729]++;
  if (jasmine.Clock.installed.setTimeout.apply) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1730]++;
    return jasmine.Clock.installed.setTimeout.apply(this, arguments);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1732]++;
    return jasmine.Clock.installed.setTimeout(funcToCall, millis);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1736]++;
jasmine.getGlobal().setInterval = function(funcToCall, millis) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1737]++;
  if (jasmine.Clock.installed.setInterval.apply) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1738]++;
    return jasmine.Clock.installed.setInterval.apply(this, arguments);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1740]++;
    return jasmine.Clock.installed.setInterval(funcToCall, millis);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1744]++;
jasmine.getGlobal().clearTimeout = function(timeoutKey) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1745]++;
  if (jasmine.Clock.installed.clearTimeout.apply) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1746]++;
    return jasmine.Clock.installed.clearTimeout.apply(this, arguments);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1748]++;
    return jasmine.Clock.installed.clearTimeout(timeoutKey);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1752]++;
jasmine.getGlobal().clearInterval = function(timeoutKey) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1753]++;
  if (jasmine.Clock.installed.clearTimeout.apply) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1754]++;
    return jasmine.Clock.installed.clearInterval.apply(this, arguments);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1756]++;
    return jasmine.Clock.installed.clearInterval(timeoutKey);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1763]++;
jasmine.MultiReporter = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1764]++;
  this.subReporters_ = [];
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1766]++;
jasmine.util.inherit(jasmine.MultiReporter, jasmine.Reporter);
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1768]++;
jasmine.MultiReporter.prototype.addReporter = function(reporter) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1769]++;
  this.subReporters_.push(reporter);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1772]++;
(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1773]++;
  var functionNames = ["reportRunnerStarting", "reportRunnerResults", "reportSuiteResults", "reportSpecStarting", "reportSpecResults", "log"];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1781]++;
  for (var i = 0; i < functionNames.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1782]++;
    var functionName = functionNames[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1783]++;
    jasmine.MultiReporter.prototype[functionName] = (function(functionName) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1784]++;
  return function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1785]++;
  for (var j = 0; j < this.subReporters_.length; j++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1786]++;
    var subReporter = this.subReporters_[j];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1787]++;
    if (subReporter[functionName]) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1788]++;
      subReporter[functionName].apply(subReporter, arguments);
    }
  }
};
})(functionName);
  }
})();
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1800]++;
jasmine.NestedResults = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1804]++;
  this.totalCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1808]++;
  this.passedCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1812]++;
  this.failedCount = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1816]++;
  this.skipped = false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1820]++;
  this.items_ = [];
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1828]++;
jasmine.NestedResults.prototype.rollupCounts = function(result) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1829]++;
  this.totalCount += result.totalCount;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1830]++;
  this.passedCount += result.passedCount;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1831]++;
  this.failedCount += result.failedCount;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1838]++;
jasmine.NestedResults.prototype.log = function(values) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1839]++;
  this.items_.push(new jasmine.MessageResult(values));
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1845]++;
jasmine.NestedResults.prototype.getItems = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1846]++;
  return this.items_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1853]++;
jasmine.NestedResults.prototype.addResult = function(result) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1854]++;
  if (result.type != 'log') {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1855]++;
    if (result.items_) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1856]++;
      this.rollupCounts(result);
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1858]++;
      this.totalCount++;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1859]++;
      if (result.passed()) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1860]++;
        this.passedCount++;
      } else {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1862]++;
        this.failedCount++;
      }
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1866]++;
  this.items_.push(result);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1872]++;
jasmine.NestedResults.prototype.passed = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1873]++;
  return this.passedCount === this.totalCount;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1878]++;
jasmine.PrettyPrinter = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1879]++;
  this.ppNestLevel_ = 0;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1887]++;
jasmine.PrettyPrinter.prototype.format = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1888]++;
  this.ppNestLevel_++;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1889]++;
  try {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1890]++;
    if (value === jasmine.undefined) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1891]++;
      this.emitScalar('undefined');
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1892]++;
      if (value === null) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1893]++;
        this.emitScalar('null');
      } else {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1894]++;
        if (value === jasmine.getGlobal()) {
          _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1895]++;
          this.emitScalar('<global>');
        } else {
          _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1896]++;
          if (value.jasmineToString) {
            _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1897]++;
            this.emitScalar(value.jasmineToString());
          } else {
            _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1898]++;
            if (typeof value === 'string') {
              _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1899]++;
              this.emitString(value);
            } else {
              _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1900]++;
              if (jasmine.isSpy(value)) {
                _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1901]++;
                this.emitScalar("spy on " + value.identity);
              } else {
                _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1902]++;
                if (value instanceof RegExp) {
                  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1903]++;
                  this.emitScalar(value.toString());
                } else {
                  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1904]++;
                  if (typeof value === 'function') {
                    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1905]++;
                    this.emitScalar('Function');
                  } else {
                    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1906]++;
                    if (typeof value.nodeType === 'number') {
                      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1907]++;
                      this.emitScalar('HTMLNode');
                    } else {
                      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1908]++;
                      if (value instanceof Date) {
                        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1909]++;
                        this.emitScalar('Date(' + value + ')');
                      } else {
                        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1910]++;
                        if (value.__Jasmine_been_here_before__) {
                          _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1911]++;
                          this.emitScalar('<circular reference: ' + (jasmine.isArray_(value) ? 'Array' : 'Object') + '>');
                        } else {
                          _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1912]++;
                          if (jasmine.isArray_(value) || typeof value == 'object') {
                            _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1913]++;
                            value.__Jasmine_been_here_before__ = true;
                            _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1914]++;
                            if (jasmine.isArray_(value)) {
                              _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1915]++;
                              this.emitArray(value);
                            } else {
                              _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1917]++;
                              this.emitObject(value);
                            }
                            _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1919]++;
                            delete value.__Jasmine_been_here_before__;
                          } else {
                            _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1921]++;
                            this.emitScalar(value.toString());
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } finally   {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1924]++;
    this.ppNestLevel_--;
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1928]++;
jasmine.PrettyPrinter.prototype.iterateObject = function(obj, fn) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1929]++;
  for (var property in obj) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1930]++;
    if (!obj.hasOwnProperty(property)) 
      continue;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1931]++;
    if (property == '__Jasmine_been_here_before__') 
      continue;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1932]++;
    fn(property, obj.__lookupGetter__ ? (obj.__lookupGetter__(property) !== jasmine.undefined && obj.__lookupGetter__(property) !== null) : false);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1937]++;
jasmine.PrettyPrinter.prototype.emitArray = jasmine.unimplementedMethod_;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1938]++;
jasmine.PrettyPrinter.prototype.emitObject = jasmine.unimplementedMethod_;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1939]++;
jasmine.PrettyPrinter.prototype.emitScalar = jasmine.unimplementedMethod_;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1940]++;
jasmine.PrettyPrinter.prototype.emitString = jasmine.unimplementedMethod_;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1942]++;
jasmine.StringPrettyPrinter = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1943]++;
  jasmine.PrettyPrinter.call(this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1945]++;
  this.string = '';
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1947]++;
jasmine.util.inherit(jasmine.StringPrettyPrinter, jasmine.PrettyPrinter);
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1949]++;
jasmine.StringPrettyPrinter.prototype.emitScalar = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1950]++;
  this.append(value);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1953]++;
jasmine.StringPrettyPrinter.prototype.emitString = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1954]++;
  this.append("'" + value + "'");
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1957]++;
jasmine.StringPrettyPrinter.prototype.emitArray = function(array) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1958]++;
  if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1959]++;
    this.append("Array");
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1960]++;
    return;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1963]++;
  this.append('[ ');
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1964]++;
  for (var i = 0; i < array.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1965]++;
    if (i > 0) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1966]++;
      this.append(', ');
    }
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1968]++;
    this.format(array[i]);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1970]++;
  this.append(' ]');
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1973]++;
jasmine.StringPrettyPrinter.prototype.emitObject = function(obj) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1974]++;
  if (this.ppNestLevel_ > jasmine.MAX_PRETTY_PRINT_DEPTH) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1975]++;
    this.append("Object");
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1976]++;
    return;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1979]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1980]++;
  this.append('{ ');
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1981]++;
  var first = true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1983]++;
  this.iterateObject(obj, function(property, isGetter) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1984]++;
  if (first) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1985]++;
    first = false;
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1987]++;
    self.append(', ');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1990]++;
  self.append(property);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1991]++;
  self.append(' : ');
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1992]++;
  if (isGetter) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1993]++;
    self.append('<getter>');
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1995]++;
    self.format(obj[property]);
  }
});
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[1999]++;
  this.append(' }');
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2002]++;
jasmine.StringPrettyPrinter.prototype.append = function(value) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2003]++;
  this.string += value;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2005]++;
jasmine.Queue = function(env) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2006]++;
  this.env = env;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2010]++;
  this.ensured = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2011]++;
  this.blocks = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2012]++;
  this.running = false;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2013]++;
  this.index = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2014]++;
  this.offset = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2015]++;
  this.abort = false;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2018]++;
jasmine.Queue.prototype.addBefore = function(block, ensure) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2019]++;
  if (ensure === jasmine.undefined) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2020]++;
    ensure = false;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2023]++;
  this.blocks.unshift(block);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2024]++;
  this.ensured.unshift(ensure);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2027]++;
jasmine.Queue.prototype.add = function(block, ensure) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2028]++;
  if (ensure === jasmine.undefined) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2029]++;
    ensure = false;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2032]++;
  this.blocks.push(block);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2033]++;
  this.ensured.push(ensure);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2036]++;
jasmine.Queue.prototype.insertNext = function(block, ensure) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2037]++;
  if (ensure === jasmine.undefined) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2038]++;
    ensure = false;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2041]++;
  this.ensured.splice((this.index + this.offset + 1), 0, ensure);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2042]++;
  this.blocks.splice((this.index + this.offset + 1), 0, block);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2043]++;
  this.offset++;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2046]++;
jasmine.Queue.prototype.start = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2047]++;
  this.running = true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2048]++;
  this.onComplete = onComplete;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2049]++;
  this.next_();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2052]++;
jasmine.Queue.prototype.isRunning = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2053]++;
  return this.running;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2056]++;
jasmine.Queue.LOOP_DONT_RECURSE = true;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2058]++;
jasmine.Queue.prototype.next_ = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2059]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2060]++;
  var goAgain = true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2062]++;
  while (goAgain) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2063]++;
    goAgain = false;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2065]++;
    if (self.index < self.blocks.length && !(this.abort && !this.ensured[self.index])) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2066]++;
      var calledSynchronously = true;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2067]++;
      var completedSynchronously = false;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2069]++;
      var onComplete = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2070]++;
  if (jasmine.Queue.LOOP_DONT_RECURSE && calledSynchronously) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2071]++;
    completedSynchronously = true;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2072]++;
    return;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2075]++;
  if (self.blocks[self.index].abort) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2076]++;
    self.abort = true;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2079]++;
  self.offset = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2080]++;
  self.index++;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2082]++;
  var now = new Date().getTime();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2083]++;
  if (self.env.updateInterval && now - self.env.lastUpdate > self.env.updateInterval) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2084]++;
    self.env.lastUpdate = now;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2085]++;
    self.env.setTimeout(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2086]++;
  self.next_();
}, 0);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2089]++;
    if (jasmine.Queue.LOOP_DONT_RECURSE && completedSynchronously) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2090]++;
      goAgain = true;
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2092]++;
      self.next_();
    }
  }
};
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2096]++;
      self.blocks[self.index].execute(onComplete);
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2098]++;
      calledSynchronously = false;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2099]++;
      if (completedSynchronously) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2100]++;
        onComplete();
      }
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2104]++;
      self.running = false;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2105]++;
      if (self.onComplete) {
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2106]++;
        self.onComplete();
      }
    }
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2112]++;
jasmine.Queue.prototype.results = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2113]++;
  var results = new jasmine.NestedResults();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2114]++;
  for (var i = 0; i < this.blocks.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2115]++;
    if (this.blocks[i].results) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2116]++;
      results.addResult(this.blocks[i].results());
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2119]++;
  return results;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2129]++;
jasmine.Runner = function(env) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2130]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2131]++;
  self.env = env;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2132]++;
  self.queue = new jasmine.Queue(env);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2133]++;
  self.before_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2134]++;
  self.after_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2135]++;
  self.suites_ = [];
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2138]++;
jasmine.Runner.prototype.execute = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2139]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2140]++;
  if (self.env.reporter.reportRunnerStarting) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2141]++;
    self.env.reporter.reportRunnerStarting(this);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2143]++;
  self.queue.start(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2144]++;
  self.finishCallback();
});
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2148]++;
jasmine.Runner.prototype.beforeEach = function(beforeEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2149]++;
  beforeEachFunction.typeName = 'beforeEach';
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2150]++;
  this.before_.splice(0, 0, beforeEachFunction);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2153]++;
jasmine.Runner.prototype.afterEach = function(afterEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2154]++;
  afterEachFunction.typeName = 'afterEach';
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2155]++;
  this.after_.splice(0, 0, afterEachFunction);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2159]++;
jasmine.Runner.prototype.finishCallback = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2160]++;
  this.env.reporter.reportRunnerResults(this);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2163]++;
jasmine.Runner.prototype.addSuite = function(suite) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2164]++;
  this.suites_.push(suite);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2167]++;
jasmine.Runner.prototype.add = function(block) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2168]++;
  if (block instanceof jasmine.Suite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2169]++;
    this.addSuite(block);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2171]++;
  this.queue.add(block);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2174]++;
jasmine.Runner.prototype.specs = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2175]++;
  var suites = this.suites();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2176]++;
  var specs = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2177]++;
  for (var i = 0; i < suites.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2178]++;
    specs = specs.concat(suites[i].specs());
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2180]++;
  return specs;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2183]++;
jasmine.Runner.prototype.suites = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2184]++;
  return this.suites_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2187]++;
jasmine.Runner.prototype.topLevelSuites = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2188]++;
  var topLevelSuites = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2189]++;
  for (var i = 0; i < this.suites_.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2190]++;
    if (!this.suites_[i].parentSuite) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2191]++;
      topLevelSuites.push(this.suites_[i]);
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2194]++;
  return topLevelSuites;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2197]++;
jasmine.Runner.prototype.results = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2198]++;
  return this.queue.results();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2208]++;
jasmine.Spec = function(env, suite, description) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2209]++;
  if (!env) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2210]++;
    throw new Error('jasmine.Env() required');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2212]++;
  if (!suite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2213]++;
    throw new Error('jasmine.Suite() required');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2215]++;
  var spec = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2216]++;
  spec.id = env.nextSpecId ? env.nextSpecId() : null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2217]++;
  spec.env = env;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2218]++;
  spec.suite = suite;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2219]++;
  spec.description = description;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2220]++;
  spec.queue = new jasmine.Queue(env);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2222]++;
  spec.afterCallbacks = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2223]++;
  spec.spies_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2225]++;
  spec.results_ = new jasmine.NestedResults();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2226]++;
  spec.results_.description = description;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2227]++;
  spec.matchersClass = null;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2230]++;
jasmine.Spec.prototype.getFullName = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2231]++;
  return this.suite.getFullName() + ' ' + this.description + '.';
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2235]++;
jasmine.Spec.prototype.results = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2236]++;
  return this.results_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2244]++;
jasmine.Spec.prototype.log = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2245]++;
  return this.results_.log(arguments);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2248]++;
jasmine.Spec.prototype.runs = function(func) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2249]++;
  var block = new jasmine.Block(this.env, func, this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2250]++;
  this.addToQueue(block);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2251]++;
  return this;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2254]++;
jasmine.Spec.prototype.addToQueue = function(block) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2255]++;
  if (this.queue.isRunning()) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2256]++;
    this.queue.insertNext(block);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2258]++;
    this.queue.add(block);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2265]++;
jasmine.Spec.prototype.addMatcherResult = function(result) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2266]++;
  this.results_.addResult(result);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2269]++;
jasmine.Spec.prototype.expect = function(actual) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2270]++;
  var positive = new (this.getMatchersClass_())(this.env, actual, this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2271]++;
  positive.not = new (this.getMatchersClass_())(this.env, actual, this, true);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2272]++;
  return positive;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2281]++;
jasmine.Spec.prototype.waits = function(timeout) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2282]++;
  var waitsFunc = new jasmine.WaitsBlock(this.env, timeout, this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2283]++;
  this.addToQueue(waitsFunc);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2284]++;
  return this;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2294]++;
jasmine.Spec.prototype.waitsFor = function(latchFunction, optional_timeoutMessage, optional_timeout) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2295]++;
  var latchFunction_ = null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2296]++;
  var optional_timeoutMessage_ = null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2297]++;
  var optional_timeout_ = null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2299]++;
  for (var i = 0; i < arguments.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2300]++;
    var arg = arguments[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2301]++;
    switch (typeof arg) {
      case 'function':
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2303]++;
        latchFunction_ = arg;
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2304]++;
        break;
      case 'string':
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2306]++;
        optional_timeoutMessage_ = arg;
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2307]++;
        break;
      case 'number':
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2309]++;
        optional_timeout_ = arg;
        _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2310]++;
        break;
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2314]++;
  var waitsForFunc = new jasmine.WaitsForBlock(this.env, optional_timeout_, latchFunction_, optional_timeoutMessage_, this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2315]++;
  this.addToQueue(waitsForFunc);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2316]++;
  return this;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2319]++;
jasmine.Spec.prototype.fail = function(e) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2320]++;
  var expectationResult = new jasmine.ExpectationResult({
  passed: false, 
  message: e ? jasmine.util.formatException(e) : 'Exception', 
  trace: {
  stack: e.stack}});
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2325]++;
  this.results_.addResult(expectationResult);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2328]++;
jasmine.Spec.prototype.getMatchersClass_ = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2329]++;
  return this.matchersClass || this.env.matchersClass;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2332]++;
jasmine.Spec.prototype.addMatchers = function(matchersPrototype) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2333]++;
  var parent = this.getMatchersClass_();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2334]++;
  var newMatchersClass = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2335]++;
  parent.apply(this, arguments);
};
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2337]++;
  jasmine.util.inherit(newMatchersClass, parent);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2338]++;
  jasmine.Matchers.wrapInto_(matchersPrototype, newMatchersClass);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2339]++;
  this.matchersClass = newMatchersClass;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2342]++;
jasmine.Spec.prototype.finishCallback = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2343]++;
  this.env.reporter.reportSpecResults(this);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2346]++;
jasmine.Spec.prototype.finish = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2347]++;
  this.removeAllSpies();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2348]++;
  this.finishCallback();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2349]++;
  if (onComplete) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2350]++;
    onComplete();
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2354]++;
jasmine.Spec.prototype.after = function(doAfter) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2355]++;
  if (this.queue.isRunning()) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2356]++;
    this.queue.add(new jasmine.Block(this.env, doAfter, this), true);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2358]++;
    this.afterCallbacks.unshift(doAfter);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2362]++;
jasmine.Spec.prototype.execute = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2363]++;
  var spec = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2364]++;
  if (!spec.env.specFilter(spec)) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2365]++;
    spec.results_.skipped = true;
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2366]++;
    spec.finish(onComplete);
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2367]++;
    return;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2370]++;
  this.env.reporter.reportSpecStarting(this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2372]++;
  spec.env.currentSpec = spec;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2374]++;
  spec.addBeforesAndAftersToQueue();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2376]++;
  spec.queue.start(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2377]++;
  spec.finish(onComplete);
});
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2381]++;
jasmine.Spec.prototype.addBeforesAndAftersToQueue = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2382]++;
  var runner = this.env.currentRunner();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2383]++;
  var i;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2385]++;
  for (var suite = this.suite; suite; suite = suite.parentSuite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2386]++;
    for (i = 0; i < suite.before_.length; i++) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2387]++;
      this.queue.addBefore(new jasmine.Block(this.env, suite.before_[i], this));
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2390]++;
  for (i = 0; i < runner.before_.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2391]++;
    this.queue.addBefore(new jasmine.Block(this.env, runner.before_[i], this));
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2393]++;
  for (i = 0; i < this.afterCallbacks.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2394]++;
    this.queue.add(new jasmine.Block(this.env, this.afterCallbacks[i], this), true);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2396]++;
  for (suite = this.suite; suite; suite = suite.parentSuite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2397]++;
    for (i = 0; i < suite.after_.length; i++) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2398]++;
      this.queue.add(new jasmine.Block(this.env, suite.after_[i], this), true);
    }
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2401]++;
  for (i = 0; i < runner.after_.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2402]++;
    this.queue.add(new jasmine.Block(this.env, runner.after_[i], this), true);
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2406]++;
jasmine.Spec.prototype.explodes = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2407]++;
  throw 'explodes function should not have been called';
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2410]++;
jasmine.Spec.prototype.spyOn = function(obj, methodName, ignoreMethodDoesntExist) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2411]++;
  if (obj == jasmine.undefined) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2412]++;
    throw "spyOn could not find an object to spy upon for " + methodName + "()";
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2415]++;
  if (!ignoreMethodDoesntExist && obj[methodName] === jasmine.undefined) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2416]++;
    throw methodName + '() method does not exist';
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2419]++;
  if (!ignoreMethodDoesntExist && obj[methodName] && obj[methodName].isSpy) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2420]++;
    throw new Error(methodName + ' has already been spied upon');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2423]++;
  var spyObj = jasmine.createSpy(methodName);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2425]++;
  this.spies_.push(spyObj);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2426]++;
  spyObj.baseObj = obj;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2427]++;
  spyObj.methodName = methodName;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2428]++;
  spyObj.originalValue = obj[methodName];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2430]++;
  obj[methodName] = spyObj;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2432]++;
  return spyObj;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2435]++;
jasmine.Spec.prototype.removeAllSpies = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2436]++;
  for (var i = 0; i < this.spies_.length; i++) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2437]++;
    var spy = this.spies_[i];
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2438]++;
    spy.baseObj[spy.methodName] = spy.originalValue;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2440]++;
  this.spies_ = [];
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2452]++;
jasmine.Suite = function(env, description, specDefinitions, parentSuite) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2453]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2454]++;
  self.id = env.nextSuiteId ? env.nextSuiteId() : null;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2455]++;
  self.description = description;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2456]++;
  self.queue = new jasmine.Queue(env);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2457]++;
  self.parentSuite = parentSuite;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2458]++;
  self.env = env;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2459]++;
  self.before_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2460]++;
  self.after_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2461]++;
  self.children_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2462]++;
  self.suites_ = [];
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2463]++;
  self.specs_ = [];
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2466]++;
jasmine.Suite.prototype.getFullName = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2467]++;
  var fullName = this.description;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2468]++;
  for (var parentSuite = this.parentSuite; parentSuite; parentSuite = parentSuite.parentSuite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2469]++;
    fullName = parentSuite.description + ' ' + fullName;
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2471]++;
  return fullName;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2474]++;
jasmine.Suite.prototype.finish = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2475]++;
  this.env.reporter.reportSuiteResults(this);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2476]++;
  this.finished = true;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2477]++;
  if (typeof (onComplete) == 'function') {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2478]++;
    onComplete();
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2482]++;
jasmine.Suite.prototype.beforeEach = function(beforeEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2483]++;
  beforeEachFunction.typeName = 'beforeEach';
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2484]++;
  this.before_.unshift(beforeEachFunction);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2487]++;
jasmine.Suite.prototype.afterEach = function(afterEachFunction) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2488]++;
  afterEachFunction.typeName = 'afterEach';
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2489]++;
  this.after_.unshift(afterEachFunction);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2492]++;
jasmine.Suite.prototype.results = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2493]++;
  return this.queue.results();
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2496]++;
jasmine.Suite.prototype.add = function(suiteOrSpec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2497]++;
  this.children_.push(suiteOrSpec);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2498]++;
  if (suiteOrSpec instanceof jasmine.Suite) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2499]++;
    this.suites_.push(suiteOrSpec);
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2500]++;
    this.env.currentRunner().addSuite(suiteOrSpec);
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2502]++;
    this.specs_.push(suiteOrSpec);
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2504]++;
  this.queue.add(suiteOrSpec);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2507]++;
jasmine.Suite.prototype.specs = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2508]++;
  return this.specs_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2511]++;
jasmine.Suite.prototype.suites = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2512]++;
  return this.suites_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2515]++;
jasmine.Suite.prototype.children = function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2516]++;
  return this.children_;
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2519]++;
jasmine.Suite.prototype.execute = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2520]++;
  var self = this;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2521]++;
  this.queue.start(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2522]++;
  self.finish(onComplete);
});
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2525]++;
jasmine.WaitsBlock = function(env, timeout, spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2526]++;
  this.timeout = timeout;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2527]++;
  jasmine.Block.call(this, env, null, spec);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2530]++;
jasmine.util.inherit(jasmine.WaitsBlock, jasmine.Block);
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2532]++;
jasmine.WaitsBlock.prototype.execute = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2533]++;
  if (jasmine.VERBOSE) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2534]++;
    this.env.reporter.log('>> Jasmine waiting for ' + this.timeout + ' ms...');
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2536]++;
  this.env.setTimeout(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2537]++;
  onComplete();
}, this.timeout);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2551]++;
jasmine.WaitsForBlock = function(env, timeout, latchFunction, message, spec) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2552]++;
  this.timeout = timeout || env.defaultTimeoutInterval;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2553]++;
  this.latchFunction = latchFunction;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2554]++;
  this.message = message;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2555]++;
  this.totalTimeSpentWaitingForLatch = 0;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2556]++;
  jasmine.Block.call(this, env, null, spec);
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2558]++;
jasmine.util.inherit(jasmine.WaitsForBlock, jasmine.Block);
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2560]++;
jasmine.WaitsForBlock.TIMEOUT_INCREMENT = 10;
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2562]++;
jasmine.WaitsForBlock.prototype.execute = function(onComplete) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2563]++;
  if (jasmine.VERBOSE) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2564]++;
    this.env.reporter.log('>> Jasmine waiting for ' + (this.message || 'something to happen'));
  }
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2566]++;
  var latchFunctionResult;
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2567]++;
  try {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2568]++;
    latchFunctionResult = this.latchFunction.apply(this.spec);
  }  catch (e) {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2570]++;
  this.spec.fail(e);
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2571]++;
  onComplete();
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2572]++;
  return;
}
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2575]++;
  if (latchFunctionResult) {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2576]++;
    onComplete();
  } else {
    _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2577]++;
    if (this.totalTimeSpentWaitingForLatch >= this.timeout) {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2578]++;
      var message = 'timed out after ' + this.timeout + ' msec waiting for ' + (this.message || 'something to happen');
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2579]++;
      this.spec.fail({
  name: 'timeout', 
  message: message});
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2584]++;
      this.abort = true;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2585]++;
      onComplete();
    } else {
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2587]++;
      this.totalTimeSpentWaitingForLatch += jasmine.WaitsForBlock.TIMEOUT_INCREMENT;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2588]++;
      var self = this;
      _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2589]++;
      this.env.setTimeout(function() {
  _$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2590]++;
  self.execute(onComplete);
}, jasmine.WaitsForBlock.TIMEOUT_INCREMENT);
    }
  }
};
_$jscoverage['lib/jasmine-1.3.1/jasmine.js'].lineData[2595]++;
jasmine.version_ = {
  "major": 1, 
  "minor": 3, 
  "build": 1, 
  "revision": 1354556913};

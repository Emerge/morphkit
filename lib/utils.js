var qs = require('querystring');

String.prototype.clip = function (len, postfix) {
    postfix = postfix || "...";
    return this.length < len ? this.toString() : (this.substring(0, len) + postfix);
}

String.prototype.chopExt = function() {
    var i = this.toLowerCase().lastIndexOf(".config.js");
    if(i > -1) {
        return this.substring(0, i).toLowerCase();
    }
    return this.toLowerCase();
}

String.prototype.prettyJSON = function() {
    return JSON.stringify(JSON.parse(this.toString()), null, '\t');
}

String.prototype.prettyForm = function() {
    return JSON.stringify(qs.parse(this.toString()), null, "\t");
}

global.getf = function(fname) {
    return require('fs').readFileSync(fname).toString('utf8');
}

Function.prototype.once = function (err_when_dup) {
    var _this = this;
    if (_this._called == undefined) {
        _this._called = false;
        _this._meta = function () {
            if (_this.called) {
                if (err_when_dup) {
                    throw new Exception("Function tagged with [Once] called multiple times");
                }
                else {
                    return;
                }
            }
            _this.called = true;
            _this.apply(this, arguments);
        };
    }
    return _this._meta;
}
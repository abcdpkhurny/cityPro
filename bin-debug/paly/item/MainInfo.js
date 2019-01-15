var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainInfo = (function (_super) {
    __extends(MainInfo, _super);
    function MainInfo() {
        return _super.call(this) || this;
    }
    MainInfo.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainInfo.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameConst.removeChild(_this);
        }, this);
    };
    return MainInfo;
}(eui.Component));
__reflect(MainInfo.prototype, "MainInfo", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MainInfo.js.map
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
var ErrUI = (function (_super) {
    __extends(ErrUI, _super);
    function ErrUI() {
        return _super.call(this) || this;
    }
    ErrUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ErrUI.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btnRe.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.isRe = true;
            GameConst.removeChild(_this);
        }, this);
        this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.isExit = true;
            GameConst.removeChild(_this);
        }, this);
    };
    ErrUI.prototype.init = function () {
        this.isRe = false;
        this.isExit = false;
    };
    return ErrUI;
}(eui.Component));
__reflect(ErrUI.prototype, "ErrUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ErrUI.js.map
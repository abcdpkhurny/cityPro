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
var DestroyUI = (function (_super) {
    __extends(DestroyUI, _super);
    function DestroyUI() {
        return _super.call(this) || this;
    }
    DestroyUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DestroyUI.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btnYse.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //判断是否能量足够
            //这里应该判断需要点数是否大于用户点数
            if (BuildData.playEne >= 1) {
                BuildData.playEne -= 1;
                _this.isOK = true;
            }
            _this.flay = true;
            GameConst.removeChild(_this);
        }, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameConst.removeChild(_this);
        }, this);
        this.init();
    };
    DestroyUI.prototype.init = function () {
        this.textInfo.text = "需消耗能量1/" + BuildData.playEne;
        this.isOK = false;
        this.flay = false;
    };
    return DestroyUI;
}(eui.Component));
__reflect(DestroyUI.prototype, "DestroyUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DestroyUI.js.map
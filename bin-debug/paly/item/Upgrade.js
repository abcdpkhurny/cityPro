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
var Upgrade = (function (_super) {
    __extends(Upgrade, _super);
    function Upgrade() {
        return _super.call(this) || this;
    }
    Upgrade.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Upgrade.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameConst.removeChild(_this);
        }, this);
        this.btnYse.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //这里应该判断需要点数是否大于用户点数
            if (BuildData.playEne >= _this.expend) {
                BuildData.playEne -= _this.expend;
                _this.isOK = true;
            }
            _this.faly = true;
            GameConst.removeChild(_this);
        }, this);
    };
    Upgrade.prototype.init = function (grade, expend, name) {
        this.faly = false;
        this.isOK = false;
        if (grade == 1) {
            this.textIntro.text = "建造1级" + name + "需要点数：" + expend + "/" + BuildData.playEne;
        }
        else {
            this.textIntro.text = "升级到" + grade + "级需要点数：" + expend + "/" + BuildData.playEne;
        }
        this.expend = expend;
        this.textGrade.text = "Lv." + grade;
    };
    return Upgrade;
}(eui.Component));
__reflect(Upgrade.prototype, "Upgrade", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Upgrade.js.map
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
var MaxBuild = (function (_super) {
    __extends(MaxBuild, _super);
    function MaxBuild() {
        return _super.call(this) || this;
    }
    MaxBuild.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MaxBuild.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameConst.removeChild(_this);
        }, this);
        this.btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.controlBacksh(true);
            if (!_this.destroyUI)
                _this.destroyUI = new DestroyUI();
            else
                _this.destroyUI.init();
            _this.controlBacksh(true);
            _this.addChild(_this.destroyUI);
            //摧毁处理
            _this.destroyUI.once(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.controlBacksh(false);
                if (_this.destroyUI.isOK && _this.destroyUI.flay) {
                    _this.isDel = true;
                    //删除全部
                    GameConst.removeChild(_this);
                }
                else if (_this.destroyUI.flay) {
                    //弹出切片
                    if (!_this.checkUI)
                        _this.checkUI = new CheckUI();
                    else
                        _this.checkUI.init();
                    _this.controlBacksh(true);
                    _this.addChild(_this.checkUI);
                    _this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, function () {
                        console.log("删除切片");
                        _this.controlBacksh(false);
                    }, _this);
                }
            }, _this);
        }, this);
        this.imgbuild.source = "";
        this.textIntro.text = "";
        this.textName.text = "";
    };
    MaxBuild.prototype.init = function (build) {
        //console.log(build)
        this.imgbuild.source = build.source;
        var infoData = build["infoData"];
        this.textIntro.text = "目前已经是最高等级：Lv" + infoData.grade;
        this.textName.text = infoData.text;
        this.rootBuild = build;
    };
    /**
     * 控制黑底出现
     */
    MaxBuild.prototype.controlBacksh = function (flay) {
        if (!this.backShp) {
            this.backShp = new egret.Shape();
            this.backShp.graphics.beginFill(0x000000, 0.5);
            this.backShp.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
            this.backShp.graphics.endFill();
            this.backShp.touchEnabled = true;
        }
        if (flay) {
            this.addChild(this.backShp);
        }
        else {
            GameConst.removeChild(this.backShp);
        }
    };
    return MaxBuild;
}(eui.Component));
__reflect(MaxBuild.prototype, "MaxBuild", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MaxBuild.js.map
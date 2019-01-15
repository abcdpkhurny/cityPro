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
var UpdateBuild = (function (_super) {
    __extends(UpdateBuild, _super);
    function UpdateBuild() {
        return _super.call(this) || this;
    }
    UpdateBuild.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    UpdateBuild.prototype.childrenCreated = function () {
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
                GameConst.removeChild(_this);
            }
            else {
                //弹出切片
                _this.controlBacksh(true);
                _this.addChild(_this.checkUI);
                _this.checkUI.init();
                _this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, function () {
                    _this.textIntro.text = "升级到" + _this.grade + "级需要点数：" + _this.expend + "/" + BuildData.playEne;
                    _this.controlBacksh(false);
                }, _this);
            }
        }, this);
        this.btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!_this.destroyUI)
                _this.destroyUI = new DestroyUI();
            else
                _this.destroyUI.init();
            _this.controlBacksh(true);
            _this.addChild(_this.destroyUI);
            _this.destroyUI.once(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.controlBacksh(false);
                if (_this.destroyUI.isOK && _this.destroyUI.flay) {
                    _this.isDel = true;
                    //删除全部
                    GameConst.removeChild(_this);
                }
                else if (_this.destroyUI.flay) {
                    //弹出切片
                    _this.controlBacksh(true);
                    _this.addChild(_this.checkUI);
                    _this.checkUI.init();
                    _this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, function () {
                        _this.textIntro.text = "升级到" + _this.grade + "级需要点数：" + _this.expend + "/" + BuildData.playEne;
                        _this.controlBacksh(false);
                    }, _this);
                }
            }, _this);
        }, this);
        this.checkUI = SceneManager.instance.checkUI;
    };
    UpdateBuild.prototype.init = function (grade, expend, name, oldImg, newImg, updateImg, updateBuild) {
        this.isOK = false;
        this.isDel = false;
        this.textIntro.text = "升级到" + grade + "级需要点数：" + expend + "/" + BuildData.playEne;
        this.expend = expend;
        this.grade = grade;
        this.textGrade.text = "Lv." + grade;
        this.textName.text = name;
        this.oldbuild.source = oldImg;
        this.newbuild.source = newImg;
        this.updateImg = updateImg;
        this.updateBuild = updateBuild;
    };
    /**
     * 控制黑底出现
     */
    UpdateBuild.prototype.controlBacksh = function (flay) {
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
    return UpdateBuild;
}(eui.Component));
__reflect(UpdateBuild.prototype, "UpdateBuild", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UpdateBuild.js.map
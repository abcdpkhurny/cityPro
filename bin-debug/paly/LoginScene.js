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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 登陆类
 */
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/skin/LoginScene.exml";
        return _this;
    }
    LoginScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    LoginScene.prototype.onComplete = function () {
        var _this = this;
        //这里是授权点击
        var wxBtn = this.wxBtn = new eui.Image();
        wxBtn.source = "btn_accredit_png";
        this.addChild(wxBtn);
        wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!_this.loadingMask) {
                _this.loadingMask = GameConst.createLoadingMask(0.5, 0x0000000, true);
            }
            if (!_this.loading) {
                _this.loading = new LoadingUI();
            }
            _this.addChild(_this.loadingMask);
            _this.addChild(_this.loading);
            _this.login();
            console.log("点击了授权");
        }, this);
    };
    LoginScene.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = GameConst;
                        return [4 /*yield*/, platform.login()];
                    case 1:
                        _a.player = _b.sent();
                        console.log(GameConst.player);
                        if (GameConst.player) {
                            GameConst.removeChild(this);
                            SceneManager.toMainScene();
                            console.log("授权成功");
                        }
                        else {
                            GameConst.removeChild(this.loading);
                            GameConst.removeChild(this.loadingMask);
                            if (!this.backShp)
                                this.backShp = GameConst.createLoadingMask(0.2, 0x0000000, true);
                            GameConst.controlBacksh(this.backShp, true, this);
                            if (!this.errUI)
                                this.errUI = new ErrUI();
                            else
                                this.errUI.init();
                            this.addChild(this.errUI);
                            this.errUI.btnExit.label = "返回";
                            //网络出错
                            this.errUI.once(egret.Event.REMOVED_FROM_STAGE, function () {
                                GameConst.controlBacksh(_this.backShp, false, _this);
                                if (_this.errUI.isRe) {
                                    //重新运行一次login方法
                                    console.log("这里是重新授权");
                                    _this.addChild(_this.loadingMask);
                                    _this.addChild(_this.loading);
                                    _this.login();
                                }
                                if (_this.errUI.isExit) {
                                    //取消所有东西还原授权按钮
                                }
                            }, this);
                            console.log("网络出错");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoginScene;
}(eui.Component));
__reflect(LoginScene.prototype, "LoginScene");
//# sourceMappingURL=LoginScene.js.map
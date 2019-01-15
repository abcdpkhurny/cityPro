/**
 * 登陆类
 */
class LoginScene extends eui.Component {

	public constructor() {
		super()
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
		this.skinName = "resource/skin/LoginScene.exml";
	}

	protected createChildren() {
		super.createChildren();
	}

	private wxBtn

	private loading: LoadingUI
	private loadingMask: egret.Shape

	private errUI: ErrUI

	private onComplete(): void {
		//这里是授权点击
		var wxBtn = this.wxBtn = new eui.Image()
		wxBtn.source = "btn_accredit_png"
		this.addChild(wxBtn)
		wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (!this.loadingMask) {
				this.loadingMask = GameConst.createLoadingMask(0.5, 0x0000000, true)
			}
			if (!this.loading) {
				this.loading = new LoadingUI()
			}
			this.addChild(this.loadingMask)
			this.addChild(this.loading)
			this.login();
			console.log("点击了授权")
		}, this)
	}


	private async login() {
		GameConst.player = await platform.login();
		console.log(GameConst.player)
		if (GameConst.player) {
			GameConst.removeChild(this)
			SceneManager.toMainScene()
			console.log("授权成功")
		} else {
			// GameConst.removeChild(this.loading)
			// GameConst.removeChild(this.loadingMask)
			if (!this.backShp) this.backShp = GameConst.createLoadingMask(0.2, 0x0000000, true)
			GameConst.controlBacksh(this.backShp, true, this)
			if (!this.errUI) this.errUI = new ErrUI()
			else this.errUI.init()
			this.addChild(this.errUI)
			this.errUI.btnExit.label = "返回"
			//网络出错
			this.errUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
				GameConst.controlBacksh(this.backShp, false, this)
				if (this.errUI.isRe) {
					//重新运行一次login方法
					console.log("这里是重新授权");
					this.addChild(this.loadingMask);
					this.addChild(this.loading);
					this.login();
				}
				if (this.errUI.isExit) {
					//取消所有东西还原授权按钮
					GameConst.removeChild(this.loading)
					GameConst.removeChild(this.loadingMask)
				}
			}, this)
			console.log("网络出错")
		}
	}

	/**黑底遮罩 */
	private backShp: egret.Shape

}
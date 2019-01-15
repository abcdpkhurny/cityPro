class UpdateBuild extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public oldbuild: eui.Image
	public newbuild: eui.Image
	public btnYse: eui.Button
	public btnClose: eui.Button
	public btnClear: eui.Button
	public textIntro: eui.Label
	public textGrade: eui.Label
	public textName: eui.Label

	/**是否满足条件 */
	public isOK: boolean
	/**是否删除 */
	public isDel: boolean
	/**需要的点数 */
	public expend: number
	public grade: number

	public updateImg
	public updateBuild
	public rootBuild: eui.Image

	public checkUI: CheckUI
	public destroyUI: DestroyUI

	protected childrenCreated(): void {
		super.childrenCreated();
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GameConst.removeChild(this)
		}, this)
		this.btnYse.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			//这里应该判断需要点数是否大于用户点数
			if (BuildData.playEne >= this.expend) {
				BuildData.playEne -= this.expend
				this.isOK = true
				GameConst.removeChild(this)
			} else {
				//弹出切片
				this.controlBacksh(true)
				this.addChild(this.checkUI)
				this.checkUI.init()
				this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
					this.textIntro.text = "升级到" + this.grade + "级需要点数：" + this.expend + "/" + BuildData.playEne
					this.controlBacksh(false)
				}, this)
			}
		}, this)
		this.btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (!this.destroyUI) this.destroyUI = new DestroyUI()
			else this.destroyUI.init()
			this.controlBacksh(true)
			this.addChild(this.destroyUI)
			this.destroyUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
				this.controlBacksh(false)
				if (this.destroyUI.isOK && this.destroyUI.flay) {
					this.isDel = true
					//删除全部
					GameConst.removeChild(this)
				} else if (this.destroyUI.flay) {
					//弹出切片
					this.controlBacksh(true)
					this.addChild(this.checkUI)
					this.checkUI.init()
					this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
						this.textIntro.text = "升级到" + this.grade + "级需要点数：" + this.expend + "/" + BuildData.playEne
						this.controlBacksh(false)
					}, this)
				}
			}, this)
		}, this)
		this.checkUI = SceneManager.instance.checkUI
	}

	public init(grade: number, expend: number, name: string, oldImg: string, newImg: string, updateImg, updateBuild) {
		this.isOK = false
		this.isDel = false
		this.textIntro.text = "升级到" + grade + "级需要点数：" + expend + "/" + BuildData.playEne
		this.expend = expend
		this.grade = grade
		this.textGrade.text = "Lv." + grade
		this.textName.text = name
		this.oldbuild.source = oldImg
		this.newbuild.source = newImg
		this.updateImg = updateImg
		this.updateBuild = updateBuild
	}

	private backShp: egret.Shape

	/**
	 * 控制黑底出现
	 */
	private controlBacksh(flay: boolean) {
		if (!this.backShp) {
			this.backShp = new egret.Shape();
			this.backShp.graphics.beginFill(0x000000, 0.5);
			this.backShp.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
			this.backShp.graphics.endFill();
			this.backShp.touchEnabled = true
		}
		if (flay) {
			this.addChild(this.backShp)
		} else {
			GameConst.removeChild(this.backShp)
		}
	}

}
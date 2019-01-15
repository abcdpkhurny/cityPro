class MaxBuild extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public imgbuild: eui.Image
	public btnClose: eui.Button
	public btnClear: eui.Button
	public textIntro: eui.Label
	public textName: eui.Label

	public isDel: boolean

	public rootBuild: eui.Image

	public destroyUI: DestroyUI
	public checkUI: CheckUI

	protected childrenCreated(): void {
		super.childrenCreated();
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GameConst.removeChild(this)
		}, this)
		this.btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.controlBacksh(true)
			if (!this.destroyUI) this.destroyUI = new DestroyUI()
			else this.destroyUI.init()
			this.controlBacksh(true)
			this.addChild(this.destroyUI)
			//摧毁处理
			this.destroyUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
				this.controlBacksh(false)

				if (this.destroyUI.isOK && this.destroyUI.flay) {
					this.isDel = true
					//删除全部
					GameConst.removeChild(this)
				} else if (this.destroyUI.flay) {
					//弹出切片
					if (!this.checkUI) this.checkUI = new CheckUI();
					else this.checkUI.init()
					this.controlBacksh(true)
					this.addChild(this.checkUI)
					this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
						console.log("删除切片")
						this.controlBacksh(false)
					}, this)
				}
			}, this)

		}, this)
		this.imgbuild.source = ""
		this.textIntro.text = ""
		this.textName.text = ""
	}

	public init(build: eui.Image) {
		//console.log(build)
		this.imgbuild.source = build.source
		var infoData = build["infoData"]
		this.textIntro.text = "目前已经是最高等级：Lv" + infoData.grade
		this.textName.text = infoData.text
		this.rootBuild = build
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
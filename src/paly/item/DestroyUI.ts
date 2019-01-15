class DestroyUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public btnYse: eui.Button
	public btnClose: eui.Button
	public textInfo: eui.Label

	public isOK: boolean
	public flay: boolean

	protected childrenCreated(): void {
		super.childrenCreated();
		this.btnYse.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			//判断是否能量足够
			//这里应该判断需要点数是否大于用户点数
			if (BuildData.playEne >= 1) {
				BuildData.playEne -= 1
				this.isOK = true
			}
			this.flay = true
			GameConst.removeChild(this)
		}, this)
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GameConst.removeChild(this)
		}, this)
		this.init()
	}

	public init() {
		this.textInfo.text = "需消耗能量1/" + BuildData.playEne
		this.isOK = false
		this.flay = false
	}
}
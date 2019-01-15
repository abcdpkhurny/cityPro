class Upgrade extends eui.Component implements eui.UIComponent {
	public btnClose: eui.Image
	public btnYse: eui.Image
	public textIntro: eui.Label
	public textGrade: eui.Label
	public btnb: eui.Button

	/**是否选择确定 */
	public faly: boolean
	/**是否满足条件 */
	public isOK: boolean
	/**需要的点数 */
	public expend: number

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


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
			}
			this.faly = true
			GameConst.removeChild(this)
		}, this)
	}

	public init(grade: number, expend: number, name: string) {
		this.faly = false
		this.isOK = false
		if (grade == 1) {
			this.textIntro.text = "建造1级" + name + "需要点数：" + expend + "/" + BuildData.playEne
		} else {
			this.textIntro.text = "升级到" + grade + "级需要点数：" + expend + "/" + BuildData.playEne
		}
		this.expend = expend
		this.textGrade.text = "Lv." + grade
	}

}
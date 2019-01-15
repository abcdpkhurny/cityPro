class ErrUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public btnRe: eui.Button
	public btnExit: eui.Button

	public isRe: boolean 
	public isExit: boolean 

	protected childrenCreated(): void {
		super.childrenCreated();
		this.btnRe.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.isRe = true
			GameConst.removeChild(this)
		}, this)
		this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.isExit = true
			GameConst.removeChild(this)
		}, this)
	}

	public init() {
		this.isRe = false
		this.isExit = false
	}

}
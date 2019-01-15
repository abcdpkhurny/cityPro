class MainInfo extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public btnClose: eui.Image

	protected childrenCreated(): void {
		super.childrenCreated();
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GameConst.removeChild(this)
		}, this)
	}

}
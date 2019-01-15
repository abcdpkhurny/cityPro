class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        // 当被添加到舞台的时候触发 (被添加到舞台,说明资源组已经加载完成)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this)
    }

    private textField: egret.TextField; // 文本
    private bgImg: egret.Bitmap // 背景图
    private loadImg: egret.Bitmap // loading图标

    private timeText;

    private createView(): void {
        this.width = this.stage.stageWidth
        this.height = this.stage.stageHeight

        // loading图标
        if (!this.loadImg) {
            this.loadImg = new egret.Bitmap()
        }
        this.loadImg.texture = RES.getRes('loading_png')
        this.loadImg.anchorOffsetX = this.loadImg.width / 2
        this.loadImg.anchorOffsetY = this.loadImg.height / 2
        this.loadImg.x = this.width / 2
        this.loadImg.y = this.height / 2
        this.addChild(this.loadImg)

        // // 文本加载百分比
        // this.textField = new egret.TextField();
        // this.addChild(this.textField);
        // this.textField.width = 480;
        // this.textField.height = 20;
        // this.textField.x = this.width / 2 - this.textField.width / 2;
        // this.textField.y = this.height / 2 - this.textField.height / 2;
        // this.textField.size = 14
        // this.textField.textAlign = "center";

        //这里动态加载文字
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 480;
        this.textField.height = 40;
        this.textField.x = this.width / 2 - this.textField.width / 2;
        this.textField.y = this.loadImg.y + 100
        this.textField.size = 30
        this.textField.textAlign = "center";
        this.textField.text = '正努力加载中'

        var t = 1
        this.timeText = window.setInterval(() => {
            var tt = '正努力加载中'
            for (var i = 0; i < t; i++) {
                tt = tt + "."
            }
            t++
            if (t > 3) t = 1
            this.textField.text = tt
        }, 600)
        
        // 监听帧事件,每帧都让loading图片转动
        this.addEventListener(egret.Event.ENTER_FRAME, this.updata, this)
        //从舞台删除时执行
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clearTime, this)
    }

    private clearTime() {
        window.clearInterval(this.timeText)
        GameConst.removeChild(this.textField)
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clearTime, this)
    }

    private updata() {
        // 旋转
        this.loadImg.rotation += 5
    }
    // 这个函数在加载中会自动调用
    public onProgress(current: number, total: number): void {
        let per = Math.floor((current / total) * 100)
        this.textField.text = `${per}%`;
    }
}
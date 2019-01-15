
class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
        //this.runGame()
    }

    private loading: LoadingUI
    private loadingMask: egret.Shape

    private async runGame() {
        await this.loadResource()
        const result = await RES.getResAsync("description_json")
        //platform.shop();
        if (!this.loadingMask) {
            this.loadingMask = GameConst.createLoadingMask()
        }
        if (!this.loading) {
            this.loading = new LoadingUI()
        }
        this.addChild(this.loadingMask)
        this.addChild(this.loading)
        GameConst.player = await platform.login();
        //await platform.getUserInfo();
        this.createGameScene();
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            //const loadingView = new LoadingUI();
            const loadingView = new LoadingBar('icon_loading_bg_png','icon_loading_bar_png') 
            // 加载loading组
            await RES.loadGroup("loading");
            this.stage.addChild(loadingView);

            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        GameConst.removeChild(this.loading)
        GameConst.removeChild(this.loadingMask)
        // 把this设置为场景管理器的根舞台
        SceneManager.instance.setStage(this)
        // 调用SceneManager的静态方法
        //SceneManager.toMainScene()
        if (GameConst.player) SceneManager.toMainScene()
        else SceneManager.toLoginScene();
    }

}

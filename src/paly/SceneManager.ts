/**
 * 场景管理类
 */
class SceneManager {
    private _stage: egret.DisplayObjectContainer // 设置所有场景所在的舞台(根)
    private mainScene: MainScene //主场景
    private gameScene: GameScene //游戏场景
    public checkUI: CheckUI //切片
    //public ranking: Ranking //排行榜
    // 在构造函数中创建好场景，保存到属性
    constructor() {
        //加载资源 排行榜
        const platform: any = window.platform;
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });
        this.mainScene = new MainScene();
        this.gameScene = new GameScene();
        this.checkUI = new CheckUI();
    }

    /**
     * 获取实例
     */
    static sceneManager: SceneManager

    static get instance() {
        if (!this.sceneManager) {
            this.sceneManager = new SceneManager()
        }
        return this.sceneManager
    }

    /**
     * 设置根场景
     */
    public setStage(s: egret.DisplayObjectContainer) {
        this._stage = s
    }

    /**
     * 登陆场景
     */
    static toLoginScene() {
        let stage: egret.DisplayObjectContainer = this.instance._stage
        GameConst.StageH = this.instance._stage.height;
        GameConst.StageW = this.instance._stage.width;
        let loginScene = new LoginScene();
        if (!loginScene.parent) {
            // 未被添加到场景
            // 把主场景添加到之前设置好的根舞台中
            stage.addChild(loginScene)
        }
    }

    /**
     * 主场景
     */
    static toMainScene() {
        let stage: egret.DisplayObjectContainer = this.instance._stage // (根) 舞台
        GameConst.StageH = this.instance._stage.height;
        GameConst.StageW = this.instance._stage.width;
        // if (!SceneManager.instance.ranking) {
        //     SceneManager.instance.ranking = new Ranking()
        // }
        let mainScene = SceneManager.instance.mainScene // 主场景
        // 判断主场景是否有父级(如果有,说明已经被添加到了场景中)
        if (!mainScene.parent) {
            // 未被添加到场景
            // 把主场景添加到之前设置好的根舞台中
            stage.addChild(mainScene)
        }
    }

    static toGameScene() {
        this.instance.mainScene.parent.addChild(this.instance.gameScene);
        if (!this.instance.gameScene.onceOpen) this.instance.gameScene.toPlay();

    }
}
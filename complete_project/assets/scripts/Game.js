cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        stonePrefab: {
            default: null,
            type: cc.Prefab,
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        timeDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        goal: 5,
    },

    onLoad: function () {
        // 初始化计分
        this.time = 0;
        this.backPilot = 0;
        this.leftPilot = 10;
        this.totalPilot = 10;
        this.nStone = 20;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
        this.spawnNewStone();
    },
    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                this.spawnNewStar();
                // this.playJumpSound();
                break;
        }
    },
    onDestroy () {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    spawnNewStone: function() { 
        //stonePool = new cc.NodePool();    
        for (var i = 0; i < this.nStone; i++) {
            var newStone = cc.instantiate(this.stonePrefab);
            newStone.setPosition(this.getStonePosition());           
            newStone.getComponent("Stone").game = this;
            newStone.index = i + 1;
            this.node.addChild(newStone);
            //stonePool.put(newStone);
        }
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
        this.leftPilot --;
    },
    getStonePosition() {
        return cc.v2(this.player.x , this.player.y);
    },
    getNewStarPosition () {
        // 返回星星坐标
        return cc.v2(this.player.x, this.player.y + this.player.height/2);
    },

    update: function (dt) {
        this.time += dt;
        //console.log(this.time.toFixed(1));
        this.node.getChildByName("time").getComponent(cc.Label).string = 'Time: ' + this.time.toFixed(1) + 's';
        if (this.leftPilot <= 0) {
            this.gameOver();
        }
    },

    gainScore: function () {
        this.backPilot++;
        console.log(this.backPilot);
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Pilot: ' + this.backPilot + '/' + this.goal;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function () {
        for (let i=0; i < this.node.childrenCount; i++){
            if(this.node.children[i]['_name'] != 'stone'){
                continue;
            }
            this.node.children[i].stopAllActions();                
        }
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    }
});

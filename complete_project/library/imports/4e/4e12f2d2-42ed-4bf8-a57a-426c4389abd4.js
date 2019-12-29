"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

'use strict';

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
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        btnNode: {
            default: null,
            type: cc.Node
        },
        finalTimeNode: {
            default: null,
            type: cc.Node
        },
        instructionNode: {
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
        cryAudio: {
            default: null,
            type: cc.AudioClip
        },
        boomAudio: {
            default: null,
            type: cc.AudioClip
        },
        goal: 5
    },

    onLoad: function onLoad() {
        // 初始化计分
        this.time = 0;
        this.backPilot = 0;
        this.leftPilot = 10;
        this.nStone = 20;
        this.enabled = false;
    },

    resetValue: function resetValue() {
        this.time = 0;
        this.backPilot = 0;
        this.leftPilot = 10;
    },

    onStartGame: function onStartGame() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.resetValue();
        this.scoreDisplay.string = 'Pilot: ' + this.backPilot + '/' + this.goal;
        this.enabled = true;
        this.finalTimeNode.active = false;
        this.instructionNode.active = false;
        this.btnNode.x = 3000;
        this.spawnNewStone();
    },

    onKeyUp: function onKeyUp(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.spawnNewStar();
                // this.playJumpSound();
                break;
        }
    },
    onDestroy: function onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    spawnNewStone: function spawnNewStone() {
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

    spawnNewStar: function spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        cc.audioEngine.playEffect(this.cryAudio, false);
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
        this.leftPilot--;
    },
    getStonePosition: function getStonePosition() {
        return cc.v2(this.player.x, this.player.y);
    },
    getNewStarPosition: function getNewStarPosition() {
        // 返回星星坐标
        return cc.v2(this.player.x, this.player.y + this.player.height / 2);
    },


    update: function update(dt) {
        this.time += dt;
        //console.log(this.time.toFixed(1));
        this.node.getChildByName("time").getComponent(cc.Label).string = 'Time: ' + this.time.toFixed(1) + 's';
        if (this.backPilot == this.goal || this.leftPilot == 0) {
            this.gameOver();
        }
    },

    gainScore: function gainScore() {
        this.backPilot++;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Pilot: ' + this.backPilot + '/' + this.goal;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        for (var i = 0; i < this.node.childrenCount; i++) {
            if (this.node.children[i]['_name'] == 'stone' || this.node.children[i]['_name'] == 'star') {
                this.node.children[i].destroy();
            }
        }

        this.btnNode.x = 0;
        this.enabled = false;
        //cc.director.loadScene('game');
        this.finalTimeNode.active = true;
        this.instructionNode.active = true;
        if (this.leftPilot == 0) {
            this.finalTimeNode.getComponent(cc.Label).string = "Mission failed.";
        }
        if (this.backPilot == this.goal) {
            this.finalTimeNode.getComponent(cc.Label).string = "Time used: " + this.time.toFixed(1) + "s";
        }
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});

cc._RF.pop();
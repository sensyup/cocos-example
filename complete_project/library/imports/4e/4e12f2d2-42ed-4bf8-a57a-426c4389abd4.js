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
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        // 初始化计分
        this.score = 0;
        this.bulletNum = 10;
        this.successNum = 0;
        this.goal = 5;
        this.nStone = 3;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
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
        for (var i = 0; i < this.nStone; i++) {
            var newStone = cc.instantiate(this.stonePrefab);
            newStone.setPosition(this.getStonePosition());
            newStone.getComponent("Stone").game = this;
            newStone.index = i + 1;
            this.node.addChild(newStone);
        }
    },
    spawnNewStar: function spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
    },
    getStonePosition: function getStonePosition() {
        return cc.v2(this.player.x, this.player.y);
    },
    getNewStarPosition: function getNewStarPosition() {
        // 返回星星坐标
        return cc.v2(this.player.x, this.player.y + this.player.height / 2);
    },


    update: function update(dt) {
        if (this.bulletNum <= 0 && this.successNum < this.goal) {
            this.gameOver();
        }
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        // if (this.timer > this.starDuration) {
        //     this.gameOver();
        //     this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
        //     return;
        // }
        // this.timer += dt;
    },

    gainScore: function gainScore() {
        this.score += 1;
        this.bulletNum -= 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    }
});

cc._RF.pop();
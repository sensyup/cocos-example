"use strict";
cc._RF.push(module, '4644f0m2WtABYRy+pn6dOaG', 'Star');
// scripts/Star.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 30,
        speed: 80
    },

    getWallDistance: function getWallDistance() {
        // 根据 player 节点位置判断距离
        // console.log(this.game.node);

        return dist;
    },

    onPicked: function onPicked() {
        // // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        // this.game.spawnNewStar();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
        this.stone.destroy();
    },

    update: function update(dt) {
        //let dist = this.getWallDistance();        
        for (var i = 0; i < this.game.node.childrenCount; i++) {
            if (this.game.node.children[i]['_name'] != 'stone') {
                continue;
            }
            this.stone = this.game.node.children[i];
            var stonePos = this.stone.getPosition();
            console.log(stonePos);
            // console.log(this.node.position);
            // 根据两点位置计算两点之间距离
            var dist = this.node.position.sub(stonePos).mag();
            // 每帧判断和主角之间的距离是否小于收集距离
            if (dist < this.pickRadius) {
                console.log('-------------');
                // 调用收集行为
                this.onPicked();
                return;
            }
            this.node.y += this.speed * dt;
            if (this.node.y > this.game.node.height / 2) {
                this.node.destroy();
            }
        }
    }
});

cc._RF.pop();
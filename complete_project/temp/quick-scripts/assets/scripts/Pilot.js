(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Pilot.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4644f0m2WtABYRy+pn6dOaG', 'Pilot', __filename);
// scripts/Pilot.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 宇航员和石头之间的距离小于这个数值时，就会碰撞
        pickRadius: 30,
        speed: 60
    },

    onPicked: function onPicked() {
        cc.audioEngine.playEffect(this.game.boomAudio, false);
        this.node.destroy();
        this.stone.destroy();
    },
    onLoad: function onLoad() {
        this.node.runAction(cc.repeatForever(cc.rotateBy(0.1, 180))); // 旋转当前节点（旋转指定角度用rotateBy）
        this.speed = 30;
    },
    update: function update(dt) {
        for (var i = 0; i < this.game.node.childrenCount; i++) {
            if (this.game.node.children[i]['_name'] != 'stone') {
                continue;
            }
            this.stone = this.game.node.children[i];
            var stonePos = this.stone.getPosition();
            // 根据两点位置计算两点之间距离
            var dist = this.node.position.sub(stonePos).mag();
            // 每帧判断和宇航员之间的距离是否小于收集距离
            if (dist < this.pickRadius) {
                // 调用收集行为
                this.onPicked();
                return;
            }
            this.node.y += this.speed * dt;
            if (this.node.y >= this.game.node.height / 2 - 30) {
                this.speed = 10;
            }
            if (this.node.y >= this.game.node.height / 2) {
                this.game.gainScore();
                this.node.destroy();
                return;
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Pilot.js.map
        
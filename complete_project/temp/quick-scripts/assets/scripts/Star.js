(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4644f0m2WtABYRy+pn6dOaG', 'Star', __filename);
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
        var playerPos = this.game.stone.getPosition();
        // console.log(playerPos)
        // console.log(this.node.position);
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function onPicked() {
        // // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        // this.game.spawnNewStar();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
        this.game.stone.destroy();
    },

    update: function update(dt) {
        var dist = this.getWallDistance();
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
        //# sourceMappingURL=Star.js.map
        
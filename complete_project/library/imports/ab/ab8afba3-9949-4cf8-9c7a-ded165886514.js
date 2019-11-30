"use strict";
cc._RF.push(module, 'ab8afujmUlM+Jx63tFliGUU', 'Stone');
// scripts/Stone.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 40,
        angle: 0
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // var repeat = cc.repeatForever(cc.rotateBy(1.0, this.speed));
        // this.node.runAction(repeat);
        this.angle = this.angle + Math.random() * Math.PI;
        this.radius = 100 + Math.random() * 200;
    },
    start: function start() {},
    update: function update(dt) {
        this.angle = this.angle + dt;
        this.node.x = this.game.player.x + Math.cos(this.angle) * this.radius;
        this.node.y = this.game.player.y + Math.sin(this.angle) * this.radius;
    }
});

cc._RF.pop();
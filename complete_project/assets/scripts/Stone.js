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
        angle: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.angle = this.angle + Math.random() * 2 * Math.PI;
        this.radius = 100 + Math.random() * 200;
        let size = 100 * Math.random() + 60;
        this.node.width = size;
        this.node.height = size;
    },

    start () {

    },

    update (dt) {      
        this.angle = this.angle + dt;
        this.node.x=this.game.player.x+Math.cos(this.angle)*this.radius;
        this.node.y=this.game.player.y+Math.sin(this.angle)*this.radius;
    },
});

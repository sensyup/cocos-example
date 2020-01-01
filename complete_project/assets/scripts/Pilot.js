cc.Class({
    extends: cc.Component,
    
    properties: {
        // 宇航员和石头之间的距离小于这个数值时，就会碰撞
        pickRadius: 30,
        speed: 60,
    },

    onPicked() {
        cc.audioEngine.playEffect(this.game.boomAudio, false);
        this.node.destroy();
        this.stone.destroy();
    },

    onLoad() {
        this.node.runAction(cc.repeatForever(cc.rotateBy(0.1,180))); // 旋转当前节点（旋转指定角度用rotateBy）
        this.speed = 30;
    },

    update(dt) {       
        for (let i=0; i < this.game.node.childrenCount; i++){
            if(this.game.node.children[i]['_name'] != 'stone'){
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
            if (this.node.y >= this.game.node.height / 2 - 30){
                this.speed = 10;
            } 
            if (this.node.y >= this.game.node.height / 2) {
                this.game.gainScore();
                this.node.destroy();
                return;
            }
        }
    }, 
});

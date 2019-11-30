cc.Class({
    extends: cc.Component,
    
    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 30,
        speed: 60,
    },

    onPicked: function() {
        this.node.destroy();
        this.stone.destroy();
    },
    // onLoad: function () {
    //     // 初始化旋转动作  fixme 
    //   this.node.runAction(cc.repeatForever(cc.rotateBy(1,20)));//旋转当前节点（旋转指定角度用rotateBy）
    // },

    update: function (dt) {       
        for (let i=0; i < this.game.node.childrenCount; i++){
            if(this.game.node.children[i]['_name'] != 'stone'){
                continue;
            }
            this.stone = this.game.node.children[i];
            var stonePos = this.stone.getPosition();
            // 根据两点位置计算两点之间距离
            var dist = this.node.position.sub(stonePos).mag();
        // 每帧判断和主角之间的距离是否小于收集距离
            if (dist < this.pickRadius) {
                // 调用收集行为
                this.onPicked();
                return;
            }
            console.log('1111')
            this.node.y += this.speed * dt;
            if (this.node.y >= this.game.node.height / 2 - 30){
                this.speed = 10;
            } 
            if (this.node.y >= this.game.node.height / 2) {
                console.log('---');
                this.game.gainScore();
                this.node.destroy();
                return;
            }
        }
    },
});

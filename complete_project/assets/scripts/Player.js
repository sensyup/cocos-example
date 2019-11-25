cc.Class({
    extends: cc.Component,
    
    properties: {
        // 跳跃音效资源
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
    },


    playJumpSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    

    onLoad: function() {
         
    },

  
});



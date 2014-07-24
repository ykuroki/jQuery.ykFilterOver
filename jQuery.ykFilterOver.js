
var particle = $('.particleArea');
var timerId=0;

$(document).ready(function() {

    // Init
    $.Util.setCenter();
    $.Util.setDayLayout();

    $('.shops .selectable').on({
        'mouseenter':function(){
            var target = $(this);
            timerId = setTimeout(function() {
                $.Anim.shop.showPickup(target);
            }, 500);
        },

        'mouseleave':function(){
            var target = $(this);
            clearTimeout(timerId);
            $.Anim.shop.hidePickup(target);
        }
    });

    //画像ロード
    $.Util.preloadImg(function(){

        $.Util.setAbsoluteImages();
        $.Anim.baloon.start();
        //$.Anim.particle.start();

        $.Anim.chara.start();
        //$.Anim.shop.select();
    });
});


$(window).resize(function(){
    $.Util.setCenter();
});

$.Util = {
    /*
     * メインコンテンツをセンタリングする
     */
    setCenter : function(){
        var wH = $(window).height();
        $('#animArea').css('height',wH+'px');

        if (wH > 600) {
            var baseH = ((wH - $('#mainStage').height()) / 2) + $('#mainStage').height();
            $('#stage').css('height',baseH);
        }
    },
    /*
     * 昼夜のレイアウトをここでセット
     */
    setDayLayout : function(){

        if (IS_NIGHT) {
            $('.street .night').removeClass('hide');
            $('.sky .night').removeClass('hide');
            $.Anim.firework.start();
        }else{
            $('.street .day').removeClass('hide');
            $('.sky .day').removeClass('hide');
        }

    },
    /*
     * 画像をプリロードする
     */
    preloadImg : function( callback ) {
        var preload = new createjs.LoadQueue( false );
        var manifest = [];

        $('#wrapper').find('div[data-image]').each(function(){
            manifest.push({'src' : $(this).data('image'), 'id' :"image0"});
        });

        preload.addEventListener("progress", handleProgress);
        preload.addEventListener("complete", handleFileComplete);
        preload.addEventListener("fileload", handleFileLoad);
        preload.loadManifest(manifest, true, "./img/");

        //すべて読み込み完了後に呼ばれる
        function handleFileComplete(event) {

            if (callback) {
                return callback();
            };
        }

        //ファイル読み込みごとに呼ばれる
        function handleFileLoad(event) {
            //console.log(event.result); 
        }

        //ローディング中
        function handleProgress(event) {
            //進捗%
            //console.log(event.loaded);
        }
    },
    /*
     * ページ読み込み時に
     */
    setAbsoluteImages: function () {
        $('#wrapper').find('div[data-image]').each(function(){
            $(this).css('background', 'url(' + $(this).data('image') + ') no-repeat left top');

            if (!$(this).data('sprite')){
              $(this).css('background-size', $(this).data('width') + ' ' + $(this).data('height'));
            }else {

              $(this).css('background-size', $(this).data('ssw') + ' ' + $(this).data('ssh'));
            }
        });

        $('#wrapper').find('div[data-width],div[data-height]').each(function(){
            var width  = $(this).data('width'),
                height = $(this).data('height');
            if (typeof width != 'undefined' && width != "") {
                $(this).css('width', width);
            }
            if (typeof height != 'undefined' && height != "") {
                $(this).css('height', height);
            }
        });
        $('#wrapper').find('div[data-top],div[data-left],div[data-bottom],div[data-right]').each(function(){
        var top    = $(this).data('top'),
            left   = $(this).data('left'),
            bottom = $(this).data('bottom'),
            right  = $(this).data('right');

            $(this).css('position', 'absolute');
            if (typeof top != 'undefined' && top != "") {
                $(this).css('top', top);
            }
            if (typeof left != 'undefined' && left != "") {
                $(this).css('left', left);
            }
            if (typeof bottom != 'undefined' && bottom != "") {
                $(this).css('bottom', bottom);
            }
            if (typeof right != 'undefined' && right != "") {
                $(this).css('right', right);
            }
        });

    }
}

$.Anim = {
    /*
     * 風船が上がってゆくアニメーション
     */
    baloon : {
        start : function (){
            var baloon = $('.baloonArea');

            baloon.find('div').each(function(i){
                var target = $(this);
                $.Anim.baloon.drop(target, i);
            });
        },
        drop : function ( target, index){
            target
                .enqt({translate:{ x:'0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 0, function(){
                    var _move     = 200 - Math.ceil(Math.random()*400);   //移動距離
                    var _rotate   = 30  - Math.ceil(Math.random()*60);    //傾き
                    var _initX    = 300 - Math.ceil(Math.random()*600);   //初期位置
                    var _sec      = 3500 + Math.ceil(Math.random()*3000); //アニメーション時間

                    target.stop()
                        .enqt({translate:{ x:_initX + 'px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 0)
                        .enqt({translate:{ x: _move + 'px', y:'-400px' }, rotate:(_rotate+ 'deg'), opacity:1 }, _sec)
                        .enqt({translate:{ x: '0px' , y:'0px' }, rotate:('0deg'), opacity:1}, 0, function(){
                            $.Anim.baloon.drop( target, 0);
                        });
                });

        }
    },
    /*
     * 紙吹雪がまうアニメーション
     */
     particle : {
        start : function(){

            var particleArea = $('.particleArea');

            particleArea.find('div').each(function(i){
                var target = $(this);
                $.Anim.particle.drop(target, i);
            });

        },
        drop : function ( target, index){
            target
                .enqt({translate:{ x:'0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 0, function(){

                var _move     = 500 - Math.ceil(Math.random()*1000);   //移動距離
                var _rotate   = 1000 - Math.ceil(Math.random()*2000); //傾き
                var _initX    = 300 - Math.ceil(Math.random()*600);   //初期位置
                var _sec      = 3000 + Math.ceil(Math.random()*5000); //アニメーション時間

                target.stop()
                    .enqt({translate:{ x:_initX + 'px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 0)
                    .enqt({translate:{ x: _move + 'px', y:'1100px' }, rotate:(_rotate+ 'deg'), opacity:1 }, _sec)
                    .enqt({translate:{ x: '0px' , y:'0px' }, rotate:('0deg'), opacity:1}, 0, function(){
                        $.Anim.particle.drop( target, 0);
                    });
            });

        }
     },
     /*
      * 花火
      */
     firework : {
        start : function(){
            $.Anim.firework.open();
        },
        open : function(){
            var target = $('.fireworks').find('div');
            target.each(function(i){
                var sec     = 500 + Math.ceil(Math.random()*500);
                $(this).delay(i*sec)
                    .enqt({translate:{ x:'0px' , y:'0px' },scale:{ x:0.2, y:0.2 }, opacity:0.5 }, 0)
                    .enqt({translate:{ x:'0px' , y:'0px' },scale:{ x:1, y:1 }, opacity:1 }, 500, 'linear')
                    .enqt({translate:{ x:'0px' , y:'0px' },scale:{ x:1.2, y:1.2 }, opacity:0 }, 1000, 'linear')
                    .enqt({translate:{ x:'0px' , y:'0px' },scale:{ x:0, y:0 }, opacity:0 }, 1000, function(){
                        $.Anim.firework.open();
                    });
            });
        }
     },
    /*
     * キャラに関するアニメーション
     */
     chara : {

        i : 0,

        start : function(){
            $('.mainstreet').find('.chara').each(function(i){
                var target = $(this);
                $.Anim.chara.walk(target, i);
            });
            $.Anim.chara.enter();
        },

        walk : function(target, index){
            target
                .enqt({translate:{ x:'0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 0, function(){

                var _move     = 100 - Math.ceil(Math.random()*200);   //移動距離
                var _sec      = 1000 + Math.ceil(Math.random()*3000); //アニメーション時間
                var _initX    = 300 - Math.ceil(Math.random()*600);   //初期位置

                target
                    .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1 }, 0)
                    .enqt({translate:{ x: _move + 'px', y:'0px' }, opacity:1 }, _sec, 'linear')
                    .enqt({translate:{ x: _move + 'px', y:'0px' }, opacity:1 }, _sec, 'linear')
                    .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1}, _sec, function(){
                        $.Anim.chara.walk(target, 0);
                    });
            });
        },

        enter : function (){
            var target = $('.line').find('.chara');
            target.each(function(i){

                var sec     = 500 + Math.ceil(Math.random()*500);
                $(this).delay(1000 * i)
                    .enqt({translate:{ x:'0px' , y:'0px' }, opacity:1 }, 0)
                    .enqt({translate:{ x:'-60px' , y:'0px' }, opacity:1 }, sec)
                    .enqt({translate:{ x:'-60px' , y:'0px' }, opacity:1 }, sec)
                    .enqt({translate:{ x:'-120px' , y:'0px' }, opacity:1 }, sec)
                    .enqt({translate:{ x:'-120px' , y:'0px' }, opacity:1 }, sec)
                    .enqt({translate:{ x:'-180px' , y:'0px' }, opacity:1 }, sec)
                    .enqt({translate:{ x:'-180px' , y:'0px' }, opacity:0 }, sec)
                    .enqt({translate:{ x:'0px' , y:'0px' }, opacity:0 }, 1000, function(){
                        $.Anim.chara.enter();
                    });
            });
        },

        jump : function( target ){
            target.stop()
                .enqt({translate:{ x: '0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 0)
                .enqt({translate:{ x: '0px' , y:'-35px' }, rotate:('0deg'), opacity:1 }, 200)
                .enqt({translate:{ x: '0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 150)
                .enqt({translate:{ x: '0px' , y:'-20px' }, rotate:('0deg'), opacity:1 }, 150)
                .enqt({translate:{ x: '0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 100)
                .enqt({translate:{ x: '0px' , y:'-10px' }, rotate:('0deg'), opacity:1 }, 50)
                .enqt({translate:{ x: '0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 50, function(){
                    target.enqt({translate:{ x: '0px' , y:'0px' }, rotate:('0deg'), opacity:1 }, 0);
                })
        }

     },
    /*
     * ショップに関するアニメーション
     */
     shop : {

        i : 0,

        select : function(){
            //初期値にリセット
            if ($('.shops div.selectable').length <= $.Anim.shop.i) {
                $.Anim.shop.i = 0;
            };
            var target = $('.shops').find('.selectable').eq($.Anim.shop.i);
            $.Anim.shop.loopPickup( target );
        },

        loopPickup : function( target ){
            target.css('z-index','1');
            target.stop()
                .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1 }, 0)
                .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1 }, 400, function(){

                    //注釈出現
                    target.find('.comment').removeClass('hide')
                        .enqt({ opacity:0 }, 0)
                        .enqt({ opacity:1 }, 300);
                })
                .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1 }, 2000, function(){
                    target.stop()
                        .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1 }, 500, function(){
                            target.css('z-index','0');
                            target.find('.comment')
                                .enqt({ opacity:0 }, 300, function(){
                                    target.find('.comment').addClass('hide');
                                })

                            $.Anim.shop.select(++$.Anim.shop.i);
                        });
                })
        },

        stop : function(){
            //まわりのアニメーションを止める
            $('.shops .selectable').stop(true,true);            
        },

        showPickup : function( target ){
            $.Anim.shop.stop();

            target.css('z-index','1');
            target.stop()
                .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1 }, 0, function(){

                    //キャラがはねる
                    $.Anim.chara.jump(target.find('.chara'));

                    //注釈出現
                    target.find('.comment').removeClass('hide')
                        .enqt({ opacity:0 }, 0)
                        .enqt({ opacity:1 }, 300);
                });
        },

        hidePickup : function( target ){
            target.stop()
                .enqt({translate:{ x: '0px' , y:'0px' }, opacity:1 }, 500, function(){
                    target.css('z-index','0');
                    target.find('.comment')
                        .enqt({ opacity:0 }, 300, function(){
                            target.find('.comment').addClass('hide');
                        })
                });
        }

     }
}

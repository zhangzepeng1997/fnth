var main = document.querySelector('#main');
var lis = main.querySelector('#list').getElementsByTagName('li');
var desW = 640;
var desH = 960;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
main.style.transform="scale("+winH/desH+")";
for(var i = 0; i<lis.length;i++){
    lis[i].index = i;
    lis[i].addEventListener("touchstart",start,false);
    lis[i].addEventListener('touchmove',move,false);
    lis[i].addEventListener('touchend',end,false);
}
function start(e){
    var startTouch = e.changedTouches[0];
    this.startPosX = startTouch.pageX;
    this.startPosY = startTouch.pageY;
    this.previndex=0;
    this.sIndex = 0;
}

function move(e){
    e.preventDefault();
    var moveTouch = e.changedTouches[0];
    this.moveTouchY = moveTouch.pageY;
    var changePos = this.moveTouchY-this.startPosY;
    var cur = this.index;
    var step =1/3;
    var number = 0;
    for(var i = 0; i<lis.length;i++){
        lis[i].className = "";
        if(i!=cur){
            lis[i].style.display="none";
        }
    }
    if(changePos>0){
        var movePos = -winH + changePos + "px";
        if(cur == 0){cur =lis.length};
        number = this.previndex = cur-1;
    }else if(changePos<0){
        var movePos = winH + changePos + "px" ;
        if(cur ==lis.length-1){
            number = this.sIndex = 0;
        }else{
            number = this.sIndex = cur+1;
        }
    }
    lis[number].className = 'zIndex';
    lis[number].style.display='block';
    lis[number].style.webkitTransform='translate(0,'+movePos+')';
    var scalePos =1-Math.abs(changePos)/winH*step;
    this.style.webkitTransform = "translate(0,"+changePos*step+"px) scale("+scalePos+")";
}
function end(e){
    var touches = event.changedTouches[0];
    this.endTouchY = touches.pageY;
    var changePos = this.endTouchY-this.startPosY;
    var step = 1/3 ;
    var cur = this.index;
    var num = 0;
    if(changePos>0){
        if(cur == 0){cur =lis.length};
        this.style.webkitTransform = 'translate(0,'+(-winH * step)+'px scale(' + (1 - step) + ')';
        num = this.previndex = cur-1;
    }else if(changePos<0){
        if(cur ==lis.length-1){
            num = this.sIndex = 0
        }else{
            num = this.sIndex = cur+1;
        }
        this.style.webkitTransform =' translate(0,'+(winH * step) + 'px scale(' + (1 - step) + ')';
    }
    lis[num].style.webkitTransform = 'translate(0,0)';
    lis[num].style.webkitTransition = 'all .3s linear';
    this.otherNum = num;
    lis[num].addEventListener('transitionend',transitionEnd,false);
    this.firstElementChild.id = "";
}
function transitionEnd (e){
    if(e.target.tagName == 'LI'){
        this.style.webkitTransition = "";
        e.target.firstElementChild.id ="a"+(e.target.index+1);
    }
}
document.addEventListener("touchmove",function(e){

})
/**
 * Created by Administrator on 2016/3/18.
 */

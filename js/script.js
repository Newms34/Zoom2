var stopped = false;
var hyper = false; //in hyperspace?
var speed = 50; //percent throttle
var notBooming = true; //not currently exploding. Generally good thing.
document.onmousemove = function(e) {
    e.x = e.x || e.clientX;
    e.y = e.y || e.clientY;
    if (!stopped) {
        $('#container').css('transform', 'rotateX(' + e.y + 'deg) rotateZ(' + e.x + 'deg) rotateY(' + (-e.x) + 'deg)')
    }
}

document.onkeyup = function(e) {
    if (e.which == 72 && !hyper) {
        //entering hyperspace
        console.log('hyper!')
        distChange(30, true);
    } else if (e.which == 72 && hyper) {
        //exiting hyperspace
        console.log('regular!')
        distChange(30, false);
    } 
}
var distChange = function(amt, dir) {
    amt = parseFloat(amt) - 0.5;
    var distAmt;
    if (dir) {
        //blur increase
        distAmt = ((30 - amt) / 10) + 1;
    } else {
        distAmt = (amt / 10) + 1;
    }
    var xSecAmt = (4 - distAmt) / 4;
    console.log(distAmt)
    $('#hype').css('transform', 'scaleY(' + distAmt + ') scaleX(' + xSecAmt + ') scaleZ(' + xSecAmt + ')');
    if (amt > 0) {
        var t = setTimeout(function() {
            distChange(amt, dir);
        }, 75)
    } else {
        hyper ? hyper = false : hyper = true;
        console.log('set hyper to ', hyper)
    }
}

document.onmousewheel = function(e) {
    if (e.wheelDelta > 0 && speed <= 95) {
        //accel
        speed += 5;
    } else if (e.wheelDelta < 0 && speed >= 5) {
        //decel
        speed -= 5;
    }
    var fans = document.getElementsByClassName('engCapF');
    var spd = (-199 * speed / 10000) + 2;
    for (var q = 0; q < fans.length; q++) {
        fans[q].style.webkitAnimation = 'fanSpin ' + spd + 's linear infinite';
        fans[q].style.animation = 'fanSpin ' + spd + 's linear infinite';
    }
    var engGlos = document.getElementsByClassName('engCapB');
    var gloAmt = (19 * speed / 100) + 1;
    var col = 'hsl(220,100%,' + ((.6 * speed) + 20) + '%)';
    for (var m = 0; m < engGlos.length; m++) {
        engGlos[m].style.boxShadow = '0 0 ' + gloAmt + 'px ' + (gloAmt / 4) + 'px ' + col;
        engGlos[m].style.backgroundColor = col;
    }
}
$(document).ready(function() {
    var allMetal = document.getElementsByClassName('metal');
    for (var i = 0; i < allMetal.length; i++) {
        var hueAmt = Math.floor(Math.random() * 10) + 95;
        allMetal[i].style.filter = 'brightness(' + hueAmt + '%)';
        allMetal[i].style.webkitFilter = 'brightness(' + hueAmt + '%)';
    }
    var engBits = document.getElementsByClassName('engPiece');
    for (var i = 0; i < engBits.length; i++) {
        var rotAmt = i * 15;
        engBits[i].style.transform = 'rotateY(' + rotAmt + 'deg) translateZ(35px)';
    }
})

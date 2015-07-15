var notBooming = true; //not currently exploding. Generally good thing.
var firing = false;
var posX, posY;
document.onmousemove = function(e) {
    posX = (e.x || e.clientX) + $(document).scrollLeft();
    posY = (e.y || e.clientY) + $(document).scrollTop();
    if (!firing) {
        $('#lazCont').css({
            'left': (posX - 54) + 'px',
            'top': posY + 'px'
        })
        $('#reticle').css({
            'left': (posX - 50) + 'px',
            'top': (posY - 50) + 'px'
        })

    }

}
var updSite = function() {
    var theSite = $('#website').val();
    if (theSite.indexOf('http://') != 0 && theSite.indexOf('https://') != 0) {
        theSite = 'http://' + theSite;
    }
    console.log(theSite)
    $('#targ').attr('src', theSite)
}
document.onkeyup = function(e) {
    if (e.which == 66) {
        boom(100);
    } else if (e.which == 70) {
        lazFire(100);
    }
}
var origStats = []
var avgLeft;
var avgTop;
var currScrollTop = 0;
var currScrollLeft = 0;
var snd = document.getElementById('lazSound');
var lazFire = function(amt) {
    firing = true
    var tempAmt = amt;
    $('#lazCont').css('display', 'block')
    //sound
    snd.currentTime = 1.7;
    console.log(snd.currentTime)
    snd.play();
    var t = setInterval(function() {
        //interator scales lazIn from 0-25
        //and lazOut from 0-55
        var lazInScale = ((100 - tempAmt) / 100) * 25;
        var lazOutScale = ((100 - tempAmt) / 100) * 55;
        var lazOutLeft = 55 - lazOutScale;
        var lazGloOp = ((100 - tempAmt) / 100) * .4;
        var pageDark = (50*(tempAmt/100))+50;
        $('#lazIn').css({
            'border-left': lazInScale + 'px solid transparent',
            'border-right': lazInScale + 'px solid transparent'
        })
        $('#lazOut').css({
            'left': lazOutLeft + 'px',
            'border-left': lazOutScale + 'px solid transparent',
            'border-right': lazOutScale + 'px solid transparent'
        })
        $('#lazGlo').css('opacity', lazGloOp); //gloooop
        $('iframe').css({
            '-webkit-filter': 'brightness('+pageDark+'%)',
            'filter': 'brightness('+pageDark+'%)'
        })
        tempAmt--;
        console.log(tempAmt)
        if (!tempAmt) {
            clearInterval(t);
            $('#lazCont').css('display', 'none');
            $('#lazIn').css({
                'border-left': '0px solid transparent',
                'border-right': '0px solid transparent'
            })
            $('#lazOut').css({
                'border-left': '0px solid topransparent',
                'border-right': '0px solid transparent'
            })
            $('#lazGlo').css('opacity', '0')
            firing = false;
            console.log('boom amt ', amt)
            snd.currentTime = 4.2;
            boom(amt);
        }
    }, 20)
}
var boom = function(amt) {
    var n = 10; //number of booms
    if (notBooming) {
        origStats = []; //wipe origStats array
        var allLeft = [];
        var allTop = [];
        currScrollTop = $(document).scrollTop();
        currScrollLeft = $(document).scrollLeft();
        console.log(currScrollTop)
        while (n) {
            var boomBit = document.createElement('div');
            boomBit.id = 'splode' + n;
            boomBit.className = 'boomClass';
            var boomLeft = (Math.floor(Math.random() * 30) - 15) + posX;
            var boomTop = (Math.floor(Math.random() * 30) - 15) + posY;
            boomBit.style.left = boomLeft + 'px';
            boomBit.style.top = boomTop + 'px';
            allLeft.push(boomLeft);
            allTop.push(boomTop);
            //colors!
            var hue = Math.floor(Math.random() * 25) + 40;
            var sat = Math.floor(Math.random() * 20) + 80;
            var val = Math.floor(Math.random() * 30) + 70;
            origStats.push({
                h: hue,
                s: sat,
                v: val
            })
            boomBit.style.backgroundColor = 'hsla(' + hue + ',' + sat + '%,' + val + '%,.99)';
            var boomSize = Math.floor(Math.random() * 82) + 82;
            boomBit.style.height = boomSize + 'px';
            boomBit.style.width = boomSize + 'px';
            $('#boomCont').append(boomBit);
            n--;
        }
        //now create Shockwaves
        for (var s = 0; s < 2; s++) {
            var swDiv = document.createElement('div');
            swDiv.className = 'shockWave';
            avgLeft = allLeft.reduce(function(pv, nx) {
                return pv + nx;
            }) / allLeft.length;
            avgTop = allTop.reduce(function(pv, nx) {
                return pv + nx;
            }) / allTop.length;
            swDiv.style.left = avgLeft + 'px';
            swDiv.style.top = avgTop + 'px';
            //rotate if 2nd
            if (s) {
                swDiv.style.transform = 'rotate(' + (30 + Math.floor(Math.random() * 130)) + 'deg)'
            }
            $('#boomCont').append(swDiv);
            console.log('sw counter', s)
        }

        notBooming = false;
        boom(amt);
    } else {
        //stuff we need to change: hsla bg color+opacity	
        //width
        //height
        //same (sorta) for shockwaves
        //also, animate screen 'shake'
        var shakeMag = (10 * amt / 100);
        var shakeAmtT = Math.floor(Math.random() * shakeMag);
        var shakeAmtL = Math.floor(Math.random() * shakeMag);
        window.scrollTo(shakeAmtL, shakeAmtT)
        amt = parseInt(amt);
        for (var i = 0; i < n; i++) {
            var newHue = (amt / 100) * origStats[i].h;
            var newSat = (amt / 100) * origStats[i].s;
            var newVal = (amt / 100) * origStats[i].v;
            var newHSL = 'hsla(' + newHue + ',' + newSat + '%,' + newVal + '%,' + (amt / 120) + ')';
            $('#splode' + (i + 1)).css('background-color', newHSL);
            //color done. Now size. done via scale(n,n), where n is from 1-3
            var scale = 1 + ((100 - amt) / amt) * 2;
            if (amt > 5) {
                $('#splode' + (i + 1)).css('transform', 'scale3d(' + scale + ',' + scale + ',1)')
            }
        }
        //sw!
        var swScale = 10 + ((100 - amt) / amt) * 50;

        var swHSL = 'hsla(60,20%,' + (amt * 90 / 100) + '%,' + (amt / 100) + ')';
        //blur width: 50 - 70 and 10-20

        $('.shockWave').css({
            'box-shadow': '0 0 ' + (50 + (20 * (100 - amt) / amt)) + 'px ' + swHSL + ' inset, 0 0 ' + (10 + (10 * (100 - amt) / amt)) + 'px ' + swHSL,
            'width': swScale + '%',
            'height': swScale * .6 + '%',
            'left': avgLeft - (swScale * 8) + 'px',
            'top': avgTop - (swScale / 4) + 'px'
        })
        amt--;
        if (amt) {
            var t = setTimeout(function() {
                boom(amt);
            }, 20);
        } else {
            notBooming = true;
            $('#boomCont').empty();
            $('iframe').css({
                '-webkit-filter': 'brightness(100%)',
                'filter': 'brightness(100%)'
            })
        }
    }
}

var stopped = false;
document.onmousemove = function(e) {
    e.x = e.x || e.clientX;
    e.y = e.y || e.clientY;
    if (!stopped) {
        $('#container').css('transform', 'rotateX(' + e.y + 'deg) rotateY(' + e.x + 'deg)')
    }
}

document.onkeyup = function(e) {
    if (e.which == 32) {
        e.preventDefault();
        stopped ? stopped = false : stopped = true;
    }
}
$(document).ready(function(){
	var allMetal = document.getElementsByClassName('metal');
	for (var i=0;i<allMetal.length;i++){
		var hueAmt = Math.floor(Math.random()*10)+95;
		allMetal[i].style.filter = 'brightness('+hueAmt+'%)';
		allMetal[i].style.webkitFilter = 'brightness('+hueAmt+'%)';
	}
	var engBits = document.getElementsByClassName('engPiece');
	for (var i=0;i<engBits.length;i++){
		var rotAmt = i*15;
		engBits[i].style.transform = 'rotateY('+rotAmt+'deg) translateZ(35px)';
	}
})
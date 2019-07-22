// jshint ignore: start

let mems = document.getElementsByClassName('overlay');

function remove_member(e){
	let ele = e.target;
	let par = ele.closest('.individual');
	par.parentNode.removeChild(par);
}

Array.from(mems).forEach(function(elm){
	elm.addEventListener('click',function(e){remove_member(e);},false);
});

mem = document.getElementsByClassName('members')[0];

function add_member(e){
	e.preventDefault();
	name = document.getElementById('name').value;
	org = document.getElementById('org').value;
	pos = document.getElementById('position').value;
	ind = document.createElement('div');
	ind.setAttribute('class','individual');
	ind.innerHTML = "<figure><div class='grid-item'><img src=" + profile_img + " class='img-fluid'> <img src=" + cross_img + " class='img-fluid overlay'></div> <figcaption style='text-align: center; color: white; font-size:95%;' class='img-fluid'> <div> NAME : " + name + "</div> <div> ORGANISATION : " + org + "</div> <div> POSITION : " + pos + "</div> </figcaption> </figure></div>";
	mem.appendChild(ind);
	ind.firstChild.firstChild.addEventListener('click',function(e){remove_member(e);},false);
}

sub = document.querySelector('input[type=submit]');
sub.addEventListener('click',function(e){add_member(e);},false);

/* jshint ignore:start */

let elms = document.getElementsByClassName('form-control')
function remove_text(e){
	let tar = e.target;
	if(tar.id == 'password' || tar.id=='confirm_password') tar.type = 'password';
	tar.value = '';
}

function on_tab(e)
{
	if(e.keyCode == 9)
	{
		let tar = e.target;
		console.log(tar.parentNode.nextElementSibling.childNodes[3])
		if(tar.id == 'email' || tar.id == 'password') tar.parentNode.nextElementSibling.childNodes[3].type = 'password';
	}
}
Array.from(elms).forEach(function(elm){
	elm.addEventListener('click' , function(e){ remove_text(e);} , {once : true});
})
Array.from(elms).forEach(function(elm){
	elm.addEventListener('keydown' , function(e){ on_tab(e);} , 'false');
})

function prefill(text){
	let ele = 0;
	if(document.getElementById(text)) ele = document.getElementById(text);
	ele.type='text';
	ele.value = text;
}

function start()
{
	window.onload = prefill('username');
	window.onload = prefill('email');
	window.onload = prefill('password');
	window.onload = prefill('confirm_password');
}

window.onload = start();
/* jshint ignore:start */

let elms = document.getElementsByClassName('delete-target')
console.log(elms);

function remove_element(e){
	let tar = e.target;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {	    
	    	console.log(this.status);
			let parent = tar.closest('.individual');
			let parent2 = parent.parentNode;
			parent2.removeChild(parent);   
	}
	xhr.open("GET" , '/post/'+ tar.id +'/delete' , true)
	xhr.send(null)
}

Array.from(elms).forEach(function(elm){elm.addEventListener('click' , function(e){
	remove_element(e);
} , false)})

mem = document.getElementsByClassName('members')[0];

function add_member(e){
	e.preventDefault();
	name = document.getElementById('name').value;
	org = document.getElementById('org').value;
	pos = document.getElementById('position').value;
	if(name && org && pos){
		let xhr = new XMLHttpRequest();
		let params = "name="+name+"&org="+org+"&pos="+pos;
		xhr.open('POST' , '/add_member' , true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.onload = function(){
			console.log(xhr.status)
			let data = JSON.parse(xhr.responseText)
			let post_id = data[0]['post_id']
			ind = document.createElement('div');
			ind.setAttribute('class','individual');
			ind.innerHTML = "<figure><div class='grid-item'><img src=" + profile_img + " class='img-fluid'> <img src=" + cross_img + " class='img-fluid overlay' id=" + post_id + "></div> <figcaption style='text-align: center; color: white; font-size:95%;' class='img-fluid'> <div> NAME : " + name + "</div> <div> ORGANISATION : " + org + "</div> <div> POSITION : " + pos + "</div> </figcaption> </figure></div>";
			mem.appendChild(ind);
			console.log(ind.firstChild.firstChild.firstChild.nextElementSibling)
			ind.firstChild.firstChild.firstChild.nextElementSibling.addEventListener('click' , function(e){remove_element(e);} , false)
		}
		xhr.send(params)
	}	
	
}

sub = document.querySelector('input[type=submit]');
sub.addEventListener('click',function(e){add_member(e);},false);

/* jshint ignore:start */

mem = document.getElementsByClassName('members')[0];

for(i=0;i<6;i++)
{
	ind = document.createElement('div');
	ind.setAttribute('class','individual');

	ind.innerHTML = "<figure><div class='grid-item'><img src=" + profile_img + " class='img-fluid'> <img src="+ cross_img + " class='img-fluid overlay'></div> <figcaption style='text-align: center; color: white; font-size:95%;' class='img-fluid'> <div> NAME : </div> <div> ORGANISATION : </div> <div> POSITION : </div> </figcaption> </figure></div>";
	mem.appendChild(ind);
} 
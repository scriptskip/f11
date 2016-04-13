var f11 = window.document.createElement ('input');
	f11.className = 'f11';
	f11.style.fontSize = 0.02 * window.innerHeight + 'px';
	f11.style.zIndex = findHighestZIndex ('div') + 1;
	f11.type = 'text';

	f11.onkeypress = function ()
	{
		if (event.keyCode == 13)
		{
			if (validURL (f11.value))
			{
				window.document.location = 'http://' + f11.value;
			} else
			{
				window.document.location = 'https://www.google.ru/search?q=' + f11.value;
			};
		};
	};

window.document.body.appendChild (f11);

var h = window.innerHeight * 0.9;
var show = true;
window.onmousemove = function ()
{
	var y = event.clientY;
	if (!show)
	{
		if (y > h)
		{
			show = true;
			f11.style.display = 'block';
		};
	} else
	{
		if (y < h)
		{
			show = false;
			f11.style.display = 'none';
		};
	};
};

window.onresize = function ()
{
	h = window.innerHeight * 0.9;
	show = true;
	f11.style.fontSize = 0.02 * window.innerHeight + 'px';
};

function findHighestZIndex(elem)
{
  var elems = document.getElementsByTagName(elem);
  var highest = 0;
  for (var i = 0; i < elems.length; i++)
  {
    var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
    if ((zindex > highest) && (zindex != 'auto'))
    {
      highest = zindex;
    }
  }
  return highest;
};

 function validURL (url)
 {
  var template = /^(?:(?:https?|http|ftp):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
  var regex = new RegExp (template);
  return (regex.test(url) ? 1 : 0);
 };
var f11 = window.document.createElement ('input');
	f11.className = 'f11';
	f11.style.fontSize = 0.02 * window.innerHeight + 'px';
	f11.style.zIndex = findHighestZIndex ('div') + 1;
	f11.type = 'text';

	f11.onkeypress = function ()
	{
		if (event.keyCode == 13)
		{
			var value = f11.value;
			var first = value.substring (0, 1);
			switch (first)
			{
				case ' ':
					value = value.substring (1, value.length);
					switch (value)
					{
						case 'day':
							var f11_dark = window.document.getElementById ('f11_dark');
							if (f11_dark)
							{
								f11_dark.parentNode.removeChild (f11_dark);
							};
							window.localStorage.f11_dark = false;
						break;

						case 'night':
							var f11_dark = window.document.getElementById ('f11_dark');
							if (f11_dark == undefined)
							{
								dark ();
							};
							window.localStorage.f11_dark = true;
						break;
						case 'dark':
							var f11_dark = window.document.getElementById ('f11_dark');
							if (f11_dark == undefined)
							{
								dark ();
							};
							window.localStorage.f11_dark = true;
						break;

						default:
							if (validURL (value))
							{
								window.open('http://' + value);
							} else
							{
								if (typeof (parseInt(value)) == 'number')
								{
									window.localStorage.f11_reload = value;
									reload ();
								};

								if (value.length < 1)
								{
									window.document.location.reload ();
								};
							};
						break;
					};
				break;

				case '!':
					value = value.substring (1, value.length);
					if (validURL (value))
					{
						window.document.location = 'https://translate.google.com/translate?hl=en&sl=ru&tl=en&u=' + encodeURIComponent (value) + '&anno=2';
					} else
					{
						if (encodeURI (value).indexOf ('%') != -1)
						{
							window.document.location = 'https://translate.google.com/#auto/en/' + value;
						} else
						{
							window.document.location = 'https://translate.google.com/#auto/ru/' + value;
						};
					};
				break;

				case '#':
					if (value.length == 1) { window.close (); };
					value = value.substring (1, value.length);
					if (validURL (value))
					{
						var frame = window.document.createElement ('iframe');
							frame.className = 'f11_frame';
							frame.setAttribute('src', 'http://' + value + '/');
							frame.style.height = '100%';
							frame.style.width = '50%';
							frame.style.zIndex = findHighestZIndex ('div');
						window.document.body.appendChild (frame);
						window.document.body.className = 'f11_frame_body';
					};
				break;

				case '/':
					window.document.location = value;
				break;

				default:
					if (validURL (value))
					{
						window.document.location = 'http://' + value;
					} else
					{
						window.document.location = 'https://www.google.ru/search?q=' + value;
					};
				break;
			};
			f11.value = "";
		};
	};

if (window.localStorage.f11_dark == 'true') { dark (); };
window.document.body.appendChild (f11);
reload ();

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

 function dark ()
 {
	var dark = window.document.createElement ('div');
		dark.className = 'f11_dark';
		dark.id = 'f11_dark';
		dark.style.zIndex = findHighestZIndex ('div') + 1;
	window.document.body.appendChild (dark);
 };

 function reload ()
 {
 	if (window.localStorage.f11_reload > 0)
 	{
 		var timeout = window.localStorage.f11_reload * 1000;
 		window.setTimeout
 		(
 			function ()
 			{
 				window.document.location.reload ();
 			},
 			timeout
 		);
 	};
 };
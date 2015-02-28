

var _keysarr = [];



var $_duration = document.getElementById('duration');

$_duration.addEventListener('click', function() {
	_keysarr = [];
	var str = $_duration.value || 1;
	for (var i = 1; i <= parseInt(str); i++) {
		_keysarr.push(i);
	}
	
	renderForm();

}, false );


var renderForm = function () {
	var list = document.getElementById("list");
	
	list.innerHTML = '';
	
	for (var i = 1; i <= _keysarr.length; i++) {
		//_keysarr.push(i);
		
		//console.log(i);

		
		var node = document.createElement("textarea");
		node.id = 'key_'+_keysarr[i-1];
		
		if (i == 1) {
			node.value = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 15.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 	 width="500px" height="500px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve"> <rect id="rect" x="49.75" y="66.944" fill="#E2E57B" width="111.806" height="74.306"/> <circle id="kreis" fill="#B83E8F" cx="106" cy="285" r="38.194"/> <polygon id="dreickeck" fill="#71BA69" points="313.639,198.194 278.223,351.667 426.139,364.167 "/> <rect id="blue" x="27.806" y="48.86" fill="#5260A9" width="80" height="36.167"/> </svg> ';
		}
		
		if (i == 5) {
			node.value = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 15.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 	 width="500px" height="500px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve"> <rect id="rect" x="49.75" y="66.944" fill="#E2E57B" width="111.806" height="74.306"/> <circle id="kreis" fill="#B83E8F" cx="182.389" cy="349.583" r="38.194"/> <polygon id="dreickeck" fill="#71BA69" points="234.472,237.778 278.223,351.667 426.139,364.167 "/> <rect id="blue" x="334.5" y="15.5" fill="#5260A9" width="80" height="36.167"/> </svg> ';
		}
		
		if (i == 10) {
			node.value = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 15.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 	 width="500px" height="500px" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve"> <rect id="rect" x="324.055" y="51.667" fill="#E2E57B" width="111.809" height="74.306"/> <circle id="kreis" fill="#B83E8F" cx="168.5" cy="280.139" r="122.222"/> <polygon id="dreickeck" fill="#71BA69" points="234.472,237.778 391.417,368.333 419.889,250 "/> <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="46.278" y1="62.5" x2="215.5" y2="88.82"/> <rect id="blue" x="334.5" y="15.5" fill="#5260A9" width="80" height="36.167"/> </svg> ';
		}
		list.appendChild(node);
	}
};


$_duration.click();

var $_submit = document.getElementById('submit');

$_submit.addEventListener('click', function() {
    
    var arr = getKeys();
    
    console.log('# arr',arr);
    
	var ani = makeAnimation(arr);
	
	console.log('# ani',ani);
	
	var flat = flatAnimation(ani);
	
	console.log('# flat',flat);
	
	var svg = addToSvg(flat);
	
	console.log('# svg',svg);
	
	show( svg );
	
	// TRY
	//show( addToSvg( flatAnimation( makeAnimation( getKeys() ) ) ) );
	
	
}, false);

var show = function (svg) {
	
	document.getElementById('preview').innerHTML = svg;
	document.getElementById('code').value = svg;
};

var addToSvg = function (flat) {
	
	var key = document.getElementById('key_'+_keysarr[0]).value;
	
	return key.replace('</svg>', flat+'</svg>');
	
};

var flatAnimation = function (data) {
	if (!data) {
		return false;
	}
	
	

	
	var str = '';
	
	for(var i=0; i<data.length; i++) {
	
		for(var j=0; j<data[i].ani.length; j++) {

			str += '<animate \n';
			str += 'xlink:href="#'+data[i].id+'"\n'
			str += 'attributeName="'+data[i].ani[j].attr+'"\n'
			
			//console.log(data[i].ani[j].keys);
			
			var first = 0;
			
			for (first in data[i].ani[j].keys) break;
			
			//console.log(first);
			str += 'from="'+data[i].ani[j].keys[first]+'"\n'
			
			var last = Object.keys(data[i].ani[j].keys)[Object.keys(data[i].ani[j].keys).length-1];
			str += 'to="'+data[i].ani[j].keys[last]+'"\n'
			
			var times = [];
			var values = [];
			for(key in data[i].ani[j].keys) {
				//alert(key);
				
				//console.log('--#-- ',key, 0.1*key);
				if (  key != 1) {
					
					times.push(0.1*key);
				} else {
					times.push(0);
				}
				
			
				values.push( data[i].ani[j].keys[key] );
			}
			
		

			if (times[0] != 0) {
				times.unshift(0);
				values.unshift(values[0]);
			}


			var dur = $_duration.value;
			
			//console.log(times, times[times.length-1]);
			if (times[times.length-1] != 1) {
				
				//dur = dur * times[times.length-1];
				//times[times.length-1] = 1;
				//alert(dur);
				
				times.push(1);
				values.push(values[values.length-1]);
				
			}

			
			str += 'values="'+values.join(';')+'"\n'
			str += 'keyTimes="'+times.join(';')+'"\n'
			
			str += 'dur="'+dur+'s"\n'
			
			
			str += 'fill="freeze"\n'
			str += 'd="circ-anim"\n'
		
			str += '/>\n\n';
		}
	}
	
	
	
	
	return str;
	/*

	<animate 
    xlink:href="#l_x5F_1"
    attributeName="points"
    
    from="94.107,537.563 116.253,499.206 133.107,528.854"
    to="104,519.121 116.253,399.206 141.514,519.12" 
    
    values="
    94.107,537.563 116.253,499.206 133.107,528.854; 
    104,519.121 116.253,429.206 141.514,519.12; 
    104,519.121 116.253,399.206 141.514,519.12"
    
    keyTimes="0; 0.5; 1"
    
    
    dur="10s"
    fill="freeze" 
    d="circ-anim" />
    
   
*/ 
    
    
	
	
	
	
	
};


var makeAnimation = function (arr) {
	if (!arr) {
		return false;
	}
	
	//console.log(arr);
	
	var ani = [];

	for(i in arr) {

		
			

		var thiskey = _keysarr.indexOf(i);

		//var n = _keysarr[thiskey+1];
		var n = 0;
		
		var next = false;
		for(j in arr) {
			
			if (next) {
				next = false;
				n = j;
			}
			if (j == i) {
				next = true;
			}
		}
		//console.log(i,n);
		
		
		for(obj in arr[i]) {	
			if (arr[n] && arr[n][obj]) {

			
				
				var diff = _.isEqual(arr[i][obj], arr[n][obj]);
				
				//console.log(diff);
				if (!diff) {
					
					var find = _.find(ani,function (q) {
						
						if (q.id == obj) {
							//console.log('----',q, q.id, obj);
							return true;
						}
					});
					
					//console.log(find);
				
					var ret = {'id':obj,'ani':[]};
					
					for(para in arr[i][obj]) {
						
						//console.log(arr[i][obj][para]);
						
						if (arr[i][obj][para] != arr[n][obj][para]) {
							
							if (arr[i][obj][para]  && arr[n][obj][para]) {
								
								
								var o = {};
								o[i] = arr[i][obj][para];
								o[n] = arr[n][obj][para];
								
								
								if (!find) {
									//console.log('----- no 2');		
									ret.ani.push( 
										{
											'attr':para,
											'keys':o
										}
									);
								} else {
									//console.log('----- yes');
									
									var find_ani = _.find(find.ani,function (p) {
										
										if (p.attr == para) {
											//console.log('----',q, q.id, obj);
											return true;
										}
									});
									
									
									if (!find_ani) {
										find.ani.push(
											{
												'attr':para,
												'keys':o
											}
										);
										
									} else {
										
										find_ani.keys[n] = arr[n][obj][para];
										
									}
								}
							}
						}
					}
					
					if (!find && ret.ani.length > 0) {
						//console.log('----- no 3');
						ani.push(ret);
					}
				}
			}
		}
	}
	
	
	return ani;
	

	
};




var getKeys = function () {
	
	
    var obj = {};
    for(var i=0; i<_keysarr.length; i++) {
		
		//console.log('key_'+_keysarr[i]);
		var node = document.getElementById('key_'+_keysarr[i]);
		var key = node.value;
		
		if (key) {
			//console.log( arr[i], parseKey(key) );
			//obj.push( { arr: parseKey(key) } );
			
			obj[_keysarr[i]] = parseKey(key)
		}
		
	}
    
    
    //console.log(obj);
    
    return obj;
    
};



var parseKey = function (data) {
	
	
	var parser = new DOMParser();
	var doc = parser.parseFromString(data, "image/svg+xml");
    
    //console.log(doc);
    
	var elements = doc.querySelectorAll('[id]');
	
	//console.log(elements);
	
	var obj = {};
	for(var i=0; i<elements.length; i++) {
		// alert(elements[i].innerHTML );
		
		var $_elm = doc.getElementById(elements[i]);
		
		obj[elements[i].id] = {};
		
		for(var a=0; a<elements[i].attributes.length; a++) {

			//console.log(elements[i].attributes[a].nodeName,elements[i].attributes[a].value);
			
			obj[elements[i].id][elements[i].attributes[a].nodeName] = elements[i].attributes[a].value;
		}
	}

	//console.log(obj);
	
	return obj;
	
};




"use strict";

(function () {
  let api;
  
  let request = new XMLHttpRequest();
  request.open('GET', 'https://unsplash.it/list');
  request.onreadystatechange = function(e) {
	if (this.readyState == 4) {
	  if (this.status == 200) {
		api = JSON.parse(this.responseText);
		// --- start
		
		
		let field;
		let img;
		let imgArr = [];
		let authorArr = [];
		let heightArr = [];
		let widthArr = [];
		let idArr = [];
		
		function clearField() {
		  let children = field.childNodes;
		  for(let i = 0; i < children.length; i++){
			children[i].remove();
		  }
		}
		
		function randomShow() {
		  for(let key in api) {
			imgArr.push(api[key].filename);
			authorArr.push(api[key].author);
			heightArr.push(api[key].height);
			widthArr.push(api[key].width);
			idArr.push(api[key].id);
		  }
		  
		  for(let i = 0; i < imgArr.length; i++) {
			if( i >= 12) {
			  break;
			} else {
			  field = document.querySelector('.field');
			  img = document.createElement('IMG');
			  img.src = 'https://unsplash.it/' + imgArr[i];
			  field.appendChild(img);
			}
		  }
		}
		randomShow();
		
		function createLarge() {
		  clearField();
		  for(let key in api) {
			imgArr.push(api[key].filename);
			authorArr.push(api[key].author);
			heightArr.push(api[key].height);
			widthArr.push(api[key].width);
			idArr.push(api[key].id);
		  }
		  
		  for(let i = 0; i < imgArr.length; i++) {
			let width = widthArr[i];
			parseInt(width);
			if(width >= 2500) {
			  if(i >= 12){
				break;
			  } else {
				field = document.querySelector('.field');
				img = document.createElement('IMG');
				img.src = 'https://unsplash.it/' + imgArr[i];
				field.appendChild(img);
			  }
			}
		  }
		}
		//createLarge();
		
		function createMedium() {
		  clearField();
		  for(let key in api) {
			imgArr.push(api[key].filename);
			authorArr.push(api[key].author);
			heightArr.push(api[key].height);
			widthArr.push(api[key].width);
			idArr.push(api[key].id);
		  }
		  
		  for(let i = 0; i < imgArr.length; i++) {
			let width = widthArr[i];
			parseInt(width);
			if(width < 2500 && width > 1920) {
			  if(i >= 12){
				break
			  } else {
				field = document.querySelector('.field');
				img = document.createElement('IMG');
				img.src = 'https://unsplash.it/' + imgArr[i];
				field.appendChild(img);
			  }
			}
		  }
		}
		//createMedium();
		
		function createSmall() {
		  clearField();
		  for(let key in api) {
			imgArr.push(api[key].filename);
			authorArr.push(api[key].author);
			heightArr.push(api[key].height);
			widthArr.push(api[key].width);
			idArr.push(api[key].id);
		  }
		  
		  for(let i = 0; i < imgArr.length; i++) {
			let width = widthArr[i];
			parseInt(width);
			if(width < 1920) {
			  if(i > 12){
				break
			  } else {
				field = document.querySelector('.field');
				img = document.createElement('IMG');
				img.src = 'https://unsplash.it/' + imgArr[i];
				field.appendChild(img);
			  }
			}
		  }
		}
		//createSmall();
		
		let btn = document.getElementsByTagName('P');
		let Large;
		let Medium;
		let Small;
		for(let i = 0; i < btn.length; i++) {
		  //console.log(btn);
		  if(btn[i].innerHTML === 'Large') {
			Large = btn[i];
		  } else if(btn[i].innerHTML === 'Medium') {
			Medium = btn[i]
		  } else if(btn[i].innerHTML === 'Small') {
			Small = btn[i]
		  } else {
			break
		  }
		  
		}
		
		Large.addEventListener('click', createLarge);
		Medium.addEventListener('click', createMedium);
		Small.addEventListener('click', createSmall);
		
		
		
		// --- end
	  } else {
		console.log(e);
	  }
	}
  };
  request.send(null);
})();


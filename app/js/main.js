"use strict";

fetch('https://unsplash.it/list')
  .then(
	function(response) {
	  if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' +
		  response.status);
		return;
	  } else {
		
		// start
		
		let api = response.json();
		let mainField;
		let field;
		let img;
		let aside = document.querySelector('.aside');
		
		let btn = document.getElementsByTagName('P');
		let Large;
		let Medium;
		let Small;
		let leftArrow = document.querySelector('.left');
		let rightArrow = document.querySelector('.right');
		let num = document.querySelector('.num');
		
		
		for (let i = 0; i < btn.length; i++) {
		  //console.log(btn);
		  if (btn[i].innerHTML === 'Large') {
			Large = btn[i];
		  } else if (btn[i].innerHTML === 'Medium') {
			Medium = btn[i];
		  } else if (btn[i].innerHTML === 'Small') {
			Small = btn[i];
		  } else {
			break
		  }
		  
		}
		
		
		
		// test start
		
		api.then(function (data) {
		  
		  function random() {
			let imageArr = [];
			
			for (let l = 0; l < data.length; l++) {
			  imageArr.push(data[l]);
			}
			
			let j = 0;
			let count = 0 ;
			
			for (let i = 0; i < imageArr.length; i++) {
			  mainField = document.querySelector('.mainField');
			  field = document.createElement('DIV');
			  field.className = "field";
			  
			  for(j; j < imageArr.length; j++) {
				let cut = imageArr[j].filename;
				cut = cut.split('.');
				cut = cut[0].substring(5);
				mainField.appendChild(field);
				img = document.createElement('IMG');
				img.src = 'https://source.unsplash.com/' + cut;
				field = document.querySelector('.field');
				img.setAttribute('class', 'img');
				field.appendChild(img);
				if(count <= 12){
				  count++;
				  j = j++;
				}
				else {
				  console.log(count);
				  count = 0;
				  break
				}
				console.log(j + ' j');
			  }
			  if(j === data.length) break;
			  console.log('i ' + i);
			}
			
		  }
		  
		  random();
		  
		  let getField = document.querySelector('.field');
		  
		  function showFull(event) {
			event.stopPropagation();
			event.preventDefault();
			let elem = event.target;
			if(elem !== elem.parentNode){
			  let getUrl = elem.getAttribute('SRC');
			  let main = document.querySelector('body');
			  let container = document.createElement('DIV');
			  let img = document.createElement('IMG');
			  container.setAttribute('class', 'container');
			  img.src = getUrl;
			  main.appendChild(container);
			  container.appendChild(img);
			  let newStyles = document.createElement('style');
			  document.head.append(newStyles);
			  newStyles.innerHTML = ".container {" +
				"background-color: rgba(0, 0, 0, 1);" +
				"}" +
				".body {" +
				"background-color: rgba(0, 0, 0, 1);" +
				"}";
			  let close = document.createElement('i');
			  close.setAttribute('class', 'i');
			  //close.setAttribute('onClick', 'removeFull()');
			  close.innerHTML = '&#10006';
			  container.insertBefore(close, img);
			  
			  
			} else {
			  return
			}
			
		  }
		  getField.addEventListener('click', showFull, false);
		  //getField.removeEventListener('dbclick', showFull, false);
		  
		  let body = document.querySelector('body');
		  let close = document.querySelector('.container');
		  
		  function removeFull(event) {
			event.preventDefault();
			let elem = event.target;
			alert('er');
			close.removeChild(close);
		  }
		  
		  
		  console.log(close);
		  
		  document.addEventListener('DOMContentLoaded', function () {
			close.addEventListener('click', removeFull, false);
		  });
		  
		  
		});
		/// test end
		
		
		// noinspection JSAnnotator
		function pagination() {
		  let count = 0;
		  let pages = document.querySelectorAll('.field');
		  if(count < pages.length && count > pages.length){
		    return
		  }
		  count++;
		  function toRight(event) {
			let elem = event.target;
			let pages = document.querySelectorAll('.field');
			
			if(event){
			  pages[count].style.visibility = 'visible';
			  pages[count -1].style.visibility = 'hidden';
			  count++;
			}
			
			
		  }
		  rightArrow.addEventListener('click', toRight);
		  
		  function toleft(event) {
			let elem = event.target;
			let pages = document.querySelectorAll('.field');
			
			if(event){
			  pages[count].style.visibility = 'hidden';
			  pages[count -1].style.visibility = 'visible';
			  count--;
			}
		  }
		  leftArrow.addEventListener('click', toleft)
		}
		pagination();
		
		
		
		
		
		
		
		
		
		
		// function clearField() {
		//   if (field.innerHTML != null) {
		// 	return;
		//   } else {
		// 	field.innerHTML = null;
		//   }
		// }
		
		
		// function randomShow() {
		//   api.then(function (data) {
		// 	let array = [];
		// 	let imgArr = [];
		// 	let authorArr = [];
		// 	let heightArr = [];
		// 	let widthArr = [];
		// 	let idArr = [];
		//
		// 	for(let i = 0; i < data.length; i++){
		// 	  widthArr.push(data[i].width);
		// 	  let array = data[i].filename;
		// 	  let end = array.split('.');
		// 	  let start = end[0].substring(5);
		// 	  imgArr.push(start);
		// 	  console.log(imgArr[i] + '  - ' + i);
		// 	}
		//
		//
		// 	//loop start
		// 	let j = 0;
		// 	let count = 0;
		// 	for(let i = 0; i < imgArr.length; i++) {
		// 	  console.log( 'count ' + count );
		//
		// 	  if(count < 12){
		// 		mainField = document.querySelector('.mainField');
		// 		field = document.createElement('DIV');
		// 		field.className = "field";
		// 	  } else {
		// 		count = 0;
		// 		continue;
		// 	  }
		//
		// 	  for(j ; j < imgArr.length; j++) {
		// 		if(count >= 12){
		// 		  break;
		// 		} else {
		// 		  img = document.createElement('IMG');
		// 		  img.src = 'https://source.unsplash.com/' + imgArr[j];
		// 		  mainField.appendChild(field);
		// 		  field = document.querySelector('.field');
		// 		  field.appendChild(img);
		// 		  count++;
		// 		  j = j++;
		// 		}
		// 		console.log('j ' + j);
		// 	  }
		//
		// 	  if(j === imgArr.length) break;
		// 	  console.log(i);
		// 	}
		// 	//loo end
		//   });
		// }
		// randomShow();
		
		// function pagination() {
		//   function toRight() {
		// 	let newStyles = document.createElement('style');
		// 	document.head.append(newStyles);
		// 	newStyles.innerHTML = ".field {" +
		// 	  "margin-left: 100px;" +
		// 	  "}"
		//   }
		//   rightArrow.addEventListener('click', toRight)
		// }
		// pagination();
		
		//
		//
		// 	function sortLarge() {
		// 	  api.then(function (data) {
		//
		//
		// 		//clearField();
		//
		// 		let imgArr = [];
		// 		let authorArr = [];
		// 		let heightArr = [];
		// 		let widthArr = [];
		// 		let idArr = [];
		//
		// 		for (let i in data) {
		//
		// 		  if (data[i].width >= 1500) {
		// 			widthArr.push(data[i].width);
		// 			let array = data[i].filename;
		// 			let start = array.split('.');
		// 			let end = start[0].split('_');
		// 			imgArr.push(end[1]);
		// 			let fileName = imgArr[i];
		// 			console.log(imgArr[i]);
		//
		// 			if (i >= 12) {
		// 			  break;
		// 			} else if (response.status != 200) {
		// 			  return;
		// 			} else {
		// 			  field = document.querySelector('.field');
		// 			  img = document.createElement('IMG');
		// 			  img.src = 'https://source.unsplash.com/' + widthArr[i] + fileName;
		// 			  field.appendChild(img);
		// 			}
		// 		  } else {
		// 			return;
		// 		  }
		// 		}
		//
		// 	  });
		//
		// 	}
		//
		// 	Large.addEventListener('click', sortLarge);
		// 	function sortMedium() {
		// 	  api.then(function (data) {
		//
		// 		//clearField();
		// 		console.log('func');
		// 		let imgArr = [];
		// 		let authorArr = [];
		// 		let heightArr = [];
		// 		let widthArr = [];
		// 		let idArr = [];
		//
		// 		for (let i in data) {
		//
		// 		  if (data[i].width >= 800 || data[i].width <= 1499) {
		// 			console.log('size');
		// 			widthArr.push(data[i].width);
		// 			let array = data[i].filename;
		// 			let start = array.split('.');
		// 			let end = start[0].split('_');
		// 			imgArr.push(end[1]);
		//
		// 			let fileName = imgArr[i];
		//
		// 			if (i >= 12) {
		// 			  break;
		// 			} else if (response.status != 200) {
		// 			  return;
		// 			} else {
		// 			  field = document.querySelector('.field');
		// 			  img = document.createElement('IMG');
		// 			  img.src = 'https://source.unsplash.com/' + widthArr[i] + fileName;
		// 			  field.appendChild(img);
		// 			}
		// 		  } else {
		// 			return;
		// 		  }
		// 		}
		//
		// 	  });
		//
		// 	}
		//
		//
		// 	Medium.addEventListener('click', sortMedium);
		//
		// 	function sortSmall() {
		// 	  api.then(function (data) {
		//
		// 		//clearField();
		// 		console.log('func');
		// 		let imgArr = [];
		// 		let authorArr = [];
		// 		let heightArr = [];
		// 		let widthArr = [];
		// 		let idArr = [];
		//
		// 		for (let i in data) {
		// 		  console.log('loop');
		// 		  console.log(data[i]);
		// 		  if (data[i].width < 799) {
		// 			console.log('size');
		// 			widthArr.push(data[i].width);
		// 			let array = data[i].filename;
		// 			let start = array.split('.');
		// 			let end = start[0].split('_');
		// 			imgArr.push(end[1]);
		// 			let fileName = imgArr[i];
		// 			console.log(imgArr[i]);
		//
		// 			if (i >= 12) {
		// 			  break;
		// 			} else if (response.status != 200) {
		// 			  return;
		// 			} else {
		// 			  field = document.querySelector('.field');
		// 			  img = document.createElement('IMG');
		// 			  img.src = 'https://source.unsplash.com/' + widthArr[i] + fileName;
		// 			  field.appendChild(img);
		// 			}
		// 		  } else {
		//
		// 			return;
		// 		  }
		// 		}
		//
		// 	  });
		// 	}
		//
		// 	Small.addEventListener('click', sortSmall);
	  }
	})
  .catch(function(err) {
	console.log('Erorr', err);
  });
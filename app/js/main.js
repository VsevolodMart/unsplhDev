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
		
		
		
		// function clearField() {
		//   if (field.innerHTML != null) {
		// 	return;
		//   } else {
		// 	field.innerHTML = null;
		//   }
		// }
		function randomShow() {
		  api.then(function (data) {
			let array = [];
			let imgArr = [];
			let authorArr = [];
			let heightArr = [];
			let widthArr = [];
			let idArr = [];
			
			for(let i = 0; i < data.length; i++){
			  widthArr.push(data[i].width);
			  let array = data[i].filename;
			  let end = array.split('.');
			  let start = end[0].substring(5);
			  imgArr.push(start);
			}
			
			let j = 0;
			let count = 0;
			for(let i = 0; i < imgArr.length; i++) {
			  console.log( 'count ' + count );
			  if(count < 12){
				mainField = document.querySelector('.mainField');
				field = document.createElement('DIV');
				field.className = "field";
			  } else {
				count = 0;
				continue;
				//if(i > 2) break
			  }
			  
			  for(j ; j < imgArr.length; j++) {
				if(count >= 12){
				  break;
				} else {
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + imgArr[j];
				  mainField.appendChild(field);
				  field = document.querySelector('.field');
				  field.appendChild(img);
				  
				  count++;
				  j = j++;
				}
				console.log('j ' + j);
			  }
			  if(j === imgArr.length) break;
			  console.log(i);
			  
			}
			
		  });
		}
		randomShow();
	 
		function pagination() {
		  function toRight() {
			let newStyles = document.createElement('style');
			document.head.append(newStyles);
			newStyles.innerHTML = ".field {" +
			  "margin-left: 100px;" +
			  "}"
		  }
		rightArrow.addEventListener('click', toRight)
		}
		pagination();
	 
	 
	 
		function sortLarge() {
		  api.then(function (data) {
			
			
			//clearField();
			
			let imgArr = [];
			let authorArr = [];
			let heightArr = [];
			let widthArr = [];
			let idArr = [];
			
			for (let i in data) {
			  
			  if (data[i].width >= 1500) {
				widthArr.push(data[i].width);
				let array = data[i].filename;
				let start = array.split('.');
				let end = start[0].split('_');
				imgArr.push(end[1]);
				let fileName = imgArr[i];
				console.log(imgArr[i]);
				
				if (i >= 12) {
				  break;
				} else if (response.status != 200) {
				  return;
				} else {
				  field = document.querySelector('.field');
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + widthArr[i] + fileName;
				  field.appendChild(img);
				}
			  } else {
				return;
			  }
			}
			
		  });
		  
		}
		
		Large.addEventListener('click', sortLarge);
		function sortMedium() {
		  api.then(function (data) {
			
			//clearField();
			console.log('func');
			let imgArr = [];
			let authorArr = [];
			let heightArr = [];
			let widthArr = [];
			let idArr = [];
			
			for (let i in data) {
			  
			  if (data[i].width >= 800 || data[i].width <= 1499) {
				console.log('size');
				widthArr.push(data[i].width);
				let array = data[i].filename;
				let start = array.split('.');
				let end = start[0].split('_');
				imgArr.push(end[1]);
				
				let fileName = imgArr[i];
				
				if (i >= 12) {
				  break;
				} else if (response.status != 200) {
				  return;
				} else {
				  field = document.querySelector('.field');
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + widthArr[i] + fileName;
				  field.appendChild(img);
				}
			  } else {
				return;
			  }
			}
			
		  });
		  
		}
		
		
		Medium.addEventListener('click', sortMedium);
		
		function sortSmall() {
		  api.then(function (data) {
			
			//clearField();
			console.log('func');
			let imgArr = [];
			let authorArr = [];
			let heightArr = [];
			let widthArr = [];
			let idArr = [];
			
			for (let i in data) {
			  console.log('loop');
			  console.log(data[i]);
			  if (data[i].width < 799) {
				console.log('size');
				widthArr.push(data[i].width);
				let array = data[i].filename;
				let start = array.split('.');
				let end = start[0].split('_');
				imgArr.push(end[1]);
				let fileName = imgArr[i];
				console.log(imgArr[i]);
				
				if (i >= 12) {
				  break;
				} else if (response.status != 200) {
				  return;
				} else {
				  field = document.querySelector('.field');
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + widthArr[i] + fileName;
				  field.appendChild(img);
				}
			  } else {
				
				return;
			  }
			}
			
		  });
		}
		
		Small.addEventListener('click', sortSmall);
	  }
	})
  .catch(function(err) {
	console.log('Erorr', err);
  });
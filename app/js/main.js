"use strict";

fetch('https://unsplash.it/list')
  .then(
	function(response) {
	  if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' +
		  response.status);
		return;
	  } else {
		
		// Examine the text in the response
		
		// start
		
		let api = response.json();
		let field;
		let img;
		let imgArr = [];
		let authorArr = [];
		let heightArr = [];
		let widthArr = [];
		let idArr = [];
		
		let btn = document.getElementsByTagName('P');
		let Large;
		let Medium;
		let Small;
		
		
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
		
		function clearField() {
		  if (field.innerHTML == " ") {
			return;
		  } else {
			field.innerHTML = "";
		  }
		}
		
		api.then(function (data) {
		  
		  function randomShow() {
			let imgArr = [];
			let authorArr = [];
			let heightArr = [];
			let widthArr = [];
			let idArr = [];
			for (let i in data) {
			  if (data[i].width >= 200) {
				widthArr.push(data[i].width);
				let a = data[i].filename;
				let arr = a.split('.');
				let arr1 = arr[0].split('_');
				imgArr.push(arr1[1]);
				
				console.log(imgArr);
				
				if (i >= 12) {
				  return;
				} else if (response.status != 200) {
				  return;
				} else {
				  field = document.querySelector('.field');
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + data.width + imgArr[i] ;
				  field.appendChild(img);
				}
			  } else {
				return;
			  }
			}
			
		  }
		  randomShow();
		});
		
		//console.log(imgArr);
		
		api.then(function (data) {
		  function createLarge() {
			//clearField();
			// for (let key in data) {
			//   imgArr.push(data[key].filename);
			//   authorArr.push(data[key].author);
			//   heightArr.push(data[key].height);
			//   widthArr.push(data[key].width);
			//   idArr.push(data[key].id);
			// }
			//
			// for (let i = 0; i < imgArr.length; i++) {
			//   let width = widthArr[i];
			//   parseInt(width);
			//   if (width > 1500) {
			// 	if (i >= 12) {
			// 	  break;
			// 	} else if (response.status != 200) {
			// 	  continue;
			// 	} else {
			// 	  field = document.querySelector('.field');
			// 	  img = document.createElement('IMG');
			// 	  img.src = 'https://unsplash.it/' + imgArr[i];
			// 	  field.appendChild(img);
			// 	}
			//   }
			// }
			
			for (let i in data) {
			  
			  if (data[i].width >= 1500) {
				widthArr.push(data.width);
				imgArr.push(data.filename);
				let end = imgArr[i].split('.');
				imgArr.push(end);
				let start = end[0];
				let arr = start.split('_');
				let fileName = arr[1];
				imgArr.push(fileName);
				
				if (i >= 12) {
				  break;
				} else if (response.status != 200) {
				  return;
				} else {
				  field = document.querySelector('.field');
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + fileName + '/' + widthArr[i];
				  field.appendChild(img);
				}
			  } else {
				return;
			  }
			}
		  }
		  
		  Large.addEventListener('click', createLarge);
		});
		
		api.then(function (data) {
		  function createMedium() {
			clearField();
			
			for (let i in data) {
			  if (data[i].width >= 800 && data[i].width <= 1499) {
				widthArr.push(data.width);
				imgArr.push(data.filename);
				let end = imgArr[i].split('.');
				imgArr.push(end);
				let start = end[0];
				let arr = start.split('_');
				let fileName = arr[1];
				imgArr.push(fileName);
				
				if (i >= 12) {
				  return;
				} else if (response.status != 200) {
				  return;
				} else {
				  field = document.querySelector('.field');
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + fileName + '/' + widthArr[i];
				  field.appendChild(img);
				}
			  } else {
				return;
			  }
			}
		  }
		  
		  Medium.addEventListener('click', createMedium);
		});
		
		api.then(function (data) {
		  function createSmall() {
			clearField();
			
			for (let i in data) {
			  if (data[i].width < 800) {
				widthArr.push(data.width);
				imgArr.push(data.filename);
				let end = imgArr[i].split('.');
				imgArr.push(end);
				let start = end[0];
				let arr = start.split('_');
				let fileName = arr[1];
				imgArr.push(fileName);
				
				if (i >= 12) {
				  return;
				} else if (response.status != 200) {
				  return;
				} else if (response.status != 200) {
				  return;
				} else {
				  field = document.querySelector('.field');
				  img = document.createElement('IMG');
				  img.src = 'https://source.unsplash.com/' + fileName + '/' + widthArr[i];
				  field.appendChild(img);
				}
			  } else {
				return;
			  }
			}
		  }
		  
		  Small.addEventListener('click', createSmall);
		});
	  }
	})
  .catch(function(err) {
	console.log('Erorr', err);
  });
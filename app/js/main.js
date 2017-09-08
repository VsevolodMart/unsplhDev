"use strict";

function filter(e) {
  let el = e.target;
  
  let size = el.value;
  
  hide(document.querySelectorAll("[data-size]"));
  if(size == "") {
	show(document.querySelectorAll("[data-size]"));
  } else {
	show(document.querySelectorAll("[data-size=" + size + "]"));
  }
  
  
  let numBlock = document.querySelector(".num");
  numBlock.innerHTML = 1;
  pagination();
}

function authorFilter(e) {
  let el = e.target;
  
  let author = el.getAttribute('data-author-filter');
  console.log(author);
  
  
  hide(document.querySelectorAll("[data-author]"));
  if(author == "") {
	show(document.querySelectorAll("[data-author]"));
	let sizeAll = document.querySelectorAll("[name='size']");
	sizeAll.forEach(function(i){
	  i.removeAttribute('disabled');
	})
  } else {
	let sizeAll = document.querySelectorAll("[name='size']");
	sizeAll.forEach(function(i){
	  i.setAttribute('disabled','disabled')
	});
	show(document.querySelectorAll("[data-author='" + author + "']"));
  }
  
  let numBlock = document.querySelector(".num");
  numBlock.innerHTML = 1;
}

document.addEventListener('DOMContentLoaded', function () {
  let sizeAll = document.querySelectorAll("[name='size']");
  sizeAll.forEach(function(i){
	i.addEventListener('change', filter, false)
  })
  var event = new Event("change");
  if(document.querySelector("[name='size']:checked")){
	document.querySelector("[name='size']:checked").dispatchEvent(event)
  }
}, false);


function pagination(to) {
  let numBlock = document.querySelector(".num");
  let num = numBlock.textContent;
  
  switch(to){
	case "r":
	  num++;
	  break;
	case "l":
	  num--;
	  break;
  }
  
  let end = 20 * num;
  let start = end - 20;
  
  let size = document.querySelector("[name='size']:checked").value;
  
  let nodeList;
  
  if(size == "") {
	nodeList = document.querySelectorAll("[data-size]");
  } else {
	nodeList = document.querySelectorAll("[data-size=" + size + "]");
  }
  
  if(start > nodeList.length || start < 0) return;
  
  for (let a in nodeList) {
	if (nodeList.hasOwnProperty(a)) {
	  if(a >=start && a < end) {
		nodeList[a].style.display = "block";
	  } else {
		nodeList[a].style.display = "none";
	  }
	}
  }
  
  numBlock.innerHTML = num;
}

function show(nodeList) {
  for (let a in nodeList) {
	if (nodeList.hasOwnProperty(a)) {
	  nodeList[a].style.display = "block";
	}
  }
}

function hide(nodeList) {
  for (let a in nodeList) {
	if (nodeList.hasOwnProperty(a)) {
	  nodeList[a].style.display = "none";
	}
  }
}


fetch('https://unsplash.it/list')
  .then(
	function (response) {
	  if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' +
		  response.status);
		return;
	  } else {
		
		// start
		
		let api = response.json();
		let img;
		
		api.then(function (data) {
		  let imageArr = [];
		  
		  function random() {
			//imageArr = data.slice(0, 10);
			imageArr = data;
			let j = 0;
			let len = imageArr.length;
			
			let mainField = document.querySelector('.mainField');
			let field = document.createElement('DIV');
			
			let authorsBlock = document.querySelector('.author');
			let authorsUl = document.createElement('ul');
			
			let authorsLi = document.createElement('li');
			let authorsInput = document.createElement('input');
			authorsInput.setAttribute("name", "author");
			authorsInput.setAttribute("type", "radio");
			authorsInput.setAttribute("data-author-filter", "");
			authorsInput.setAttribute("checked", "checked");
			let authorText = document.createTextNode("all");
			authorsLi.appendChild(authorText);
			authorsLi.appendChild(authorsInput);
			authorsBlock.appendChild(authorsUl);
			authorsUl.appendChild(authorsLi);
			authorsInput.addEventListener('change', authorFilter, false);
			
			field.setAttribute('class', 'field');
			
			for (let i = 0; i < len; i++) {
			  let currentImg = imageArr[i];
			  let width = currentImg.width;
			  let author = currentImg.author;
			  let cut = currentImg.filename;
			  
			  cut = cut.split('.');
			  cut = cut[0].substring(5);
			  
			  img = document.createElement('IMG');
			  img.src = 'https://source.unsplash.com/' + cut;
			  // field = document.querySelector('.field');
			  img.setAttribute('class', 'img');
			  let size = "medium";
			  if (width > 1500) {
				size = "large";
			  } else if (width < 799) {
				size = "small";
			  }
			  img.setAttribute('data-size', size);
			  img.setAttribute('data-author', author);
			  img.addEventListener('click', showFull, false);
			  
			  //authors
			  if(!document.querySelector('[data-author-filter="'+author+'"]')){
				let authorsLi = document.createElement('li');
				let authorsInput = document.createElement('input');
				authorsInput.setAttribute("name", "author");
				authorsInput.setAttribute("type", "radio");
				authorsInput.setAttribute("data-author-filter", author);
				let authorText = document.createTextNode(author);
				
				authorsLi.appendChild(authorText);
				authorsLi.appendChild(authorsInput);
				authorsBlock.appendChild(authorsUl);
				authorsUl.appendChild(authorsLi);
				authorsInput.addEventListener('change', authorFilter, false)
			  }
			  
			  if ( i >= 20 ) {
				img.style.display = "none";
			  }
			  
			  field.appendChild(img);
			  mainField.appendChild(field);
			}
			authorsBlock.appendChild(authorsUl);
		  }
		  
		  random();
		  
		  function showFull(event) {
			event.stopPropagation();
			event.preventDefault();
			let elem = event.target;
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
			
			close.addEventListener('click', function () {
			  let c = document.querySelector('.container');
			  console.log(c);
			  if(c){
				c.parentNode.removeChild(c);
			  }
			}, false);
			close.setAttribute('class', 'i');
			//close.setAttribute('onClick', 'removeFull()');
			close.innerHTML = '&#10006';
			container.insertBefore(close, img);
		  }
		  
		  let body = document.querySelector('body');
		  let close = document.querySelector('.container');
		  
		  function removeFull(event) {
			event.preventDefault();
			let elem = event.target;
			alert('er');
			close.removeChild(close);
		  }
		  
		  document.addEventListener('DOMContentLoaded', function () {
			close.addEventListener('click', removeFull, false);
		  });
		});
	  }
	})
  .catch(function (err) {
	console.log('Erorr', err);
  });

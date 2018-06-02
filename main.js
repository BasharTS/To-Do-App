if (document.getElementById || document.createTextNode) {

/* Event Handlers  */
	// handle submit button
	if (document.getElementById("submitButton")) {
		document.getElementById("submitButton").addEventListener("click", function() {
			var item = document.getElementById('inputText').value;
			if (item) {
				addItemToDom(item);
				location.reload();
			}
		});
	}	
	// handle key press
	if (document.getElementById("inputText")) {
		document.getElementById('inputText').addEventListener("keydown", function (e) {
			var item = this.value;
			var code = (e.keyCode)? e.keyCode : e.which;
			if (code === 13 && item) {
				e.preventDefault();
				// e.stopPropagation();
				addItemToDom(item);
				location.reload();
			}
		});
	}

	// handle remove item
	if (document.getElementById("todoList")) {
		var list = document.getElementById("todoList");
		list.addEventListener("click", removeItem);
	}
	
	// handle remove item
	if (document.getElementById("todoList")) {
		var completeList = document.getElementById("todoList");
		completeList.addEventListener("click", completeItem);
	}

/*End of handlers*/

	// to-do array
	var todo = new Array();
	var completed = new Array();

	// method to add item to dom
	function addItemToDom(item) {
		var listItem = document.createTextNode(item);
		var li = document.createElement("li");
		li.appendChild(listItem);
		// call remove button function
		var rmvBtn = createRemoveButton();
		// call complete button
		var cmplBtn = createCompleteButton();
		// append rmvbtn and cmplBtn to the list
		li.appendChild(rmvBtn);
		li.appendChild(cmplBtn);
		// append li to its parent(ol)
		recieveChild("todoList", li)
		// calling method to save item to localStorage
		saveToLocalStorage(listItem);
	}

	// create remove button
	function createRemoveButton() {
		var removeBtn = document.createElement("button");
		removeBtn.className = "remove";
		removeBtn.id = "remove";
		var x = document.createTextNode("X");
		removeBtn.appendChild(x);
		return removeBtn;
	}

	// create comlete button
	function createCompleteButton() {
		var completeBtn = document.createElement("button");
		completeBtn.className = "compl";
		completeBtn.id = "compl";
		var c = document.createTextNode("C");
		completeBtn.appendChild(c);
		return completeBtn;
	}

	// Recieve child function
	function recieveChild(id,child) {
		document.getElementById(id).appendChild(child);
	}

	// method to save item to localStorage
	function saveToLocalStorage(listItem){
		var itemToPush = listItem.textContent;
		todo.push(itemToPush);
		jsonData = JSON.stringify(todo);
		localStorage.setItem("todoList", jsonData);
	}

	// Update localStorage
	function updateStorage(name, todo){
		localStorage.setItem(name, JSON.stringify(todo));
		// location.reload();
	}

	//function to remove to-do item
	function removeItem(e){
		if(e.target.id == "remove" ){
			// console.log(e.target)
			if (confirm("Remove item! Are you sure?")) {
				list.removeChild(e.target.parentElement);
				var child = e.target.parentElement.firstChild;

				for (var i = 0; i < todo.length; i++) {
					if (todo[i] === child.textContent) {
						var index1 = todo.indexOf(child.textContent);
						var index2 = completed.indexOf(child.textContent);
						todo.splice(index1,1);
						if (index2 != -1){
							completed.splice(index2,1);
						}
						// call to update localStorage
						updateStorage("todoList", todo);
						updateStorage("completed", completed);
						location.reload();
					}
				}
			}
		}
	}

	// function to set item to complete in the to-do list
	function completeItem(e){
		
		if(e.target.id == "compl" ){
			if (confirm("Set item to complete! Are you sure?")) {
				var parent = e.target.parentElement;
				var child = e.target.parentElement.firstChild;
				if (completed.indexOf(child.textContent) === -1){
					completed.push(child.textContent);
				}
				// set item as completed
				updateStorage("completed", completed);
				parent.id = "complete";
			}
		}
	}

	//to make sure items are always in the list
	function retrieveLocal(){
		var storedList = (localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem('todoList')) : "";
		
		if (storedList != null && storedList != "") {
			for (var i = 0; i < storedList.length; i++) {
				addItemToDom(storedList[i]);
			}

			// clear all link
			var clear = document.getElementById("clearBtn");
				clear.type = "button";
				clear.style.display = "block";
				clear.appendChild(document.createTextNode("Clear All"));

		}else{
			var para = document.createElement("p");
			para.className = "centeredText";
			para.appendChild(document.createTextNode("You Have No Item In The List!"))
			document.getElementById("todoList").appendChild(para);
		}
	}

	// update completed task
	function setCompleted(){
		
		var completedList = (localStorage.getItem("completed")) ? JSON.parse(localStorage.getItem('completed')) : "";
		if (completedList != null && completedList != "") {
			var lis = document.getElementsByTagName("li");
			var arr = Array.from(lis);
			// console.log(arr[0].firstChild.textContent);
			for (var i = 0; i < completedList.length; i++) {
				for(var j = 0; j < arr.length; j++){
					if ((completedList[i]) == (arr[j].firstChild.textContent)) {
						if (completed.indexOf(arr[j].firstChild.textContent) === -1) {
							completed.push(arr[j].firstChild.textContent)
						}
						arr[j].id = "complete";
						// console.log(completed[i]);
					}
				}
			}
		}
	}

	// clear to-do list
	if (document.getElementById("clearBtn")) {
		var c = document.getElementById("clearBtn");
		c.addEventListener("click", function (e) {
			if (confirm("Empty your To-Do List! Are you sure?")) {
				localStorage.clear();
				location.reload();
			}
		});
	}
		
}
window.onload = retrieveLocal();
window.onload = setCompleted();











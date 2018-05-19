var form = document.getElementById("addForm");
var list = document.getElementById("todoList");
var submitButton = document.getElementById("submitButton");

//handling event!
form.addEventListener("submit", getInput);
submitButton.addEventListener("click", getInput);
list.addEventListener("click", eraseMe);

//get input function
function getInput(e) {
	e.preventDefault();
	if (document.getElementById) {
		var inputT = document.getElementById("inputText").value;
		if (inputT) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(inputT));

			//handle delete button
			var buttonX = document.createElement("button");
			buttonX.type = "button";
			buttonX.id = "liButton";
			buttonX.className = "liButton";
			buttonX.appendChild(document.createTextNode("X"));
			//append button to li
			li.appendChild(buttonX);
			//appending li to ordered list
			list.appendChild(li);
		}
	}
}

//handle delete button
function eraseMe(e){
	if(e.target.list.contains('liButton')){
		if (confirm("Are you sure?")) {
			list.removeChild(e.target.parentElement);
		}
	}
}
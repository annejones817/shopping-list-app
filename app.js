$(document).ready(function(){
	//Single State Object
	var state = {
		items: [ ]
	};

	//State Modification
	////////Add Item
	var addItem = function(state, item) {
		state.items.push(item);
	};

	////////Remove Item
	var removeItem = function(state, item) {
		var index = state.items.indexOf(item); 
		if (index > -1) {
			state.items.splice(index,1);
		};
	};

	//Rendering
	////////Display Added Item
	var displayAddedItem = function(state, element) {
		var newItemHTML = 
				'<li>' + 
				'<span class="shopping-item">' + state.items[state.items.length - 1] + '</span>' +
				'<div class="shopping-item-controls">' +
				'<button class="shopping-item-toggle">' +
				'<span class="button-label">check</span>' +
				'</button>' +
				'<button class="shopping-item-delete">' +
				'<span class="button-label">delete</span>' +
				'</button> </div> </li>';
		console.log(newItemHTML);
		element.append(newItemHTML);
	};

	///////Check/Uncheck Item
	var checkUncheck = function(state, element) {
		element.closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
		if (element.closest('li').find('.shopping-item').hasClass('shopping-item__checked')) {
			element.text('uncheck'); 
		}	
		else {element.text('check')}

	};

	///////Remove Deleted Item
	var removeDeletedItem = function(state, element) {
		element.closest('li').remove();
	};

	///////Reset Input Field
	var resetInput = function(state, element) {
		element.val(null);
	};

	//Event Listeners
	////////"Add Item" Submission
	$('form').submit(function(event) {
		event.preventDefault();
		addItem(state, $('#shopping-list-entry').val());
		displayAddedItem(state, $('.shopping-list'));
		resetInput(state, $('#shopping-list-entry'));
	});

	////////"Check/Uncheck"
	$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
		checkUncheck(state, $(this));
	});

	///////"Delete"
	$('.shopping-list').on('click', '.shopping-item-delete', function(event){
		removeItem(state, $(this).closest('li').find('.shopping-item').text());		
		removeDeletedItem(state, $(this));
	});

});
$(function() {

var $newListItem = $('#new-list-item');

var $itemName = $('#item-name');

var $itemPrice = $('#item-price');

var $itemList = $('#item-list');

var itemTemplate = _.template($('#list-template').html());

var arr = [
	{name: 'baseball bat', price: 20},
	{name: 'car', price: 2000}
];

// Item constructor
var Item = function (name, price) {
	this.name = name;
	this.price = price;
}

// append
_.each(arr, function (item, index) {
	var $item = $(itemTemplate(item));
	$item.attr('data-index', index);
	$itemList.append($item);
});

// push
function push(item) {
		var $item = $(itemTemplate(item));
		console.log((arr.length - 1));
		$item.attr('data-index', (arr.length - 1));
		$itemList.append($item);
}

// submit
$newListItem.on('submit', function(event) {
	event.preventDefault();

	var element = new Item(($itemName.val()), ($itemPrice.val()));
	arr.push(element);

	push(element);

	$itemName.val('');
	$itemPrice.val('');
	$itemName.focus();

});

//remove
$itemList.on('click', '.item', function() {
	var index = $(this).attr('data-index');

	//remove from model
	arr.splice(index, 1);

	//remove from dom
	$(this).remove();

	//reindex
	$('.item').each(function(index) {
		$(this).attr('data-index', index);
	});

	console.log($itemList.html());
});


})
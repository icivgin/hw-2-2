$(function() {

var $newListItem = $('#new-list-item');

var $itemName = $('#item-name');

var $itemPrice = $('#item-price');

var $itemUrl = $('#item-img-url');

var $itemList = $('#item-list');

var itemTemplate = _.template($('#list-template').html());

//popover
$(function () {
  $('[data-toggle="popover"]').popover()
});

// Item constructor
var Item = function (name, price, url) {
	this.name = name;
	this.price = price;
	this.url = url;
}

Item.all = [];

Item.prototype.save = function() {
	Item.all.push(this);
}

Item.prototype.render = function() {
	var $item = $(itemTemplate(this));
	$itemList.append($item);
	$item.attr('data-index', Item.all.length);
}

//append hard items
var i1 = new Item('Baseball bat', 20, 'http://www.easyvectors.com/assets/images/thumbs/afbig/baseball-bat-clip-art.jpg')
var i2 = new Item('Car', 2000, 'http://www.wellclean.com/wp-content/themes/artgallery_3.0/images/car3.png')
i1.render();
i1.save();
i2.render();
i2.save();

console.log(Item);

// submit
$newListItem.on('submit', function(event) {
	event.preventDefault();

	var element = new Item(($itemName.val()), ($itemPrice.val()), ($itemUrl.val() || 'images/no-image.jpg'));
	element.save();
	element.render();

	// reset
	$itemName.val('');
	$itemPrice.val('');
	$itemName.focus();

});

//remove
$itemList.on('click', '.item', function() {

	var _index = $(this).attr('data-index');
	Item.all.splice(_index, 1);
	$(this).remove();

	//reindex
	$('.item').each(function(_index) {
		$(this).attr('data-index', _index);
	});

});

})
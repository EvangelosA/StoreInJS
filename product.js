"use strict"

// This is the constructor function for the product in the pool
function Product(id,nam,pric,imag,av_quant,pref) {
	this.id=id;
	this.name=nam;
	this.price=pric;
	this.image=imag;
	this.av_quantity=av_quant;
	this.preferences=pref;
}

// These two functions work together. 
function choose_attr(id_name,id_price,id_image,id_av_quantity,id_preferences,prod){
		document.getElementById(id_name).innerHTML= prod.name;
		document.getElementById(id_price).innerHTML= "Price: " + prod.price.toFixed(2);
		document.getElementById(id_image).src= prod.image;
		document.getElementById(id_av_quantity).innerHTML= "Available quantity: "+prod.av_quantity;
		let str = "";
		for(let i in prod.preferences)
			str = str + "<option value='"+ prod.preferences[i] + "' >" + prod.preferences[i]+ "</option>";
		document.getElementById(id_preferences).innerHTML = str;
}

// print_product is the function where the product of the pool is printed. There is the function choose_attr above
// 	that helps to write the correct data inside the element with the specific id's. Every element of
//	every product has a unique id which are created inside the print_product function.
// Print product creates the div element and choose_attr fills with the correct data.
function print_product(prod,basket)
{
	let id_element=prod.id;
	let id_name=id_element+"name";
	let id_price=id_element+"price";
	let id_image=id_element+"image";
	let id_av_quantity=id_element+"av_quantity";
	let id_preferences=id_element+"pref";
	let id_buy_quantity=id_element+"buy_quantity";
	document.getElementById(id_element).innerHTML = '<div class="details"><img width="100" height="150" class="prod_imag" id="'+id_image+
													'"></div><div class="details"><p id="'+id_name+
													'"></p><p id="'+id_price+
													'"></p><p id="'+id_av_quantity+
													'"></p><label>Preference:</label><select id="'+id_preferences+'"></select><br />'+
													'<label>Quantity:</label><input type="text" id="'+id_buy_quantity+
													'"></div>'; 
	choose_attr(id_name,id_price,id_image,id_av_quantity,id_preferences,prod);
}


//This function is triggered from the "Add to Basket" button. It creates a basket_product and 
// adds it in the basket using the add function of the Basket object of the basket.js file.
function buy_product(basket,id_element,id_buy_quantity,id_preferences,prod,product_array){
	let buy_quant= +document.getElementById(id_buy_quantity).value;
	let pref= document.getElementById(id_preferences).value;
	let name=prod.name;
	let price=prod.price;
	if(buy_quant<=prod.av_quantity)
	{
		prod.av_quantity -= buy_quant;
		let basket_product = new Basket_product(name,price,buy_quant,pref,prod);
		basket.add(basket_product,product_array);
		print_product(prod,basket);
	}
	else
	{
		alert("There not so many available products.");
	}
}

// This function gets an id and the product array (pool) and returns the product with that id
// 	It is used in XMLs.js file
function find_product_by_id(id,product_array)
{
	for(let i of product_array)
	{
		if(id==i.id)
			return i;
	}
}
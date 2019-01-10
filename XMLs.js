
// This function creates the XML for the Buy Button of the basket
// It gives information about the name, the quantity and the preference 
// 	of the each product, the date and the total cost.
function create_XML(basket)
{
	let XML_str="<order><products>";
	for(let i of basket.basket_products)
	{
		XML_str+="<product>";
		XML_str+="<name>"+i.name+"</name>";
		XML_str+="<quantity>"+i.quantity+"</quantity>";
		XML_str+="<preference>"+i.pref+"</preference>";
		XML_str+="</product>";
	}
	let d = new Date();
	XML_str+="</products><dateandtime>"+ d +"</dateandtime>";
	XML_str+="<totalcost>" + basket.total_cost().toFixed(2) + "</totalcost>";
	XML_str+="</order>";
	console.log(XML_str);
}


// The following functions work in case of refresh

// The first creates an XML with information about the basket and the available quantities of the pool products
function create_XML_for_refresh(basket,product_array)
{
	let XML_str="<state><basket>";
	XML_str+="<number_of_orders>"+basket.basket_products.length+"</number_of_orders>";
	for(let i of basket.basket_products)
	{
		XML_str+="<b_product>";
		XML_str+="<name>"+i.name+"</name>";
		XML_str+="<price>"+i.price+"</price>";
		XML_str+="<quantity>"+i.quantity+"</quantity>";
		XML_str+="<pref>"+i.pref+"</pref>";
		XML_str+="<self>"+i.self_product.id+"</self>";
		XML_str+="</b_product>";
	}
	XML_str+="<number_of_products>"+basket.number_of_products+"</number_of_products>";
	XML_str+="</basket>";
	XML_str+="<pool_quantities>";
	for(i of product_array)
	{
		XML_str+="<av_quantity>"+i.av_quantity+"</av_quantity>";
	}
	XML_str+="</pool_quantities></state>";
	return XML_str;
}

// This function parses the XML that gets and changes the available quantities in the product_array (pool)
function pool_products_parse_XML_from_refresh(XML_str,product_array)
{
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(XML_str,"text/xml");
	for(let i in product_array)
	{
		product_array[i].av_quantity = xmlDoc.getElementsByTagName("av_quantity")[i].childNodes[0].nodeValue;
	}
}

//This function parses the XML and creates the basket. It needs the product_array because
// the basket products have the original pool product too.
function basket_parse_XML_from_refresh(XML_str,product_array)
{
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(XML_str,"text/xml");
	let basket1= new Basket("basket1");
	let orders=xmlDoc.getElementsByTagName("number_of_orders")[0].childNodes[0].nodeValue;
	for(let i=0; i<orders; i++)
	{
		basket1.basket_products.push(new Basket_product(xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue,
														+xmlDoc.getElementsByTagName("price")[i].childNodes[0].nodeValue,
														+xmlDoc.getElementsByTagName("quantity")[i].childNodes[0].nodeValue,
														xmlDoc.getElementsByTagName("pref")[i].childNodes[0].nodeValue,
														find_product_by_id(xmlDoc.getElementsByTagName("self")[i].childNodes[0].nodeValue,product_array)));
	}
	basket1.number_of_products= +xmlDoc.getElementsByTagName("number_of_products")[0].childNodes[0].nodeValue;
	return basket1;
}
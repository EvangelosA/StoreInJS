// This is the constructor of the basket_product. It needs the original pool product inside it.
function Basket_product(name,price,quantity,pref,prod)
{
	this.name=name;
	this.price=price;
	this.quantity=quantity;
	this.pref=pref;
	this.self_product=prod;
}

//This is the Basket object.
function Basket(name){
	this.name=name; //I need the name of the basket to be there too.
	this.basket_products = []; //Starts with zero products
	this.discount = (total_cost) => (total_cost>=100) ? true : false; //A function to decide if there is the discount
	this.discount_active= false; // A boolean variable which is true when discount is active
	this.total_cost = function() // This function returns the total cost of the products. The discount is included.
	{
		if(this.number_of_products==0) //Case of zero products in basket
		{
			return 0;
		}
		let sum=0; //Case of at least one product in bakset
		for(let i of this.basket_products)
		{
			sum+=i.price*i.quantity;
		}
		if(this.discount(sum))//Case we have a discount
		{
			if(this.discount_active==false)// Case where we must inform the user for the discount
			{
				alert("You have a discount of 10%.");
				this.discount_active=true;
			}
			return sum-sum*0.1;
		}
		else // Simple case (not discount)
		{
			this.discount_active=false;
			return sum;
		}
		
	};
	this.number_of_products = 0; //This function counts the total number of products that are in the basket
	// Now there are functions that add, remove products in the basket. I need the product array as well, 
	//	because I need to maintain the XML in case of refresh. At the end of all functions we print the 
	// 	product in the pool and the basket.
	this.add = function(b_product,product_array)// Function for a new entrance in the basket
	{ 
		this.basket_products.push(b_product);
		this.number_of_products+=b_product.quantity;
		print_product(b_product.self_product,this);
		print_basket(this);
		localStorage.setItem("State",create_XML_for_refresh(this,product_array));
	};
	this.remove = function(position,product_array)// Function for a deletion of a product in the basket
	{	
		this.number_of_products-=this.basket_products[position].quantity;
		this.basket_products[position].self_product.av_quantity+=this.basket_products[position].quantity;
		print_product(this.basket_products[position].self_product,this);
		this.basket_products.splice(position,1);
		print_basket(this);
		localStorage.setItem("State",create_XML_for_refresh(this,product_array));
	};
	this.add_product = function(position,product_array) //Function for the addition of one product already in the basket
	{
		if(this.basket_products[position].self_product.av_quantity>=1)
		{
			this.number_of_products++;
			this.basket_products[position].quantity++;
			this.basket_products[position].self_product.av_quantity--;
			print_product(this.basket_products[position].self_product,this);
			print_basket(this);
			localStorage.setItem("State",create_XML_for_refresh(this,product_array));
		}
	};
	this.remove_product = function(position,product_array) //Function for the removal of one product already in the basket
	{
		if(this.basket_products[position].quantity>1)//Case we have more than one product
		{
			this.number_of_products--;
			this.basket_products[position].quantity--;
			this.basket_products[position].self_product.av_quantity++;
			print_product(this.basket_products[position].self_product,this);
		}
		else//case where the product must be totally removed from the basket
		{
			this.remove(position,product_array);
		}
		print_basket(this);
		localStorage.setItem("State",create_XML_for_refresh(this,product_array));
	};
}

//This is the function where the basket is printed
function print_basket(basket){
	// At the beginning I create parts of the three buttons for addition, removal and deletion
	let button_plus1= "<button type='button' onclick='"+basket.name+".add_product(";
	let button_plus2=",prod_arr);'>+</button>";
	let button_minus1= "<button type='button' onclick='"+basket.name+".remove_product(";
	let button_minus2=",prod_arr);'>-</button>";
	let button_ex1= "<button type='button' onclick='"+basket.name+".remove(";
	let button_ex2=",prod_arr);'>X</button>";
	// This is the beginning of the table
	let str_to_html="<center><h2>YOUR BASKET</h2></center><table class='basket_table'>";
	str_to_html+="<tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total Cost</th><th>Add</th><th>Remove</th><th>Delete</th></tr>";
	for(let i=0; i<basket.basket_products.length; i++) //For every product
	{
		let b_product=basket.basket_products[i]; //Get the product
		let button_plus=button_plus1+i+button_plus2;	//Create the three buttons
		let button_minus=button_minus1+i+button_minus2;
		let button_ex=button_ex1+i+button_ex2;
		// Print a new line with the basket product information
		str_to_html+="<tr>";
		str_to_html+="<td>"+b_product.name+"</td>"+
						"<td>"+b_product.price.toFixed(2)+"</td>"+
						"<td>"+b_product.quantity+"</td>"+
						"<td>"+(b_product.quantity*b_product.price).toFixed(2)+"</td>"+
						"<td>"+button_plus+"</td>"+
						"<td>"+button_minus+"</td>"+
						"<td>"+button_ex+"</td>";
		str_to_html+="</tr>"
	}
	// Print the last line of total cost
	str_to_html+="<td>Total</td>"+
					"<td></td>"+
					"<td>"+String(basket.number_of_products)+"</td>"+
					"<td>"+basket.total_cost().toFixed(2)+"</td><td></td><td></td><td></td>";
	str_to_html+="</table>";
	if(basket.discount_active) //In case we have a discount, a message is printed too. 
	{
		str_to_html+="<p>A discount of 10% is applied to the total price</p>";
	}
	str_to_html+="<button onclick='create_XML(basket1);'>Click Here to Proceed to Cash</button>"
	document.getElementById("table").innerHTML = str_to_html; //Print inside the element of table
}

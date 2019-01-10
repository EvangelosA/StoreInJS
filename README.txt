Name: Evangelos Arvanitopoulos

The application consists of five files and one directory.
	-index.html:	It is the main page file
	-product.js:	It contains objects and functions for the pool products
	-basket.js:		It contains objects and functions for the basket products and the basket object itself
	-XMLs.js:		It contains the function for the XML that will appear in console after the buy button 
						and some other functions that create and parse XML for the Refresh of the browser.
	-styles.css 	It contains the CSS code for presentation
	-images/		It contains all the images needed for the pool products' presentation.

General structure of the page: The page is divided into three parts
	-The header
	-The pool where the pool products are printed and
	-The basket where a table is printed with addition, removal and deletion buttons.

Important things about the code:
	-Pool products and basket products are different:
		-Pool products have elements like unique id, name, image, price, available quantity in the store and
			a variety of preferences for the user to select from. The pool of products is simply an array of
			such objects called prod_arr in the index.html.
		-Basket products have elements like name, buy quantity, selected preference and they are
			stored inside the basket object. These are the objects that the user has selected.
			Basket objects carry the original pool object too for technical reasons.
	-The basket contains an array of the basket products, a function that calculates the total
		cost of all basket objects, discount function and variable and a variable for the total amount of
		products in the basket.
	-Finaly there is the XMLs.js file that contains:
		-The function that creates and logs the XML needed for the buy button of the bakset and
		-Functions that are used for the page Refresh. In detail, I store an XML (different from the above)
			text with all the information needed to create the basket and the available quantities of the
			pool products, via localStorage functions. At the beginning of the page I get that XML and parse it
			in order to recreate the previous state. If the .getItem function returns null, I create an 
			empty basket.

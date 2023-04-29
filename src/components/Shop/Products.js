import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
	{
		id: "p1",
		price: 6,
		title: "My First Book",
		description: "The first book I ever Wrote",
	},
	{
		id: "p6",
		price: 5,
		title: "My Second Book",
		description: "The second book I ever Wrote",
	},
];

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_PRODUCTS.map((product) => (
					<ProductItem
						id={product.id}
						key={product.id}
						title={product.title}
						price={product.price}
						description={product.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;

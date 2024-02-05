import Products from '../../components/Products';
import { fetchProducts } from '../actions/getStripeProducts';

const Shop = async () => {
	const products = await fetchProducts();
	return <Products allProducts={products} />;
};

export default Shop;

import Info from '@/components/Info';
import Hero from '@/components/Hero';
import TopProducts from '@/components/TopProducts';
import Banner from '../components/Banner';
import NewArrivals from '@/components/NewArrivals';

const Home = () => {
	return (
		<>
			<Hero />
			<Info />
			<TopProducts />
			<Banner />
			<NewArrivals />
		</>
	);
};

export default Home;

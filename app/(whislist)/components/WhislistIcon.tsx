import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { useWishlistStore } from '@/store/useWhistlistStore';

const WhislistIcon = () => {
	const wishListStore = useWishlistStore();
	return (
		<Link
			href={'/whislist'}
			className={`${wishListStore.wishList.length > 0 ? 'text-red-700' : null}`}
		>
			<AiOutlineHeart />
		</Link>
	);
};

export default WhislistIcon;

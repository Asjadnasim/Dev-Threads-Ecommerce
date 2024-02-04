'use client';

import { FaHeartCirclePlus } from 'react-icons/fa6';
import { useWishlistStore } from '@/store/useWhistlistStore';
import { ProductTypes } from '@/types/ProductTypes';
import toast from 'react-hot-toast';

const AddToWishlistButton = ({
	name,
	id,
	image,
	quantity,
	unit_amount,
}: ProductTypes) => {
	const wishListStore = useWishlistStore();

	const addToWishlist = () => {
		const existingItem = wishListStore.wishList.find(
			(wishItem) => wishItem.id === id
		);

		if (existingItem) {
			toast.error(`${name} is already in your wishlist.`);
		} else {
			wishListStore.addToWishlist({
				name,
				id,
				image,
				quantity: 1,
				unit_amount,
				currency: undefined,
			});
			toast.success(`${name} added to your wishlist`);
		}
	};

	return (
		<div onClick={addToWishlist}>
			<FaHeartCirclePlus />
		</div>
	);
};

export default AddToWishlistButton;

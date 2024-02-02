'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaHeartCirclePlus, FaEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { ProductTypes } from '@/types/ProductTypes';

const ProductsCard = ({ product }: { product: ProductTypes }) => {
	const [selectedSize, setSelectedSize] = useState('');

	return (
		<div className='relative flex flex-col items-center '>
			<div className='relative group'>
				<img
					src={product.image}
					alt={`image of ${product.name}`}
					className='cursor-pointer w-[300px] h-[250px] object-cover pb-2 border-b-2 border-gray-700'
				/>
				<div className='hidden absolute top-5 items-center justify-center group-hover:flex flex-col gap-3 '>
					<button className='mx-2 bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75'>
						<FaHeartCirclePlus />
					</button>
					<button className='mx-2 bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75'>
						<FaEye />
					</button>
				</div>
			</div>
			<h3 className='font-semibold tracking-wide mt-2'>{product.name}</h3>
			<span>{product.unit_amount}</span>
			<select
				value={selectedSize}
				onChange={(e) => setSelectedSize(e.target.value)}
				className='my-2 p-2 border rounded-md'
			>
				<option value=''>Select Size</option>
				<option value='small'>Small Size</option>
				<option value='medium'>Medium Size</option>
				<option value='large'>Large Size</option>
			</select>

			<button>Add to Cart</button>
		</div>
	);
};

export default ProductsCard;

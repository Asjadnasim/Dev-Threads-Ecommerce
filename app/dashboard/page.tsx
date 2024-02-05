import { getOrders } from '../actions/getOrders';
import getCurrentUser from '../(auth)/actions/getCurrentUser';
import Image from 'next/image';
import formatPrice from '@/utils/formatPrice';

const dashboard = async () => {
	const user = await getCurrentUser();
	const orders = await getOrders(user);

	return (
		<>
			{user ? (
				<div className='main-container'>
					<div className='p-8 flex items-center justify-center gap-12 text-center '>
						<div>
							<p className='text-2xl font-semibold'>Hello! {user?.name} </p>
							<p> {user?.email}</p>
						</div>
					</div>
					<div>
						<h1 className='font-bold text-xl text-center underline'>Orders</h1>
						{orders.length === 0 ? (
							<div>You don't have any order yet.</div>
						) : (
							<>
								{orders?.map((order: any) => (
									<div
										key={order.id}
										className='rounded-lg p-8 my-4 space-y-2 bg-gray-200'
									>
										<h2 className='text-xs font-medium'>
											Order Number: {order.id.replaceAll(/\D/g, '')}
										</h2>
										<p className='text-xs status'>{order.status}</p>

										<div className='text-sm lg:flex items-center gap-4 '>
											{order.items.map((product: any) => (
												<div key={product.id} className='py-2'>
													{product.image && (
														<Image
															src={product.image}
															height={100}
															width={100}
															alt={`image for ${product.name}`}
														/>
													)}

													<h2 className='py-1'>{product.name}</h2>
													<span className='text-xs'>{product.size}</span>
													<div className='flex items-baseline gap-4 '>
														Quantity: {product.quantity}
													</div>
												</div>
											))}
										</div>
										<p className='font-medium py-2'>
											Total: {formatPrice(order.amount)}
										</p>
									</div>
								))}
							</>
						)}
					</div>
				</div>
			) : (
				<div className='h-96 flex items-center justify-center text-2xl uppercase'>
					Please sign-in to view orders
				</div>
			)}
		</>
	);
};

export default dashboard;

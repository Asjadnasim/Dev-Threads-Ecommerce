import Link from 'next/link';

const MobileMenuUser = () => {
	return (
		<ul className='flex flex-col gap-5'>
			<Link href={'/sign-in'}>
				<li>Log In</li>
			</Link>
			<Link href={'/sign-up'}>
				<li>Sign Up</li>
			</Link>
		</ul>
	);
};

export default MobileMenuUser;

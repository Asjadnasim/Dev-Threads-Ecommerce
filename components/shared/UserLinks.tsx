import { userLinks } from '@/constants';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const UserLinks = () => {
	return (
		<ul className='flex flex-col gap-5'>
			{userLinks.map((link) => (
				<Link href={link.route} key={link.label}>
					<li>{link.label}</li>
				</Link>
			))}
			<li className='cursor-pointer' onClick={() => signOut()}>
				Sign Out
			</li>
		</ul>
	);
};

export default UserLinks;

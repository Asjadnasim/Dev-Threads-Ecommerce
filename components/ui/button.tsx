'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	type,
	children,
	onClick,
	disabled,
}) => {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			aria-disabled={pending}
			className='bg-gray-600 text-white py-1 px-3 shadow rounded-md hover:bg-gray-800 hover:font-semibold hover:transition-all'
		>
			{children}
		</button>
	);
};

export default Button;

import { FormEvent } from 'react';
import './input.scss';

interface Props {
	value: string;
	placeholder?: string;
	onChange: (value: string) => void;
}

export default function Input({ value, placeholder, onChange }: Props) {
	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.value);
	};
	return (
		<input
			type="text"
			className="input"
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
		/>
	);
}

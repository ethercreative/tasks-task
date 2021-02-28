import css from './style.module.scss';
import cls from '../../_util/cls';
import { motion } from 'framer-motion';

export default function Task ({
	complete,
	text,
	onChange,
	...props
}) {
	const _onChange = e => onChange(!!e.target.checked);

	return (
		<motion.label
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={cls(css.task, {
				[css.checked]: complete,
			})}
			{...props}
		>
			<input
				type="checkbox"
				onChange={_onChange}
				defaultChecked={complete}
			/>
			<span className={css.check} />
			<div>
				<span className={css.text}>{text}</span>
			</div>
		</motion.label>
	);
}

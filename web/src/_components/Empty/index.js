import css from './style.module.scss';
import { motion } from 'framer-motion';
import cls from '../../_util/cls';

export default function Empty ({ children, error = false }) {
	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: 'auto' }}
			exit={{ opacity: 0, height: 0 }}
		>
			<div className={cls(css.empty, {
				[css.error]: error,
			})}>
				{children}
			</div>
		</motion.div>
	);
}

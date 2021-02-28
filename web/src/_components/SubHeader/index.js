import css from './style.module.scss';
import { motion } from 'framer-motion';

export default function SubHeader ({ children }) {
	return <motion.h2 className={css.header} layout>{children}</motion.h2>;
}

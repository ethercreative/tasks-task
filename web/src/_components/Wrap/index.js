import css from './style.module.scss';

export default function Wrap ({ children }) {
	return (
		<div className={css.wrap}>
			<div className={css.container}>
				{children}
			</div>
		</div>
	);
}

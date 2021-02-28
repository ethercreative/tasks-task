import css from './style.module.scss';
import cls from '../../_util/cls';

export default function Spin ({ show }) {
	return <div className={cls(css.spin, {
		[css.show]: show,
	})} />;
}

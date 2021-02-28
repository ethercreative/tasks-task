import { useState } from 'react';
import css from './style.module.scss';
import cls from '../../_util/cls';

export default function Input ({
	onFocusChange = () => {},
	onSubmit = () => {},
}) {
	const [hasFocus, _setHasFocus] = useState(false);

	const setHasFocus = v => {
		_setHasFocus(v);
		onFocusChange(v);
	};

	const onFocus = () => setHasFocus(true)
		, onBlur = e => setHasFocus(e.target.value.trim() !== '');

	const onInput = e => {
		const el = e.target;
		el.style.height = '';
		el.style.height = el.scrollHeight + 'px';
	};

	const onKeyPress = async e => {
		if (e.key !== 'Enter')
			return;

		e.preventDefault();
		await onSubmit(e.target.value);
		e.target.value = '';
		onInput(e);
		e.target.blur();
	};

	return (
		<div className={cls(css.wrap, {
			[css.focus]: hasFocus,
		})}>
			<textarea
				rows={1}
				className={css.input}
				onInput={onInput}
				placeholder="What's your task?"
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyPress={onKeyPress}
			/>
		</div>
	);
}

import classes from './Key.module.scss';
import classNames from 'classnames';

export const Key = ({ additionalCssClass, value }) => {
  return (
    <button data-testid="key" className={classNames([
      classes.key,
      classes[additionalCssClass]
    ])}>
      { value }
    </button>
  )
};

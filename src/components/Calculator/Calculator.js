import classes from './Calculator.module.scss';
import { Keyboard } from '../Keyboard';
import { Display } from '../Display';

export const Calculator = () => {
  return (
    <div className={classes.calculator}>
      <Display />
      <Keyboard />
    </div>
  );
};

import classes from './Keyboard.module.scss';
import { Key } from '../Key';

export const Keyboard = () => {
  const digitKeys = [...Array(10).keys()].map((index) => {
    return <Key additionalCssClass={`digitKey-${index}`} value={index} />;
  });

  return (
    <div data-testid="keyboard" className={classes.keyboard}>
      {digitKeys}
      <Key additionalCssClass={'clearKey'} value="AC" />
      <Key additionalCssClass={'plusKey'} value="+" />
      <Key additionalCssClass={'minusKey'} value="-" />
      <Key additionalCssClass={'equalsKey'} value="=" />
      <Key additionalCssClass={'separatorKey'} value="." />
    </div>
  )
};

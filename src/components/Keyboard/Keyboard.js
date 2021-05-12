import classes from './Keyboard.module.scss';
import { Key } from '../Key';
import { KEYS } from '../../static/keys';
import { generateID } from '../../helpers/generate-id';

export const Keyboard = () => {
  const keys = KEYS.map(({ value, role }) => {
    return (
      <Key
        key={generateID()}
        role={role}
        value={value}
      />
    );
  });

  return (
    <div data-testid="keyboard" className={classes.keyboard}>
      {keys}
    </div>
  )
};

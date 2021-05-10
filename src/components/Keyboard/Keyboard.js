import classes from './Keyboard.module.scss';
import { Key } from '../Key';
import { KEYS, keyRoles } from '../../static/keys';
import { generateID } from '../../helpers/generate-id';

export const Keyboard = () => {
  const keys = KEYS.map(({ value, role }) => {
    let additionalCssClass = `${role.toLowerCase()}Key`;
    if (role === keyRoles.DIGIT) {
      additionalCssClass += `-${value}`
    }

    return (
      <Key
        key={generateID()}
        role={role}
        value={value}
        additionalCssClass={additionalCssClass}
      />
    );
  });

  return (
    <div data-testid="keyboard" className={classes.keyboard}>
      {keys}
    </div>
  )
};

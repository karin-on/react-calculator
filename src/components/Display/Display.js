import { useSelector } from 'react-redux';
import classes from './Display.module.scss';

export const Display = () => {
  const displayedText = useSelector(({ displayedText }) => displayedText);

  return (
    <div
      data-testid="display"
      className={classes.display}
    >
      {displayedText}
    </div>
  );
};

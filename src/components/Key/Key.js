import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import classes from './Key.module.scss';
import * as actions from '../../store/actions/actions';
import { keyRoles } from '../../static/keys';

export const Key = ({ role, value, additionalCssClass }) => {
  const dispatch = useDispatch();

  const handleKeySelection = () => {
    switch (role) {
      case keyRoles.ADD:
        dispatch(actions.add());
        break;
      case keyRoles.CLEAR:
        dispatch(actions.clear());
        break;
      case keyRoles.DIGIT:
        dispatch(actions.selectValue(value));
        break;
      case keyRoles.EQUALS:
        dispatch(actions.equals());
        break;
      case keyRoles.SEPARATOR:
        dispatch(actions.separate());
        break;
      case keyRoles.SUBTRACT:
        dispatch(actions.subtract());
        break;
      default:
        break;
    }
  };

  return (
    <button
      data-testid="key"
      className={classNames([
        classes.key,
        classes[additionalCssClass]
      ])}
      onClick={handleKeySelection}
    >
      { value }
    </button>
  )
};

import classes from './Container.module.scss';

export const Container = ({ children }) => (
  <div className={classes.container} data-testid="container">
    {children}
  </div>
);

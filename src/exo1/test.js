/*
 * Import
 */
import test from 'src/test';


/*
 * Export default
 */
export default (coucou, salut, hello) => {
  test((
    coucou() === 'coucou'
    && salut() === 'salut'
    && hello() === 'hello'
  ));
};

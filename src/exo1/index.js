/*
 * Exo 1 : Import/Export
 *
 * OK, on a commencé à découvrir des nouveautés ES6...
 * Il est temps de s'y mettre vraiment, et de maîtriser les modules !
 *
 * 1) Créer un fichier src/exo1/hello.js
 *
 * 2) Dans ce fichier, définir 3 fonctions (coucou, salut et hello),
 *    qui renvoient une chaine de caractère (respectivement 'coucou',
 *   'salut' et 'hello')
 *
 * 3) Exporter ces 3 fonctions, en faisant deux export nommés
 *    et un export par défaut
 *
 * 4) Importer ces 3 fonctions dans ce module (src/exo1/index.js)
 */

/*
 * Import
 */
import test from './test';
// import salut from './hello';
// import { coucou, hello } from './hello';
import salut, { coucou, hello } from './hello';

/*
 * Tests
 */
test(coucou, salut, hello);

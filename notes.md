# A propos des composants

On va décrire chaque portion de notre ui (user interface) dans des composatans, chacun aura la responsabilité d'un morceau d'interface

Par exemple dans notre todolist on avait une partie form, counter, list, listItem

Pour isolé chaque morceau on avait fait une fonction qui possède son propre contexte

Par exemple pour faire un composant listItem, plutot que d'écrire la procédure pour créer un élement 1 fois

```js
const liElement = document.createElement('li');
liElement.textContent = 'Hello world';
liElement.className = 'list-item';
```

On va faire cette procédure, dans une fonction réutilisable et paramétrable, possédant son contexte : On fait un composant

```js
// Le composant c'est la fonction qui décrit une portion d'ui
function ListItem() {
  const liElement = document.createElement('li');
  liElement.textContent = 'Hello world';
  liElement.className = 'list-item';
  return liElement;
}

// pour générer un élement j'execute la fonction
const firstItem = ListItem();
const secondItem = ListItem();
```

Bien sur on pourra accépter un paramètre pour configurer l'élement retourné par le composant

```js
function ListItem(props) {
  const liElement = document.createElement('li');
  liElement.textContent = props.text;
  liElement.className = 'list-item';
  return liElement;
}

const firstItem = ListItem({
  text: 'Hello world',
});
const secondItem = ListItem({
  text: 'Coucou toto',
});
```

## Rangement

Plutot que de tout coder dans un seul fichier on va ranger les choses dans plusieurs fichiers

Pour rendre dispo qqch d'un fichier à l'autre on doit l'exporter d'un coté et l'importer ailleurs (dans 0, 1 ou plusieurs fichiers)

### Les exports/imports nommés

Pour faire un export nommé on utilise le mot `export` pour exporter une variable (et donc son nom) et sa valeur

```js
// hello.js
export const number = 123;
export const firstName = 'alexis';

// on peut aussi faire l'export après coup entre {}
const goldenNumber = 1.6;

let result = 5;
result = result * goldenNumber;

export { goldenNumber, result };
```

Pour importer, on se place dans un autre fichier, on place les imports en début de fichier (on aura jamais d'instructions avant les imports)

On spécifie le chemin (on peut omettre le .js), si le fichier s'appelle index.js on peut omettre le nom du fichier

```js
// index.js
import { firstName, result } from './hello';
// ira chercher dans le fichier index.js du dossier exo2
import { truc } from '../exo2';
```

On doit respecter le nom, on peut tout de meme renommer à la volée lorsqu'on importe avec le mot clé `as`

```js
// index.js
import { firstName as name, result } from './hello';

console.log(name, result);
```

### Les exports/imports par défaut

Avec l'export par défaut on exporte une valeur. On ne peut avoir qu'un seul export par défaut par fichier

```js
// hello.js
export default 'test';
```

```js
// truc.js
const element = 'truc';
export default element;
```

Dans un autre fichier on peut importer sans accolardes et avec le nom qu'on veut

```js
// index.js
import testValue from './hello';
import trucValue from './truc';
```

## Fini JS Vanilla, place à React

Plutot que de faire nos composant en vanilla, et de répéter sans arret des `document.createElement` on va faire des composants avec React et répéter sans arret des `React.createElement`

```jsx
import React from 'react';

function ListItem(props) {
  return React.createElement('li', { className: 'list-item' }, props.text);
}

const firstItem = ListItem({
  text: 'Hello world',
});
const secondItem = ListItem({
  text: 'Coucou toto',
});
```

C'est cool mais c'est toujours très verbeux, on peut plutot préférer JSX, on va écrire la meme chose mais de manière déguisé, on aura l'impression d'écrire du html mais on va bel et bien écrire React.crateElement

```jsx
import React from 'react';

function ListItem(props) {
  return <li className="list-item">{props.text}</li>;
}

const firstItem = <ListItem text="Hello world" />;
const secondItem = <ListItem text="Coucou toto" />;
```

On peut également configurer notre composant avec des enfants, pour cela on crée notre élement via une balise englobant et on met les enfants à l'intérieur, ils seront reçu en propriété de l'objet reçu en paramètre de la fonction composant sous la clé children

```jsx
import React from 'react';

function ListItem(props) {
  return (
    <li className="list-item">
      {props.text}
      {props.children}
    </li>
  );
}

const firstItem = (
  <ListItem text="Hello world">
    <span>Je suis un enfant</span>
  </ListItem>
);
const secondItem = <ListItem text="Coucou toto" />;
```

On aura tendance à décomposer via du desutructuring l'objet de props reçu en paramètre

```jsx
import React from 'react';

function ListItem({ text, children }) {
  return (
    <li className="list-item">
      {text}
      {children}
    </li>
  );
}

const firstItem = (
  <ListItem text="Hello world">
    <span>Je suis un enfant</span>
  </ListItem>
);
const secondItem = <ListItem text="Coucou toto" />;
```

Nos composants ne peuvent retourner qu'un seul élement parent

```jsx
// NON, on retourne jamais 2 voisins il faut 1 parent
function BadComponent() {
  return (
    <div>Test</div>
    <div>Test</div>
  );
}

// 1 parent avec des enfants -> RAS c'est ok
function GoodComponent() {
  return (
    <section>
      <div>Test</div>
      <div>Test</div>
    </section>
  );
}

// si on veut mettre un parent qui aura 0 impact sur le DOM réel on peut mettre un fragment
function AltComponent() {
  return (
    <>
      <div>Test</div>
      <div>Test</div>
    </>
  );
}
```

## Voir qqch dans le DOM réel avec React-dom

Grace à react on décrit des elements React, des objets représentant des morceaux d'ui
Si on veut les voir dans le dom réel il faut utiliser une autre bibliothèque : React-Dom

On va executer la méthode render qui permet de faire le rendu initial, on passe à render en argument notre composant racine, qui contiendra tous les composants enfant. Ainsi on appelle render une seule fois, on verra en plus que la mise à jour du rendu lors des interactions se fait automatiquement, donc finalement on appelera render 1 seule fois par projet

```js
import { render } from 'react-dom';
import GoodComponent from './chemin/vers/GoodComponent';

const rootReactElement = <GoodComponent />;
const domParent = document.getElementById('root');

// on passe 2 arguments
// - l'element react à afficher
// - l'element du dom réel déjà présent dans la page qui va accueillir mon appli react
render(rootReactElement, domParent);

```


# A propos des composants

On va décrire chaque portion de notre ui (user interface) dans des composants, chacun aura la responsabilité d'un morceau d'interface

Par exemple dans notre todolist on avait une partie form, counter, list, listItem

Pour isoler chaque morceau on avait fait une fonction qui possède son propre contexte.

Par exemple pour faire un composant lisItem, plutôt que d'écrire la procédure pour créer un élement 1 fois

```js
const liElement = document.createElement('li');
liElement.textContent = 'Hello world';
liElement.classname = 'list-item';
```

On va faire cette procédure, dans une fonction réutilisable et paramétrable, possédant son contexte: on fait un composant

```js
// le composant c'est la fonction qui décrit une portion d'ui
function listItem() {
    const liElement = document.createElement('li');
    liElement.textContent = 'Hello world';
    liElement.classname = 'list-item';
    return liElement;
};

// pour générer un élement j'éxecute la fonction
const firstItem = listItem();
const secondItem = listItem();
```

Bien sur on pourra accepter un paramètre pour configurer l'élement retourné par le composant

```js
function listItem(props) {
    const liElement = document.createElement('li');
    liElement.textContent = props.text;
    liElement.classname = 'list-item';
    return liElement;
};

// pour générer un élement j'éxecute la fonction
const firstItem = listItem({
    text: 'Hello World',
});
const secondItem = listItem({
    text: 'Coucou toto',
});
```

## Rangement


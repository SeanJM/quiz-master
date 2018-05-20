# A pretty decent scaffold to use to build a React project

This is starting to get to a pretty state of the art place.

## What's included?

- A Webpack configuration designed to grow (webpack-merge)
- Babel tranformation of latest JavaScript to ES5 for browser compatibility
- ESLint (JavaScript code linting)
- SASS
- CSS auto prefixer
- CSS minification (production)
- Hot module replacement (Automatic reloading of the page when files change)
- Souce control with Git
- Single source of truth state pattern
- Action dispatcher (event bus to mutate state)
- Component based architecture
- ~~Hyperscript node creation~~

## Future

The next steps are 

- ~~Lazy copying / merging of objects~~ [Lodash](https://lodash.com/) -> merge
- ~~JSX~~
- ~~React or Vue or Angular.~~ -> [React](https://reactjs.org/)
- [TypeScript](http://www.typescriptlang.org/)
- Building a mock server with [Express](https://expressjs.com/) and NodeJS

## What text editor to use?

- [Visual Studio Code](https://code.visualstudio.com/) (My favorite)
- [Sublime Text](https://www.sublimetext.com/) (I've bought this twice, it's good)
- [Atom](https://atom.io/) (Used to be my favorite)

## How to start this?

Install NodeJS if you haven't already. In the command line, run 

```npm i```

For eslint you will want to install it globally: I don't know what that is in windows, but in a mac that's 

```sudo npm i eslint```

## Building for production

```npm run build```
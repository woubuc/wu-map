# Wurm Map

This is the interactive map of the Wurm Unlimited server Sklotopolis.

## Contributing

Adding locations yourself is pretty easy.

### Installing

_Skip these first steps if you've already done them in the past._

Install [Node.JS](https://nodejs.org/)

Once Node is installed, install [Gulp](http://gulpjs.com/) globally using the npm package manager.

    $ npm i gulp -g

### Cloning

Fork the repository into your own Github account and then clone it to your local computer. Make sure you're in the `gh-pages` branch and not the master branch. Only the `gh-pages` branch is kept up to date.

Once the repository is set up locally, install the dependencies with npm.

    $ npm i

_Note: `npm i` is shorthand for `npm install`. You can use either one.


### Running

When editing the code, use Gulp to watch the files and auto-compile.

    $ gulp

You can also manually compile when you're done without using `gulp.watch` with the compile task.

    $ gulp compile

To view the map itself, you have to serve the files from a webserver. You can use a local Apache installation (XAMPP, WAMP, MAMP, etc) but since I don't need fancy PHP functions or databases I use the simple command-line tool [http-server](https://www.npmjs.com/package/http-server).

    $ http-server

### Editing

The location files are in `src/locations`. They are written in Coffeescript, but if you're not familiar with the syntax you can look at the other locations. It should be pretty straightforward. If you make a mistake, Gulp will tell you and the Coffeescript will not be compiled.

_Note: when encountering a Coffeescript error, the compile task may stop watching the files. You have to kill the process with <kbd>ctrl</kbd> + <kbd>C</kbd> and then run `gulp` again._

Once you're done editing and the edits have been compiled, you can push it back to your repository and then submit a pull request to have the new locations added to the map.
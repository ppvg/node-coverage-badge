Generate fancy code coverage badges! Does what it says on the tin. Works like this:

    $ node coverage-badge 97 coverage.png

... or like this:

    var fs = require('fs');
    var badge = require('coverage-badge');

    var coverage = /* read coverage from JSON or whatever */;
    var file = fs.createWriteStream('coverage.png');

    badge(coverage).pipe(file);

In other words: use your build tool to tie it to your code coverage report.

The result looks something like this: ![97% coverage](https://raw.github.com/PPvG/node-coverage-badge/master/example.png)

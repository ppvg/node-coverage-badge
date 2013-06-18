Generate fancy code coverage badges! Does what it says on the tin. 

![100% coverage](https://raw.github.com/PPvG/node-coverage-badge/master/example/100.png) ![95% coverage](https://raw.github.com/PPvG/node-coverage-badge/master/example/95.png) ![85% coverage](https://raw.github.com/PPvG/node-coverage-badge/master/example/85.png)

Works like this:

    $ node coverage-badge 95 coverage.png

... or like this:

    var fs = require('fs');
    var badge = require('coverage-badge');

    var coverage = /* read coverage from JSON or whatever */;
    var file = fs.createWriteStream('coverage.png');

    badge(coverage).pipe(file);

Tie it in with build tool and let your continuous integration tool call that build step and archive the image.

Example
-------

An example: [node-aether](https://github.com/PPvG/node-aether) uses Drone.io as CI server and `slake` as build tool. The relevant build step runs `jscoverage` to instrument, then runs `mocha` to generate a JSON code coverage report, and then uses that to generate the coverage badge. That last bit looks like this (rewritten from the original LiveScript):

    var badge = require('coverage-badge');

    task 'cov-badge', function() {
      /* [run jscoverage...] */
      /* [run mocha...] */
      mocha.on('close'), function() {
        var json = require('./coverage.json');
        var file = fs.createWriteStream('./coverage.png');
        badge(json.coverage).pipe(file);
      }
    }

At each build, Drone.io runs these commands:

    sudo apt-get install jscoverage
    slake cov-badge

... and then saves `./coverage.png` as a **build artefact**. The image can then be found under the Downloads tab. The result:
[![Code Coverage for node-aether](https://drone.io/github.com/PPvG/node-aether/files/coverage.png)](https://github.com/PPvG/node-aether)

Visual theme
------------

Currently it pretty much mimics the look of the Drone.io badge. Other styles may be added in the future.

Installation
------------

    npm install coverage-badge

License
-------

Simplified BSD (2-clause).

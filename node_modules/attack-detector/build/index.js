/**
 * Converts raw Data to JSON hash table.
 *
 * @package attack-detector
 * @author Ozan Pekmezci <ozan.pekmezci@tum.de>
 */

/**
 * Dependencies
 */
var async   = require('async'),
    fs      = require('fs');

/**
 * Read data from original format
 */
fs.readFile(__dirname + '/data.txt', function (err, data) {
    // Storage object
    var hash = new Object(null);

    // Split lines
    var lines = data.toString().split(/\n/);
    async.forEach(lines, function (obj, callback) {
        var item = obj.split(/\t/);
        hash[item[0]] = Number(item[1]);
        callback();
    }, function (err) {
        if (err) throw new Error(err);

        // Write out JSON
        fs.writeFile(
            __dirname + '/data.json',
            JSON.stringify(hash),
        function (err) {
            if (err) throw new Error(err);
            process.stdout.write('Complete.');
        });
    });
});

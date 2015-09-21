var ProgressBar = require('progress');

var SessionHandler = require('./lib/SessionHandler');
var SessionCreator = require('./lib/SessionCreator');

var sh = new SessionHandler('./groups');

sh.readGroup((err, groups) => {
    var sc = new SessionCreator(groups);

    var bar = new ProgressBar('  calculating [:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 50,
        total: sc.calcStats()
    });

    sc.on('progress', () => bar.tick());



    sc.createSessionForGroups();
});
#!/usr/bin/env node

var ProgressBar = require('progress');

var shotter = require('../index');

var creator = shotter(process.cwd(), function(error) {
    if (error) console.log(error);
});

var bar;
creator
    .on('initialize', () => {
        bar = new ProgressBar('  calculating [:bar] :percent', {
            complete: '=',
            incomplete: ' ',
            width: 50,
            total: creator.calcStats()
        });
    })
    .on('progress', (perc) => bar.tick());
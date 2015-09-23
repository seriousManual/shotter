#!/usr/bin/env node

var hr = require('hirestime')
var ProgressBar = require('progress')
var argv = require('yargs').argv

var shotter = require('../index')

if (argv.v) {
    console.log(require('../package.json').version)
} else {
    run()
}

function run() {
    var elapsed = hr()
    var creator = shotter(process.cwd(), getOptions(argv), (error) => {
        if (error) console.log(error)

        console.log('overall %d seconds', elapsed(hr.S))
    })

    var bar
    creator
        .on('initialize', () => {
            bar = new ProgressBar('  calculating [:bar] :percent', {
                complete: '=',
                incomplete: ' ',
                width: 50,
                total: creator.calcStats()
            })
        })
        .on('progress', (perc) => bar.tick())
}

function getOptions(argv) {
    return {
        concurrency: argv.c || argv.concurrency || 1
    }
}
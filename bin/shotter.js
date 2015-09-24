#!/usr/bin/env node

var hr = require('hirestime')
var prettyMs = require('pretty-ms')
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

        console.log('elapsed time: %s', prettyMs(elapsed()))
    })

    var bar
    creator
        .on('initialize', () => {
            bar = new ProgressBar('[:bar] :percent', {
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
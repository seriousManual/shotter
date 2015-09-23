# shotter [![Build Status](https://travis-ci.org/seriousManual/shotter.png)](https://travis-ci.org/seriousManual/shotter)

Shotter takes a list of specified URLs and takes screenshots of the rendered page. The screenshots are arranged in sessions. When a previous session exists, shotter will create a diff between the screenshots of one URL and combine the two screenshots and the diff to one result.

This will result in an image the looks similar to this one (click to enlarge):

<p align="center">
  <a href="https://raw.github.com/seriousManual/shotter/master/img/diff.jpg" target="_blank"><img src="https://raw.github.com/seriousManual/shotter/master/img/diff_small.jpg"/></a><br>
  click to enlarge
</p>

## specification

Shotter works in a working space and treats every directory in this working space as a distinct project. Each project has its own set of URLs that are specified via a `.spec.json` file.
Under a certain project each session hat its own directory, denoted by a timestamp.
In a session directory all the screenshots can be found, additionally the diffs to the previous session are stored as well as the summaries.
 
````
workingSpace
  fooProject
    .spec.json
    20140920000000
      d4da96058f7e3c5f0003544304d65dc4.png
    20140921000000
      d4da96058f7e3c5f0003544304d65dc4.png
      results
        d4da96058f7e3c5f0003544304d65dc4.png
      diffs
        d4da96058f7e3c5f0003544304d65dc4.png
    20140922000000
      d4da96058f7e3c5f0003544304d65dc4.png
      results
        d4da96058f7e3c5f0003544304d65dc4.png
      diffs
        d4da96058f7e3c5f0003544304d65dc4.png
````
 
 In the session `20140920000000` there are no diffs and results to be found because there hasn't been a previous session.
 
### .spec.json

In the `.spec.json` file the URLs that should be used are specified:

````
{
  "urls": [
    "fooUrl", 
    "barUrl"
  ]
}
````

## built with

* [webshot](https://github.com/brenden/node-webshot)
* [image-diff](https://github.com/uber/image-diff)
* [gm](https://github.com/aheckmann/gm)

## constraints

Since some ES2015 features are used the minimal supported node version is 4.x 
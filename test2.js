#!/usr/bin/env node

/**
 * Module dependencies.
 */

//var program = require('commander');
//program
//  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//  .parse(process.argv);
//console.log(program.cheese);
//
// ---------------------------------------------------------------------------------------------------------------------
//
var program = require('commander');
program
  .option('-u, --url [type]', 'load url [www.google.de]', 'www.google.de')
  .parse(process.argv);
console.log(program.url);
//
// ---------------------------------------------------------------------------------------------------------------------
//
//var program = require('commander');
//program
//  .option('-u, --url', 'load url [www.google.de]', 'www.google.de')
//  .parse(process.argv);
//console.log(program.url);
//
// ---------------------------------------------------------------------------------------------------------------------
//

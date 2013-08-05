#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile, output) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    output(JSON.stringify(out, null, 4));
};

var checkHtmlUrl = function(url, checksfile, output) {
    var loadAndCheck = function(response) {
        $ = cheerio.load(response);
        var checks = loadChecks(checksfile).sort();
        var out = {};
        for(var ii in checks) {
            var present = $(checks[ii]).length > 0;
            out[checks[ii]] = present;
        }
        output(JSON.stringify(out, null, 4));
    };
    rest.get(url).on('complete', loadAndCheck);
}

var output = function(text) {
    console.log(text);
}

if(require.main == module) {
    program
            .option('-c, --checks [checkfile]', 'Path to checks.json')
            .option('-f, --file [filename]', 'Path to index.html')
            .option('-u, --url [website]', 'URL to website')
            .parse(process.argv);
    
    if (program.file) {
        checkHtmlFile(program.file, program.checks, output);
    } else if (program.url) {
        checkHtmlUrl(program.url, program.checks, output);
    }
} else {
    exports.checkHtmlFile = checkHtmlFile;
    exports.checkHtmlUrl = checkHtmlUrl;
}







































//
//
//#!/usr/bin/env node
//
//var program = require('commander');
//var rest = require('restler');
//var cheerio = require('cheerio');
//
////if (require.main == module) {
////    console.log("if");
////
////    program
////            .option('-u, --url [website]', 'URL to website')
////            .parse(process.argv);
////    
////    rest.get(program.url).on('complete', function(response) {
////        var htmlByLoadedURLContent = cheerio.load(response);
////        
////        console.log("-----------------------------------------------------------------");
////        $ = htmlByLoadedURLContent;
////        var present = $('h1').length > 0;
////        if (present) {
////            console.log("h1 vorhanden: " + $('h1'));
////        } else {
////            console.log("h1 nicht vorhanden");
////        }
////        present = $('h2').length > 0;
////        if (present) {
////            console.log("h2 vorhanden: " + $('h2'));
////        } else {
////            console.log("h2 nicht vorhanden");
////        }
////        console.log("-----------------------------------------------------------------");
////    });
////} else {
////    console.log("else");
////}
//
//
//
//var loadChecks = function(checksfile) {
//    return JSON.parse(fs.readFileSync(checksfile));
//};
//
//var checkHtmlFile = function(htmlfile, checksfile) {
//    // TODO
//}
//
//var checkHtmlByUrl = function(url, checksfile) {
//    console.log("checkHtmlByUrl");
//    
//    var result = "--leer--";
//    var loadAndCheck = function(response) {
//        var htmlByLoadedURLContent = cheerio.load(response);
//        
////        console.log("-----------------------------------------------------------------");
//        $ = htmlByLoadedURLContent;
//        var present = $('h1').length > 0;
//        if (present) {
////            console.log("h1 vorhanden: " + $('h1'));
//            result = "h1 vorhanden: " + $('h1');
//        } else {
////            console.log("h1 nicht vorhanden");
//            result = "h1 nicht vorhanden";
//        }
////        present = $('h2').length > 0;
////        if (present) {
//////            console.log("h2 vorhanden: " + $('h2'));
////            result = "h2 vorhanden: " + $('h2');
////        } else {
//////            console.log("h2 nicht vorhanden");
////            result = "h2 nicht vorhanden";
////        }
////        console.log("-----------------------------------------------------------------");
//    };
//    rest.get(url).on('complete', loadAndCheck);
//    return result;
//}
//
//if (require.main == module) {
//    program
//            .option('-c, --checks ', 'Path to checks.json')
//            .option('-f, --file [filename]', 'Path to index.html')
//            .option('-u, --url [website]', 'URL to website')
//            .parse(process.argv);
//
//    var checkJson = "";
//    
//    if (program.file) {
//        checkJson = checkHtmlFile(program.file, program.checks);
//    } else if (program.url) {
//        checkJson = checkHtmlByUrl(program.url, program.checks);
//    }
//    
//    console.log(checkJson);
//
//    var outJson = JSON.stringify(checkJson, null, 4);
//    
//    console.log(outJson);
//} else {
//    exports.checkHtmlFile = checkHtmlFile;
//}
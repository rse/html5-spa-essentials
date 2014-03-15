/*
**  HTML5-SPA-Essentials
**  Copyright (c) 2013-2014 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  external requirements  */
var fs      = require("fs");
var sprintf = require("sprintfjs");
var _       = require("lodash");

/*  read textual input  */
var txt = fs.readFileSync("../html5-spa-essentials.txt", { encoding: "utf8" });
var lines = txt.split(/\r?\n/);
var head = 0;
var m;
var npm = [];
var bower = [];
for (var i = 0; i < lines.length; i++) {
    if (typeof lines[i+1] === "string" && lines[i+1].match(/^#/))
        continue
    else if (typeof lines[i+1] === "string" && lines[i+1].match(/^====/))
        head++;
    else if ((m = lines[i].match(/^(.+?):\s+(.+?)\s+(.+?)\s+(.+?)\s+\((.+?)\)\s+(.+?)\s+([^(]+)(?:\s+(\(\*\)))?$/)) !== null) {
        var item = {
            area: m[1], name:    m[2], id:  m[3], version: m[4],
            date: m[5], license: m[6], url: m[7], rse: (m[8] !== undefined)
        };
        if (head === 1)
            npm.push(item);
        else
            bower.push(item);
    }
}

/*  generate NPM configuration  */
json = "";
_.forEach(npm, function (item) {
    if (item.id === "-" || item.id === "npm")
        return;
    json += sprintf("        %-20s %s,\n", "\"" + item.id + "\":", "\"~" + item.version + "\""); 
});
json =
    "{\n" +
    "    \"name\": \"your-spa-name\",\n" +
    "    \"version\": \"0.0.0\",\n" +
    "    \"dependencies\": {\n" +
    json.replace(/,\n$/, "\n") +
    "    }\n" +
    "}\n";
fs.writeFileSync("package.json", json, { options: "utf8" });

/*  generate Bower configuration  */
var json = "";
_.forEach(bower, function (item) {
    var version = item.version;
    if (version === "CURRENT")
        version = "master";
    else
        version = "~" + version;
    json += sprintf("        %-20s %s,\n", "\"" + item.id + "\":", "\"" + version + "\""); 
});
json =
    "{\n" +
    "    \"name\": \"your-spa-name\",\n" +
    "    \"version\": \"0.0.0\",\n" +
    "    \"dependencies\": {\n" +
    json.replace(/,\n$/, "\n") +
    "    }\n" +
    "}\n";
fs.writeFileSync("bower.json", json, { encoding: "utf8" });


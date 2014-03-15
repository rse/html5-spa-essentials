
$(document).ready(function () {
    $.get("html5-spa-essentials.txt", function (data) {
        var list = $("<table></table>");

        var lines = data.split(/\r?\n/);
        var k = 0;
        var head = 0;
        for (var i = 0; i < lines.length; i++) {
            var m;
            if (typeof lines[i+1] === "string" && lines[i+1].match(/^====/)) {
                head++;
                m = lines[i].split(/\s+/);
                list.append(
                    "<tr class=\"header\">\n" +
                    "  <th class=\"area\">" + m[0].replace(/_/g, " ") + "</td>\n" +
                    "  <th class=\"name\">" + m[1].replace(/_/g, " ") + "</td>\n" +
                    "  <th class=\"id\">" + m[2].replace(/_/g, " ") + "</td>\n" +
                    "  <th class=\"version\">" + m[3].replace(/_/g, " ") + "</td>\n" +
                    "  <th class=\"date\">" + m[4].replace(/_/g, " ") + "</td>\n" +
                    "  <th class=\"license\">" + m[5].replace(/_/, " ") + "</td>\n" +
                    "</tr>\n"
                );
            }
            else {
                m = lines[i].match(/^(.+?):\s+(.+?)\s+(.+?)\s+(.+?)\s+\((.+?)\)\s+(.+?)\s+([^(]+)(?:\s+(\(\*\)))?$/);
                if (m === null)
                    continue;
                var item = {
                    area:    m[1],
                    name:    m[2],
                    id:      m[3],
                    version: m[4],
                    date:    m[5],
                    license: m[6],
                    url:     m[7],
                    rse:     (m[8] !== undefined)
                };
                var c = "row-" + k;
                if (item.rse)
                    c += " rse";
                var url = (head === 1
                    ? "https://www.npmjs.org/package/" + item.id
                    : "http://bower.io/search/?q="     + item.id
                );
                list.append(
                    "<tr class=\"" + c + "\">\n" +
                    "  <td class=\"area\">" + item.area + "</td>\n" +
                    "  <td class=\"name\"><a href=\"" + item.url + "\">" + item.name + "</a></td>\n" +
                    "  <td class=\"id\"><a href=\"" + url + "\">" + item.id + "</a></td>\n" +
                    "  <td class=\"version\">" + item.version + "</td>\n" +
                    "  <td class=\"date\">" + item.date + "</td>\n" +
                    "  <td class=\"license\">" + item.license + "</td>\n" +
                    "</tr>\n"
                );
            }
            k = (k + 1) % 2;
        }
        $(".list").append(list);
    });
});


"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = __importStar(require("cheerio"));
// traverse all elements in cherrio dom
function traverse(element, visitor) {
    var result = visitor(element);
    if (result)
        return result;
    if (element.childNodes) {
        for (var _i = 0, _a = element.childNodes; _i < _a.length; _i++) {
            var child = _a[_i];
            result = traverse(child, visitor);
            if (result)
                return result;
        }
    }
    return null;
}
function rewrite(source) {
    // load vue template, wrap it in body, for use in html method at the end (html renders inner content)
    var $ = cheerio.load("<body>" + source + "</body>", { recognizeSelfClosing: true, xmlMode: true, decodeEntities: false });
    function modifyAllTags() {
        // get the template node
        var template = $("template")[0];
        // traverse all tags
        traverse(template, function (element) {
            // make sure it is valid
            if (!element || !element.tagName || element.type != "tag") {
                return null;
            }
            // get v-use attribute
            var attributeNames = Object.keys(element.attribs);
            var vUseAttribute = attributeNames.find(function (x) { return x.startsWith("v-use"); });
            // if attribute has default event modifier
            if (!vUseAttribute)
                return null;
            var defaultEvent = "input";
            if (vUseAttribute.includes(".")) {
                defaultEvent = vUseAttribute.replace("v-use.", "");
            }
            // generate binds
            var name = element.attribs[vUseAttribute];
            element.attribs["v-bind"] = name;
            element.attribs["@" + defaultEvent] = "x => " + name + ".set ? " + name + ".set(x) : (" + name + ".value = x)";
            delete element.attribs[vUseAttribute];
            // if this is component
            if (element.tagName == "component") {
                // if has as binding
                if (element.attribs["as"]) {
                    element.attribs[":is"] = "'" + element.attribs["as"] + "'";
                    delete element.attribs.as;
                }
                else {
                    element.attribs[":is"] = name + "['$name'] || " + name + ".constructor.name";
                }
            }
            // continue
            return null;
        });
    }
    // then go through every tag and modify this according to the definition
    modifyAllTags();
    // now serialize body content to html
    return $("body").html() || source;
}
exports.rewrite = rewrite;
//# sourceMappingURL=vue-main.js.map
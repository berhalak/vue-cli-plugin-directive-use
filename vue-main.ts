import * as cheerio from "cheerio"

// traverse all elements in cherrio dom
function traverse(element: CheerioElement, visitor: (e: CheerioElement) => CheerioElement | null): CheerioElement | null {
	let result = visitor(element);
	if (result) return result;
	if (element.childNodes) {
		for (const child of element.childNodes) {
			result = traverse(child, visitor);
			if (result) return result;
		}
	}
	return null;
}

function rewrite(source: string): string {	
	// load vue template, wrap it in body, for use in html method at the end (html renders inner content)
	const $ = cheerio.load(`<body>${source}</body>`, { recognizeSelfClosing: true, xmlMode: true, decodeEntities: false });

	function modifyAllTags() {

		// get the template node
		const template = $("template")[0];

		// traverse all tags
		traverse(template, element => {
			// make sure it is valid
			if (!element || !element.tagName || element.type != "tag") {
				return null;
			}

			// get v-use attribute
			const attributeNames = Object.keys(element.attribs);
			const vUseAttribute = attributeNames.find(x=> x.startsWith("v-use"));
			// if attribute has default event modifier
			if (!vUseAttribute) return null;

			let defaultEvent = "input";

			if (vUseAttribute.includes(".")){
				defaultEvent = vUseAttribute.replace("v-use.", "");
			}

			// generate binds
			let name = element.attribs[vUseAttribute];

			element.attribs["v-bind"] = name;
			element.attribs["@" + defaultEvent] = `x => ${name}.set ? ${name}.set(x) : (${name}.value = x)`;

			delete element.attribs[vUseAttribute];

			// if this is component
			if (element.tagName == "component"){
				// if has as binding
				if (element.attribs["as"]){
					element.attribs[":is"] = "'" + element.attribs["as"] + "'";
					delete element.attribs.as;
				} else {
					element.attribs[":is"] = `${name}['$name'] || ${name}.constructor.name`
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

export {
	rewrite
}

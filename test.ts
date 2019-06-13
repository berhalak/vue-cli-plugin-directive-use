import { rewrite } from "./vue-main";
import { readFileSync, writeFileSync } from "fs"

const source = readFileSync("./source.vue").toString();
const expected = readFileSync("./expected.vue").toString();

if (expected.trim() != rewrite(source).trim()) {
	writeFileSync("./actual.vue", rewrite(source));
	throw new Error("Test failed")
} else {
	console.log("Test passed")
}
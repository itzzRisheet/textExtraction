import natural from "natural";
import fs from "fs";
import stopword from "stopword";

var text;
text = fs.readFileSync("./text.txt", "utf8");

var tokenizer = new natural.WordTokenizer();

var TOKENS = tokenizer.tokenize(text);
// console.log(TOKENS);
// console.log(natural.PorterStemmer.tokenizeAndStem("friends"));

const temp = stopword.removeStopwords(text.split(" "));
console.log(TOKENS);
console.log(temp);

import natural from "natural";
import stopword from "stopword";

const getSentences = (text) => {
  const regEx = /[^\.!\?]+[\.!\?]+/g;
  const sent = text.match(regEx);
  if (sent === null) {
    if (getCharactersWithoutSpaces(text) > 0) {
      return 1;
    }
    return 0;
  }

  return sent.length;
};

const getParagraph = (text) => {
  const para = text.replace(/\n$/gm, "").split(/\n/);
  // const para = text.split("/n/n");
  // if (para[0] == "") {
  //   return 0;
  // }
  return para.length;
};

const getWords = (text) => {
  return text.split(" ").filter(function (num) {
    return num != "";
  }).length;
};

const text =
  "This module was essentially coppied directly from @fergiemcdowall's stopword library. The only differences is that more language support was added from this stopwords json lib Also there are minor tweaks to several languages specifically for worldbrains use-case. Unless otherwise specified all the stopwords came from stopwords json lib";
console.log(getWords(text));

const getCharactersWithSpaces = (text) => {
  const count = text.length;
  return count;
};

const getCharactersWithoutSpaces = (text) => {
  const count = text.length;

  const spaces = text.split(" ").length - 1;
  return count - spaces;
};

const getWordsPerSentences = (text) => {
  const wd = getWords(text);
  const sent = getSentences(text);
  if (sent === 0) {
    return wd;
  }
  var numb = wd / sent;
  const rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
  return rounded;
};
const getCharactersPerWord = (text) => {
  const ch = getCharactersWithoutSpaces(text);
  const wd = getWords(text);
  if (wd === 0) {
    return ch;
  }
  var numb = ch / wd;
  const rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
  return rounded;
};

//JavaScript code
function getWordFreq(str) {
  //Edge case: an empty array

  if (str.length === 0) {
    return {};
  }
  var output = {};

  var strArr = str.split(" ");
  strArr = stopword.removeStopwords(strArr);
  //A loop
  for (var i = 0; i < strArr.length; i++) {
    var word = strArr[i];
    if (output[word] === undefined) {
      output[word] = 1;
    } else {
      output[word] += 1;
    }
  }
  for (const property in output) {
    if (output[property] === 1) {
      delete output[property];
    }
  }
  return output;
}

export {
  getSentences,
  getWords,
  getParagraph,
  getCharactersPerWord,
  getCharactersWithoutSpaces,
  getCharactersWithSpaces,
  getWordsPerSentences,
  getWordFreq,
};

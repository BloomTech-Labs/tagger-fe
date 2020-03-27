const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

function makeHtmlSafe(untrustedHtml) {
  const domWindow = new JSDOM("").window;
  const domPurify = createDOMPurify(domWindow);

  domPurify.setConfig({ ADD_ATTR: ["target"] });

  // domPurify.addHook("uponSanitizeElement", (currentNode, data) => {
  //   if (currentNode.tagName === "A") {
  //      const textContent = currentNode.textContent;
  //      const target = currentNode.target;
  //      const log = `textContent="${textContent}" target="${target}"`;
  //      console.log(log);
  //     currentNode.target = "_blank";
  //   }
  //   return currentNode;
  //});
  
  const sanitizedHtml = domPurify.sanitize(untrustedHtml);

  return sanitizedHtml;
}

module.exports = {
  makeHtmlSafe
}

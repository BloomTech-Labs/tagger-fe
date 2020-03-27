const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

function makeHtmlSafe(untrustedHtml) {
  const domWindow = new JSDOM("").window;
  const domPurify = createDOMPurify(domWindow);

  domPurify.setConfig({ ADD_ATTR: ["target"] });

  domPurify.addHook("afterSanitizeAttributes", function(node) {
    if (node.localName === "a") {
      node.setAttribute("target", "_blank");
    }
  });
  
  const sanitizedHtml = domPurify.sanitize(untrustedHtml);

  return sanitizedHtml;
}

module.exports = {
  makeHtmlSafe
}

/**
 * Source: https://github.com/wcoder/highlightjs-line-numbers.js/blob/master/src/highlightjs-line-numbers.js
 * Let Chat GPT add types to this file.
 */

import { HLJSApi } from "highlight.js";

interface LineNumbersOptions {
  singleLine?: boolean;
  startFrom?: number;
}

export const addLineNumbers = (hljs: HLJSApi) => {
  const TABLE_NAME = "hljs-ln",
    LINE_NAME = "hljs-ln-line",
    CODE_BLOCK_NAME = "hljs-ln-code",
    NUMBERS_BLOCK_NAME = "hljs-ln-numbers",
    NUMBER_LINE_NAME = "hljs-ln-n",
    DATA_ATTR_NAME = "data-line-number",
    BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

  if (hljs) {
    initLineNumbersOnLoad();
    addStyles();
  } else {
    console.error("highlight.js not detected!");
  }

  function isHljsLnCodeDescendant(domElt: HTMLElement): boolean {
    let curElt: HTMLElement | null = domElt;
    while (curElt) {
      if (curElt.className && curElt.className.indexOf("hljs-ln-code") !== -1) {
        return true;
      }
      curElt = curElt.parentNode as HTMLElement;
    }
    return false;
  }

  function getHljsLnTable(hljsLnDomElt: HTMLElement): HTMLTableElement {
    let curElt: HTMLElement | null = hljsLnDomElt;
    while (curElt.nodeName !== "TABLE") {
      curElt = curElt.parentNode as HTMLElement;
    }
    return curElt as HTMLTableElement;
  }

  // Function to workaround a copy issue with Microsoft Edge.
  // Due to hljs-ln wrapping the lines of code inside a <table> element,
  // itself wrapped inside a <pre> element, windowindow.getSelection().toString()
  // does not contain any line breaks. So we need to get them back using the
  // rendered code in the DOM as reference.
  function edgeGetSelectedCodeLines(selection: Selection): string {
    // current selected text without line breaks
    const selectionText = selection.toString();

    // get the <td> element wrapping the first line of selected code
    let tdAnchor: HTMLElement | null = selection.anchorNode as HTMLElement;
    while (tdAnchor.nodeName !== "TD") {
      tdAnchor = tdAnchor.parentNode as HTMLElement;
    }

    // get the <td> element wrapping the last line of selected code
    let tdFocus: HTMLElement | null = selection.focusNode as HTMLElement;
    while (tdFocus.nodeName !== "TD") {
      tdFocus = tdFocus.parentNode as HTMLElement;
    }

    // extract line numbers
    let firstLineNumber = parseInt(tdAnchor.dataset.lineNumber!);
    let lastLineNumber = parseInt(tdFocus.dataset.lineNumber!);

    // multi-lines copied case
    if (firstLineNumber != lastLineNumber) {
      let firstLineText = tdAnchor.textContent!;
      let lastLineText = tdFocus.textContent!;

      // if the selection was made backward, swap values
      if (firstLineNumber > lastLineNumber) {
        let tmp: string | number = firstLineNumber;
        firstLineNumber = lastLineNumber;
        lastLineNumber = tmp;
        tmp = firstLineText;
        firstLineText = lastLineText;
        lastLineText = tmp;
      }

      // discard not copied characters in first line
      while (selectionText.indexOf(firstLineText) !== 0) {
        firstLineText = firstLineText.slice(1);
      }

      // discard not copied characters in last line
      while (selectionText.lastIndexOf(lastLineText) === -1) {
        lastLineText = lastLineText.slice(0, -1);
      }

      // reconstruct and return the real copied text
      let selectedText = firstLineText;
      const hljsLnTable = getHljsLnTable(tdAnchor);
      for (let i = firstLineNumber + 1; i < lastLineNumber; ++i) {
        const codeLineSel = format('.{0}[{1}="{2}"]', [
          CODE_BLOCK_NAME,
          DATA_ATTR_NAME,
          i,
        ]);
        const codeLineElt = hljsLnTable.querySelector(
          codeLineSel
        ) as HTMLElement;
        selectedText += "\n" + codeLineElt.textContent;
      }
      selectedText += "\n" + lastLineText;
      return selectedText;
      // single copied line case
    } else {
      return selectionText;
    }
  }

  // ensure consistent code copy/paste behavior across all browsers
  // (see https://github.com/wcoder/highlightjs-line-numbers.js/issues/51)
  document.addEventListener("copy", function (e) {
    // get current selection
    const selection = window.getSelection();
    // override behavior when one wants to copy line of codes
    if (
      selection &&
      isHljsLnCodeDescendant(selection.anchorNode as HTMLElement)
    ) {
      let selectionText: string;
      // workaround an issue with Microsoft Edge as copied line breaks
      // are removed otherwise from the selection string
      if (window.navigator.userAgent.indexOf("Edge") !== -1) {
        selectionText = edgeGetSelectedCodeLines(selection);
      } else {
        // other browsers can directly use the selection string
        selectionText = selection.toString();
      }
      e.clipboardData!.setData("text/plain", selectionText);
      e.preventDefault();
    }
  });

  function addStyles() {
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = format(
      ".{0}{border-collapse:collapse}" +
        ".{0} td{padding:0}" +
        ".{1}:before{content:attr({2})}",
      [TABLE_NAME, NUMBER_LINE_NAME, DATA_ATTR_NAME]
    );
    document.getElementsByTagName("head")[0].appendChild(css);
  }

  function initLineNumbersOnLoad(options?: LineNumbersOptions) {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      documentReady(options);
    } else {
      window.addEventListener("DOMContentLoaded", function () {
        documentReady(options);
      });
    }
  }

  function documentReady(options?: LineNumbersOptions) {
    try {
      const blocks = document.querySelectorAll("code.hljs,code.nohighlight");

      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (!isPluginDisabledForBlock(block)) {
          lineNumbersBlock(block as HTMLElement, options);
        }
      }
    } catch (e) {
      console.error("LineNumbers error: ", e);
    }
  }

  function isPluginDisabledForBlock(element: Element): boolean {
    return element.classList.contains("nohljsln");
  }

  function lineNumbersBlock(
    element: HTMLElement,
    options?: LineNumbersOptions
  ) {
    if (typeof element !== "object") return;

    async(function () {
      element.innerHTML = lineNumbersInternal(element, options);
    });
  }

  function lineNumbersInternal(
    element: HTMLElement,
    options?: LineNumbersOptions
  ): string {
    const internalOptions = mapOptions(element, options);

    duplicateMultilineNodes(element);

    return addLineNumbersBlockFor(element.innerHTML, internalOptions);
  }

  function addLineNumbersBlockFor(
    inputHtml: string,
    options: LineNumbersOptions
  ): string {
    const lines = getLines(inputHtml);

    // if last line contains only carriage return remove it
    if (lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    if (lines.length > 1 || options.singleLine) {
      let html = "";

      for (let i = 0, l = lines.length; i < l; i++) {
        html += format(
          "<tr>" +
            '<td class="{0} {1}" {3}="{5}">' +
            '<div class="{2}" {3}="{5}"></div>' +
            "</td>" +
            '<td class="{0} {4}" {3}="{5}">' +
            "{6}" +
            "</td>" +
            "</tr>",
          [
            LINE_NAME,
            NUMBERS_BLOCK_NAME,
            NUMBER_LINE_NAME,
            DATA_ATTR_NAME,
            CODE_BLOCK_NAME,
            i + options.startFrom!,
            lines[i].length > 0 ? lines[i] : " ",
          ]
        );
      }

      return format('<table class="{0}">{1}</table>', [TABLE_NAME, html]);
    }

    return inputHtml;
  }

  /**
   * @param {HTMLElement} element Code block.
   * @param {Object} options External API options.
   * @returns {Object} Internal API options.
   */
  function mapOptions(
    element: HTMLElement,
    options?: LineNumbersOptions
  ): LineNumbersOptions {
    options = options || {};
    return {
      singleLine: getSingleLineOption(options),
      startFrom: getStartFromOption(element, options),
    };
  }

  function getSingleLineOption(options?: LineNumbersOptions): boolean {
    const defaultValue = false;
    if (!!options && options.singleLine !== undefined) {
      return options.singleLine;
    }
    return defaultValue;
  }

  function getStartFromOption(
    element: HTMLElement,
    options?: LineNumbersOptions
  ): number {
    const defaultValue = 1;
    let startFrom = defaultValue;

    if (options && options.startFrom && isFinite(options.startFrom)) {
      startFrom = options.startFrom;
    }

    // can be overridden because local option is priority
    const value = getAttribute(element, "data-ln-start-from");
    if (value !== null) {
      startFrom = toNumber(value, defaultValue);
    }

    return startFrom;
  }

  /**
   * Recursive method for fix multi-line elements implementation in highlight.js
   * Doing deep passage on child nodes.
   * @param {HTMLElement} element
   */
  function duplicateMultilineNodes(element: HTMLElement) {
    const nodes = element.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      const child = nodes[i] as HTMLElement;
      if (getLinesCount(child.textContent!) > 0) {
        if (child.childNodes.length > 0) {
          duplicateMultilineNodes(child);
        } else {
          duplicateMultilineNode(child.parentNode! as HTMLElement);
        }
      }
    }
  }

  /**
   * Method for fix multi-line elements implementation in highlight.js
   * @param {HTMLElement} element
   */
  function duplicateMultilineNode(element: HTMLElement) {
    const className = element.className;

    if (!/hljs-/.test(className)) return;

    const lines = getLines(element.innerHTML);

    let result = "";
    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i].length > 0 ? lines[i] : " ";
      result += format('<span class="{0}">{1}</span>\n', [className, lineText]);
    }

    element.innerHTML = result.trim();
  }

  function getLines(text: string): string[] {
    if (text.length === 0) return [];
    return text.split(BREAK_LINE_REGEXP);
  }

  function getLinesCount(text: string): number {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
  }

  ///
  /// HELPERS
  ///

  function async(func: () => void) {
    window.setTimeout(func, 0);
  }

  /**
   * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
   * @param {string} format
   * @param {array} args
   */
  function format(format: string, args: (string | number)[]) {
    return format.replace(/\{(\d+)\}/g, function (m, n) {
      return args[n] !== undefined ? args[n].toString() : m;
    });
  }

  /**
   * @param {HTMLElement} element Code block.
   * @param {String} attrName Attribute name.
   * @returns {String} Attribute value or empty.
   */
  function getAttribute(element: HTMLElement, attrName: string): string | null {
    return element.hasAttribute(attrName)
      ? element.getAttribute(attrName)
      : null;
  }

  /**
   * @param {String} str Source string.
   * @param {Number} fallback Fallback value.
   * @returns Parsed number or fallback value.
   */
  function toNumber(str: string, fallback: number): number {
    if (!str) return fallback;
    const number = Number(str);
    return isFinite(number) ? number : fallback;
  }
};

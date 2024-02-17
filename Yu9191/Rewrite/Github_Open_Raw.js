// ==UserScript==
// @name         GitHub Raw Link Opener
// @namespace    ios151
// @version      2.6
// @description  增强 GitHub 的原始链接按钮,以及 ScriptHub 按钮
// @author       感谢Key,小一
// @match        https://github.com/*
// ==/UserScript==

(function () {
  "use strict";
  setTimeout(function () {
    const isBlobPage = window.location.pathname.includes("/blob/");
    if (document.readyState === "complete" ||(document.readyState !== "loading" && isBlobPage)) {
      init();
    } else { document.addEventListener("DOMContentLoaded", function () {
        init();
      });
    };

    function init() {
      if (isBlobPage) {
        //按钮（放在右侧）可以自行更改
        const rawButton = createButton("打开 Raw", openRawLink);
        document.body.appendChild(rawButton);
        const scriptHubButton = createButton(
          "打开 ScriptHub",
          openScriptHubLink
        );
        document.body.appendChild(scriptHubButton);
      }
    }

    function createButton(text, clickHandler) {
      const button = document.createElement("button");
      button.innerHTML = text;
      button.style.position = "fixed";
      button.style.backgroundColor = "#30303355";
      button.style.color = "#eeeeee";
      button.style.border = "none";
      button.style.padding = "8px 16px";
      button.style.borderRadius = "16px";
      button.style.cursor = "pointer";

      // 将 Raw 按钮放在右侧
      if (text === "打开 Raw") {
        button.style.right = "20px";
        button.style.bottom = "50px"; // 上移一些以适应页面
      }

      // 将 ScriptHub 按钮放在左侧
      if (text === "打开 ScriptHub") {
        button.style.left = "20px";
        button.style.bottom = "50px"; // 上移一些以适应页面
      }

      button.addEventListener("click", clickHandler);
      return button;
    }

    function openRawLink() {
        // 提取
        const rawUrl = window.location.href.replace("/blob", "").replace("github.com", "raw.githubusercontent.com");
        window.open(rawUrl, "_blank");
    }

    function openScriptHubLink() {
        const rawUrl = window.location.href
        .replace("/blob", "")
        .replace("github.com", "raw.githubusercontent.com");
        // 生成 ScriptHub 链接
        const scriptHubUrl = `http://script.hub/convert/_start_/${rawUrl}/_end_/plain.txt?type=plain-text&target=plain-text`;
        window.open(scriptHubUrl, "_blank");
    }
  }, 600);
})();



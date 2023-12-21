import html2pdf from "html-to-pdf-js";
export const downloadJs = () => {
  if (!window) return;
  const doc = document.getElementById("toPrint");
  if (!doc) return;
  html2pdf(doc);
};

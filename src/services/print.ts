import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
export const downloadJs = () => {
  if (!window) return;
  const element = document.getElementById("toPrint");
  if (!element) return;
  const doc = new jsPDF();
  toPng(element).then(function (dataUrl) {
    const img = new Image();
    img.src = dataUrl;
    doc.addImage(img, -40, 10, 293, img.height);
    doc.save();
    return;
  });
};

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Barchart from "./Barchart";
import Piechart from "./Piechart";

const PdfExport = ({ analyzedComments }) => {
  const pdfRef = useRef(null);
  const [showPdfView, setShowPdfView] = useState(false);

  const handleDownloadPDF = () => {
  setShowPdfView(true);

  setTimeout(() => {
    const input = pdfRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight], // custom height
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("grafik-analisis-sentimen.pdf");
      setShowPdfView(false);
    });
  }, 1000); // beri waktu render
};


  return (
    <>
      {showPdfView && (
        <div
          ref={pdfRef}
          className="p-4 bg-white text-black w-[794px] h-auto"
          style={{ backgroundColor: "white", color: "black" }}
        >
          <h2 className="font-semibold mb-4 text-lg">Grafik Analisis Sentimen</h2>

          <div style={{ width: "100%", height: 300 }}>
            <Barchart data={analyzedComments} />
          </div>

          <div style={{ marginTop: "30px", width: "100%", height: 300 }}>
            <Piechart data={analyzedComments} />
          </div>
        </div>
      )}

      <button className="button-download-pdf" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </>
  );
};

export default PdfExport;

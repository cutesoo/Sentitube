import React from "react";

export default function Analysis() {
  return (
    <div className="welcome">
      <h1 className="heading">Analysis Video</h1>
      <p className="sub-heading">Masukkan tautan video youtube di bawah</p>
      <input type="text" />
      <button className="button-analysis">Analysis</button>
      <div className="daftar-komentar">
        <p>Daftar Komentar</p>
        <div className="kotak-komentar"></div>
      </div>
      <div className="hasil-analisis"></div>
      <h1>Hasil Analisis Video</h1>
      <div className="container-hasil">
        <span>
          <p>Grafik Hasil Analisis</p>
          <div className="kotak"></div>
          <button className="button-download-pdf">Download PDF</button>
        </span>
        <span>
          <p>Summary Analysis</p>
          <div className="kotak"></div>
          <button className="button-download-csv">Download CSV</button>
        </span>
      </div>
    </div>
  );
}

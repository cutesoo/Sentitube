import React, { useState } from "react";
import SentimentList from "./SentimentList";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
import WordCloudComponent from "./WordCloudComponent";
import PdfExport from "./PdfExport";


export default function Analysis({ postLink, ResultAnalysis }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url.trim()) {
      setLoading(true);
      await postLink({ video_url: url });
      setLoading(false);
    }
  };

  // POSITIF
  const positiveComments = ResultAnalysis.filter(
    (item) => item.Sentiment === "positif"
  )
    .map((item) => item.Cleaned)
    .join(" ")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const positiveFreq = {};
  positiveComments.forEach((word) => {
    if (word.length > 1) {
      positiveFreq[word] = (positiveFreq[word] || 0) + 1;
    }
  });

  const positiveWords = Object.entries(positiveFreq).map(([text, value]) => ({
    text,
    value,
  }));

  // NEGATIF
  const negativeComments = ResultAnalysis.filter(
    (item) => item.Sentiment === "negatif"
  )
    .map((item) => item.Cleaned)
    .join(" ")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const negativeFreq = {};
  negativeComments.forEach((word) => {
    if (word.length > 1) {
      negativeFreq[word] = (negativeFreq[word] || 0) + 1;
    }
  });

  const negativeWords = Object.entries(negativeFreq).map(([text, value]) => ({
    text,
    value,
  }));

  // NETRAL
  const netralComments = ResultAnalysis.filter(
    (item) => item.Sentiment === "netral"
  )
    .map((item) => item.Cleaned)
    .join(" ")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const netralFreq = {};
  netralComments.forEach((word) => {
    if (word.length > 1) {
      netralFreq[word] = (netralFreq[word] || 0) + 1;
    }
  });

  const netralWords = Object.entries(netralFreq).map(([text, value]) => ({
    text,
    value,
  }));

  return (
    <div className="welcome">
      <h1 className="heading">Analysis Video</h1>
      <p className="sub-heading">Masukkan tautan video YouTube di bawah</p>

      <form className="form-grup" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Masukkan link YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="button-analysis" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Analysis"}
        </button>
      </form>

      {!loading && ResultAnalysis && ResultAnalysis.length > 0 && (
        <div>
          <div className="daftar-komentar">
            <p>Daftar Komentar</p>
            <div className="kotak-komentar scroll">
              <SentimentList data={ResultAnalysis} />
            </div>
          </div>

          <h1>Hasil Analisis Video</h1>
          <div className="container-hasil">
            <span>
              <p>Grafik Hasil Analisis</p>
              <div className="kotak">
                <Barchart data={ResultAnalysis} />
              </div>
            </span>

            <span>
              <p>Summary Analysis</p>
              <div className="kotak">
                <Piechart data={ResultAnalysis} />
              </div>
            </span>
          </div>

          <div className="word-cloud">
            <h1>Wordcloud Sentimen</h1>
            <div className="wordcloud-sentiment">
              <div>
                <p>Positif</p>
                <div className="isi">
                  <WordCloudComponent
                    className="wordscloud"
                    words={positiveWords}
                  />
                </div>
              </div>
              <div>
                <p>Negatif</p>
                <div className="isi">
                  <WordCloudComponent
                    className="wordscloud"
                    words={negativeWords}
                  />
                </div>
              </div>
              <div>
                <p>Netral</p>
                <div className="isi">
                  <WordCloudComponent
                    className="wordscloud"
                    words={netralWords}
                  />
                </div>
              </div>
              {/* <button className="button-download-pdf">Download PDF</button> */}
              <PdfExport
                analyzedComments={ResultAnalysis}
                wordcloudImageURL="/wordcloud-example.png"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

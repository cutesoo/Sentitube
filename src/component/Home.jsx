import React, { useRef, useEffect, useState } from "react";
import SentimentList from "./SentimentList";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
import WordCloudComponent from "./WordCloudComponent";
import PdfExport from "./PdfExport";

export default function Home({
  searchVideo,
  videoResults,
  postLink,
  ResultAnalysis,
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [analyzingId, setAnalyzingId] = useState(null);
  const analysisRef = useRef(null);

  useEffect(() => {
    if (selectedVideoId && ResultAnalysis?.[selectedVideoId] && !analyzingId) {
      analysisRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedVideoId, ResultAnalysis, analyzingId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      searchVideo(searchKeyword);
    }
  };

  const handleAnalyze = async (video_id) => {
    try {
      setSelectedVideoId(video_id);
      setAnalyzingId(video_id);

      const youtubeUrl = `https://www.youtube.com/watch?v=${video_id}`;
      await postLink({ video_url: youtubeUrl, video_id });

      setAnalyzingId(null);
    } catch (error) {
      console.error("Gagal menganalisis:", error);
      setAnalyzingId(null);
    }
  };

  const comments = ResultAnalysis?.[selectedVideoId] || [];

  // WordCloud data (Positif, Negatif, Netral)
  const generateWordFreq = (sentiment) => {
    const words = comments
      .filter((item) => item.Sentiment === sentiment)
      .map((item) => item.Cleaned)
      .join(" ")
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    const freq = {};
    words.forEach((word) => {
      if (word.length > 1) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });

    return Object.entries(freq).map(([text, value]) => ({ text, value }));
  };

  const positiveWords = generateWordFreq("positif");
  const negativeWords = generateWordFreq("negatif");
  const netralWords = generateWordFreq("netral");

  return (
    <div className="welcome">
      <h1 className="heading">
        Selamat Datang di Analisis Sentimen Konten Youtube
      </h1>
      <p className="sub-heading">
        Analisis sekarang dan temukan Konten YouTube yang lebih bermanfaat
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-search">
          <input
            type="search"
            id="cari-konten"
            placeholder="Cari Video Youtube"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="button-home" type="submit">
            Cari
          </button>
        </div>
      </form>

      <div>
        {videoResults === undefined || videoResults === null ? (
          <p>Silakan cari video terlebih dahulu.</p>
        ) : videoResults.length === 0 ? (
          <p></p>
        ) : (
          <ul className="video-list">
            {videoResults.map((video) => (
              <li className="video-card" key={video.video_id}>
                <img src={video.thumbnail} alt={video.title} />
                <p>{video.title}</p>
                <p>{video.channel_title}</p>
                <p>{video.published_at}</p>
                <button onClick={() => handleAnalyze(video.video_id)}>
                  Analisis
                </button>
                {selectedVideoId === video.video_id &&
                  analyzingId === video.video_id && (
                    <div className="loading">
                      <p>Loading...</p>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedVideoId && !analyzingId && ResultAnalysis?.[selectedVideoId] && (
        <div ref={analysisRef} className="hasil-analisis-wrapper">
          <div className="daftar-komentar">
            <p>Daftar Komentar</p>
            <div className="kotak-komentar scroll">
              <SentimentList data={comments} />
            </div>
          </div>

          <div className="hasil-analisis">
            <h1>Hasil Analisis Video</h1>
            <div className="container-hasil">
              <span>
                <p>Grafik Hasil Analisis</p>
                <div className="kotak">
                  <Barchart data={comments} />
                </div>
              </span>

              <span>
                <p>Summary Analysis</p>
                <div className="kotak">
                  <Piechart data={comments} />
                </div>
              </span>
            </div>
          </div>

          <div className="word-cloud">
            <h1>Wordcloud Sentimen</h1>
            <div className="wordcloud-sentiment">
              <div>
                <p>Positif</p>
                <div className="isi">
                  <WordCloudComponent words={positiveWords} />
                </div>
              </div>
              <div>
                <p>Negatif</p>
                <div className="isi">
                  <WordCloudComponent words={negativeWords} />
                </div>
              </div>
              <div>
                <p>Netral</p>
                <div className="isi">
                  <WordCloudComponent words={netralWords} />
                </div>
              </div>
              <span className="download-pdf-container">
                <PdfExport
                  analyzedComments={comments}
                  wordcloudImageURL="/wordcloud-example.png"
                  className="download-pdf-button-home"
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

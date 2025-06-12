import React, { useRef, useEffect, useState } from "react";
import SentimentList from "./SentimentList";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
import WordCloudFromComments from "./WordCloudComments";

export default function Home({
  searchVideo,
  videoResults,
  postLink,
  ResultAnalysis,
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [analyzingId, setAnalyzingId] = useState(null);
  const analysisRef = useRef(null); // <-- ref untuk scroll otomatis

  useEffect(() => {
    // Scroll ke bawah saat hasil analisis muncul
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

      {/* Bagian hasil analisis tampil di bawah semua video */}
      {selectedVideoId && !analyzingId && ResultAnalysis?.[selectedVideoId] && (
        <div ref={analysisRef} className="hasil-analisis-wrapper">
          <div className="daftar-komentar">
            <p>Daftar Komentar</p>
            <div className="kotak-komentar scroll">
              <SentimentList data={ResultAnalysis[selectedVideoId]} />
            </div>
          </div>

          <div className="hasil-analisis">
            <h1>Hasil Analisis Video</h1>
            <div className="container-hasil">
              <div>
                <p>Grafik Hasil Analisis</p>
                <div className="kotak">
                  <Barchart data={ResultAnalysis[selectedVideoId]} />
                </div>
                <button className="button-download-pdf">Download PDF</button>
              </div>
              <div>
                <p>Summary Analysis</p>
                <div className="kotak">
                  <Piechart data={ResultAnalysis[selectedVideoId]} />
                </div>
                <button className="button-download-csv">Download CSV</button>
              </div>
            </div>
          </div>

          <div className="word-cloud">
            <h1>Wordcloud Sentimen</h1>
            <div className="wordcloud-sentiment">
              <div>
                <p>Positif</p>
                <WordCloudFromComments
                  comments={ResultAnalysis[selectedVideoId].comments.filter(
                    (c) => c.Sentiment === "positif"
                  )}
                />
              </div>
              <div>
                <p>Negatif</p>
                <WordCloudFromComments
                  comments={ResultAnalysis[selectedVideoId].comments.filter(
                    (c) => c.Sentiment === "negatif"
                  )}
                />
              </div>
              <div>
                <p>Netral</p>
                <WordCloudFromComments
                  comments={ResultAnalysis[selectedVideoId].comments.filter(
                    (c) => c.Sentiment === "netral"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

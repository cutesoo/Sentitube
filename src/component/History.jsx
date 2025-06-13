import React from "react";
import { useState, useEffect } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="welcome">
      <h1>Riwayat Analisis</h1>
      {history.length === 0 ? (
        <p>Belum ada riwayat</p>
      ) : (
        history.map((item, index) => (
          <div className="konten-teratas" key={index}>
            <p>
              <strong>Video:</strong>{" "}
              <a href={item.video_url} target="_blank" rel="noreferrer">
                {item.video_url}
              </a>
            </p>
            <p>
              <strong>Ringkasan:</strong> {item.summary}
            </p>
            <p>
              <strong>Waktu:</strong>{" "}
              {new Date(item.timestamp).toLocaleString("id-ID")}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
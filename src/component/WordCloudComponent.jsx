import React, { forwardRef, useCallback, useMemo } from "react";
import WordCloud from "react-d3-cloud";

const MAX_FONT_SIZE = 40; // Maksimal ukuran font
const MIN_FONT_SIZE = 12; // Minimal ukuran font
const MAX_FONT_WEIGHT = 700;
const MIN_FONT_WEIGHT = 400;
const MAX_WORDS = 150; // Maksimal jumlah kata yang ditampilkan

export const WordCloudComponent = forwardRef(
  ({ words, width = 300, height = 300 }, ref) => {
    // Validasi dan filter data yang masuk
    const safeWords = useMemo(() => {
      if (!Array.isArray(words)) return [];
      return words
        .filter(
          (w) =>
            typeof w?.text === "string" &&
            w.text.trim() !== "" &&
            typeof w?.value === "number" &&
            !isNaN(w.value)
        )
        .sort((a, b) => b.value - a.value)
        .slice(0, MAX_WORDS);
    }, [words]);

    // Cari nilai min dan max dari value kata
    const [minOccurences, maxOccurences] = useMemo(() => {
      const min = Math.min(...safeWords.map((w) => w.value));
      const max = Math.max(...safeWords.map((w) => w.value));
      return [min, max];
    }, [safeWords]);

    // Hitung ukuran font berdasarkan frekuensi
    const calculateFontSize = useCallback(
      (value) => {
        const normalized =
          (value - minOccurences) / (maxOccurences - minOccurences || 1);
        return Math.round(
          MIN_FONT_SIZE + normalized * (MAX_FONT_SIZE - MIN_FONT_SIZE)
        );
      },
      [minOccurences, maxOccurences]
    );

    // Hitung ketebalan font berdasarkan frekuensi
    const calculateFontWeight = useCallback(
      (value) => {
        const normalized =
          (value - minOccurences) / (maxOccurences - minOccurences || 1);
        return Math.round(
          MIN_FONT_WEIGHT + normalized * (MAX_FONT_WEIGHT - MIN_FONT_WEIGHT)
        );
      },
      [minOccurences, maxOccurences]
    );

    return (
      <div ref={ref} style={{ width: "100%", height }}>
        {safeWords.length > 0 ? (
          <WordCloud
            width={width}
            height={height}
            font="Poppins"
            fontWeight={(word) => calculateFontWeight(word.value)}
            data={safeWords}
            rotate={0}
            padding={1}
            fontSize={(word) => calculateFontSize(word.value)}
            random={() => 0.5}
          />
        ) : (
          <p style={{ textAlign: "center", paddingTop: "2rem" }}>
            Tidak ada data untuk ditampilkan.
          </p>
        )}
      </div>
    );
  }
);

WordCloudComponent.displayName = "WordCloud";
export default WordCloudComponent;

import React, { forwardRef, useCallback, useMemo } from "react";
import WordCloud from "react-d3-cloud";

const MAX_FONT_SIZE = 40; // dikecilkan agar banyak kata tetap muat
const MIN_FONT_SIZE = 12;
const MAX_FONT_WEIGHT = 700;
const MIN_FONT_WEIGHT = 400;
const MAX_WORDS = 150; // tetap banyak kata

export const WordCloudComponent = forwardRef(({ words, width = 300, height = 300 }, ref) => {
  const sortedWords = useMemo(
    () => words.sort((a, b) => b.value - a.value).slice(0, MAX_WORDS),
    [words]
  );

  const [minOccurences, maxOccurences] = useMemo(() => {
    const min = Math.min(...sortedWords.map((w) => w.value));
    const max = Math.max(...sortedWords.map((w) => w.value));
    return [min, max];
  }, [sortedWords]);

  const calculateFontSize = useCallback(
    (value) => {
      const normalized = (value - minOccurences) / (maxOccurences - minOccurences || 1);
      return Math.round(MIN_FONT_SIZE + normalized * (MAX_FONT_SIZE - MIN_FONT_SIZE));
    },
    [minOccurences, maxOccurences]
  );

  const calculateFontWeight = useCallback(
    (value) => {
      const normalized = (value - minOccurences) / (maxOccurences - minOccurences || 1);
      return Math.round(MIN_FONT_WEIGHT + normalized * (MAX_FONT_WEIGHT - MIN_FONT_WEIGHT));
    },
    [minOccurences, maxOccurences]
  );

  return (
    <div ref={ref} style={{ width: "100%", height }}>
      <WordCloud
        width={width}
        height={height}
        font="Poppins"
        fontWeight={(word) => calculateFontWeight(word.value)}
        data={sortedWords}
        rotate={0}
        padding={1}
        fontSize={(word) => calculateFontSize(word.value)}
        random={() => 0.5}
      />
    </div>
  );
});

WordCloudComponent.displayName = "WordCloud";
export default WordCloudComponent;

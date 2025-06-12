export default function SentimentList({ data }) {
  return (
    <div className="sentiment-list">
      {data.map((item, index) => (
        <div className="comment-card" key={index}>
          <p>
            <strong>User:</strong> {item.Username}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {item.Date
              ? new Date(item.Date).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "-"}
          </p>
          <p>
            <strong>Comment:</strong> {item.Comment}
          </p>
          <p>
            <strong>Sentiment:</strong>{" "}
            <span
              style={{
                color:
                  item.Sentiment === "positif"
                    ? "green"
                    : item.Sentiment === "negatif"
                    ? "red"
                    : "gray",
              }}
            >
              {item.Sentiment}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
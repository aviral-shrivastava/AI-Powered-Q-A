import React, { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState(""); //State to give questions
  const [answer, setAnswer] = useState(""); //State to show answer
  const [history, setHistory] = useState([]);  //State to store the history of questions and answers
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const handleAsk = async () => {  //Function to handle ask operation
    if (!question.trim()) return;

    setIsLoading(true); // Show spinner when request starts
    try {
      const response = await fetch("http://localhost:8000/ask", {  // Call the API (POST)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }), //Converting the question to JSON
      });
      const data = await response.json();
      setAnswer(data.answer);
      fetchHistory();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide spinner when request completes
    }
  };

  const fetchHistory = async () => { //Function to update the history option
    try {
      const response = await fetch("http://localhost:8000/history"); //Call the API (GET)
      const data = await response.json();
      setHistory(data.history);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);




  return (  //CSS and styling part
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        color: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "20px" }}>
        AI-Powered Q&A
      </h1>
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #333",
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
          }}
        />
        <button
          onClick={handleAsk}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            border: "none",
            cursor: "pointer",
          }}
        >
          Ask
        </button>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {isLoading ? ( 
          <div
            style={{
              border: "4px solid #FFFFFF",
              borderTop: "4px solid #007BFF",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              margin: "auto",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        ) : (
          answer && (
            <p>
              <strong>Answer:</strong> {answer}
            </p>
          )
        )}
      </div>
      <div
        style={{
          width: "80%",
          backgroundColor: "#1E1E1E",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
        }}
      >
        <h3 style={{ borderBottom: "2px solid #007BFF", paddingBottom: "10px" }}>
          History
        </h3>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
          {history.map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#2A2A2A",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.4)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  marginBottom: "10px",
                  color: "#00FFAA",
                }}
              >
                <strong>Q:</strong> {item.question}
              </p>
              <p style={{ margin: 0, color: "#FFFFFF" }}>
                <strong>A:</strong> {item.answer}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default App;

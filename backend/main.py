from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
import sqlite3
import cohere

app = FastAPI() # Initialize FastAPI app


app.add_middleware( # Configure CORS (To connect the front and backend as both are running on different servers on localhost)
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


cohere_api_key = "abBuJ3eoQK8UZRuNrpQ8dzX9y2E7kK6DQekvr8FG"  # API key for cohere
co = cohere.Client(cohere_api_key)


conn = sqlite3.connect("responses.db", check_same_thread=False) # Initialize SQLite database to store the history
cursor = conn.cursor()
cursor.execute("""   
CREATE TABLE IF NOT EXISTS responses ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT
)
""")
conn.commit()  #creating the required table for storage


class Question(BaseModel):  #class to define the structure of the question
    question: str

    # Validator to ensure input is valid
    @validator("question")
    def validate_question(cls, value):
        if not value.strip():
            raise ValueError("Question cannot be empty or whitespace.")
        if len(value) > 500:
            raise ValueError("Question is too long. Please limit it to 500 characters.")
        return value

@app.get("/health")  #to check the health of the backend
def health_check():
    """
    A basic health-check endpoint to ensure the backend is running.
    """
    return {"status": "ok", "message": "Backend is running"}


@app.post("/ask")   #post request to ask a question
def ask_question(question: Question):
    try:
        
        response = co.generate(  #creating a response using cohere API
            model='command-r-plus-04-2024',  #  model name for cohere
            prompt=f"Answer the following question concisely: {question.question}",
            max_tokens=100,  
            temperature=0.7,  #temperature setting 
            stop_sequences=["\n"]  
        )

        
        answer = response.generations[0].text.strip()  # Get the answer from Cohere API response

        
        cursor.execute("INSERT INTO responses (question, answer) VALUES (?, ?)", (question.question, answer))  # Store in the database
        conn.commit()

        return {"question": question.question, "answer": answer}
    
    
    except Exception as e:  #If there is any issue while fetching aresponse from the api (such as incorrect api key or wrong model has been chosen)
        print(f"Error during processing: {e}")  
        raise HTTPException(status_code=500, detail=f"Error generating response: {e}")


@app.get("/history") # GET request from the backend to fetch the history of questions
def get_history():
    cursor.execute("SELECT question, answer FROM responses")
    history = cursor.fetchall()
    return {"history": [{"question": q, "answer": a} for q, a in history]}

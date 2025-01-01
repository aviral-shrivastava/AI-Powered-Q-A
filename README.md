
# AI-Powered Q&A Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Application Locally](#running-the-application-locally)
- [AI Service Details](#ai-service-details)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction
This project is an AI-powered Q&A application designed to deliver intelligent answers to user queries. The backend is built with FastAPI, and the frontend leverages React for a seamless user experience. The application utilizes an AI service to process and respond to user queries effectively.

## Features
- Natural Language Understanding (NLU) for accurate question interpretation.
- Instant responses powered by AI.
- Simple and user-friendly interface.

## Technologies Used
- **Backend**: FastAPI
- **Frontend**: React
- **AI Service**: Cohere

## Setup and Installation
Follow these steps to set up and run the application on your local machine.

### Prerequisites
Ensure you have the following installed on your system:
- Python 3.8+
- Node.js 16+
- npm or Yarn
- Git

### Steps
1. Clone the repository:
   ```terminal
   git clone https://github.com/your-username/ai-qa-app.git
   cd ai-qa-app
   ```

2. Set up the backend:
   ```terminal
   cd backend
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```terminal
   cd ../frontend
   npm install
   ```

4. Configure the AI service API key:
   - Create a `.env` file in the `backend` directory.
   - Add the following line:
     ```env
     AI_API_KEY=your_api_key_here
     ```

## Running the Application Locally

1. Start the backend server:
   ```terminal
   cd backend
   uvicorn main:app --reload
   ```

   The backend will be available at `http://localhost:8000`.

2. Start the frontend server:
   ```terminal
   cd frontend
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## AI Service Details
This project uses COHERE for its robust natural language processing capabilities. The service was selected for the following reasons:
- High Accuracy: Delivers precise and relevant answers.
- Scalability: Handles large volumes of queries efficiently.
- Ease of Integration: Provides an intuitive API for seamless integration with the backend.
- Cost: It provides numerous api calls in its free model itself

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

<h1 align="center">👁️ EYEGAZE<h1>

EYEGAZE is an innovative web application that leverages eye-tracking technology to provide valuable insights into user behavior and website interaction patterns. This thesis project aims to revolutionize how we understand user engagement with web interfaces by generating detailed heatmaps and analytics based on eye movement data. Additionally, the app will recommend insights using GPT Vision to help improve UI/UX design based on collected gaze data.

---

## 🚀 Technologies Used

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- GazeRecorder API

### Backend
- FastAPI (Python)
- Firebase
- AWS S3
- OpenCV
- NumPy
- Matplotlib
- Gaussian Mixture Model (GMM)
- GPT Vision

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Wavxr/EYEGAZE.git
```

### 2. Frontend Setup
```bash
cd eyegaze-frontend
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd eyegaze-backend
pip install -r requirements.txt
uvicorn src.main:app --reload
```

### 4. Configure Environment Variables
- Create `.env` files in both the frontend and backend directories.
- Set up Firebase credentials.
- Configure AWS S3 access.

---

## 💡 Usage
1. Upload a website screenshot.
2. Share the generated participant link.
3. Collect eye-tracking data from participants.
4. View generated heatmaps and analytics.
5. Analyze user behavior patterns.
6. Receive UI/UX improvement insights based on GPT Vision analysis.

---

## ✨ Features
- **Real-time Eye Tracking** – Capture precise eye movement data using advanced tracking technology.
- **Heatmap Generation** – Visualize user attention patterns through intuitive heatmaps.
- **Analytics Dashboard** – Get a comprehensive overview of user engagement metrics.
- **Multi-Participant Support** – Collect and analyze data from multiple test participants.
- **Secure Data Storage** – Cloud-based storage for website images and session data.
- **Interactive Reports** – Generate detailed reports on user interaction patterns.
- **AI-Driven Insights** – Receive UI/UX recommendations powered by GPT Vision.

---

## 🎓 Thesis Project
This project was developed as part of a thesis research focusing on understanding user behavior through eye-tracking analysis.

### 🏆 Research Team
- **Lead Developer**: John Waver Aguilar (📧 johnwaveraguilar@gmail.com)
- **Research Contributors**:
  - Rolen Christoper Paradeza
  - Kyle Robin Andaya

---

## 📝 Non-Profit Disclaimer
This project is strictly for academic and research purposes. It is a non-profit initiative, and no financial transactions or monetization will be involved.

For more information or inquiries, please contact **johnwaveraguilar@gmail.com**.


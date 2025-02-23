<h1 align="center">👁️ EYEGAZE</h1>

<p>
EYEGAZE is an innovative web application that leverages eye-tracking technology to provide valuable insights into user behavior and website interaction patterns. 
This thesis project aims to revolutionize how we understand user engagement with web interfaces by generating detailed heatmaps and analytics based on eye movement data. 
Additionally, the app will recommend insights using GPT Vision to help improve UI/UX design based on collected gaze data.
</p>

---

<h2>🚀 Technologies Used</h2>

<h3>Frontend</h3>
<ul>
  <li><b>React.js (Vite):</b> Frontend framework for building the UI.</li>
  <li><b>Tailwind CSS:</b> Utility-first CSS framework for styling.</li>
  <li><b>Axios:</b> For handling API requests.</li>
  <li><b>GazeRecorder API:</b> Eye-tracking technology for gaze data collection.</li>
</ul>

<h3>Backend</h3>
<ul>
  <li><b>FastAPI (Python):</b> Lightweight backend framework for API development.</li>
  <li><b>Firebase:</b> For authentication and real-time database storage.</li>
  <li><b>AWS S3:</b> Cloud storage for website images.</li>
  <li><b>OpenCV:</b> Image processing and analysis.</li>
  <li><b>NumPy:</b> Numerical computing for gaze data processing.</li>
  <li><b>Matplotlib:</b> Data visualization for gaze plots.</li>
  <li><b>Gaussian Mixture Model (GMM):</b> Algorithm for clustering eye-tracking data.</li>
  <li><b>GPT Vision:</b> AI-powered insights for UI/UX improvement.</li>
</ul>

---

<h2>⚙️ Setup Instructions</h2>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/Wavxr/EYEGAZE.git</code></pre>

<h3>2. Frontend Setup</h3>
<pre><code>cd eyegaze-frontend
npm install
npm run dev</code></pre>

<h3>3. Backend Setup</h3>
<pre><code>cd eyegaze-backend
pip install -r requirements.txt
uvicorn src.main:app --reload</code></pre>

<h3>4. Configure Environment Variables</h3>
<ul>
  <li>Create <code>.env</code> files in both the frontend and backend directories.</li>
  <li>Set up Firebase credentials.</li>
  <li>Configure AWS S3 access.</li>
</ul>

---

<h2>💡 Usage</h2>
<ol>
  <li>Upload a website screenshot.</li>
  <li>Share the generated participant link.</li>
  <li>Collect eye-tracking data from participants.</li>
  <li>View generated heatmaps and analytics.</li>
  <li>Analyze user behavior patterns.</li>
  <li>Receive UI/UX improvement insights based on GPT Vision analysis.</li>
</ol>

---

<h2>✨ Features</h2>
<ul>
  <li><b>Real-time Eye Tracking:</b> Capture precise eye movement data using advanced tracking technology.</li>
  <li><b>Heatmap Generation:</b> Visualize user attention patterns through intuitive heatmaps.</li>
  <li><b>Analytics Dashboard:</b> Comprehensive overview of user engagement metrics.</li>
  <li><b>Multi-Participant Support:</b> Collect and analyze data from multiple test participants.</li>
  <li><b>Secure Data Storage:</b> Cloud-based storage for website images and session data.</li>
  <li><b>Interactive Reports:</b> Generate detailed reports on user interaction patterns.</li>
  <li><b>AI-Driven Insights:</b> Receive UI/UX recommendations powered by GPT Vision.</li>
</ul>

---

<h2>🎓 Thesis Project</h2>
<p>This project was developed as part of a thesis research focusing on understanding user behavior through eye-tracking analysis.</p>

<h3>🏆 Research Team</h3>
<ul>
  <li><b>Lead Developer:</b> John Waver Aguilar (<a href="mailto:johnwaveraguilar@gmail.com">johnwaveraguilar@gmail.com</a>)</li>
  <li><b>Research Contributors:</b>
    <ul>
      <li>Rolen Christopher Paradeza</li>
      <li>Kyle Robin Andaya</li>
    </ul>
  </li>
</ul>

---

<h2>📝 Non-Profit Disclaimer</h2>
<p>This project is strictly for academic and research purposes. It is a non-profit initiative, and no financial transactions or monetization will be involved.</p>

<p>For more information or inquiries, please contact <b><a href="mailto:johnwaveraguilar@gmail.com">johnwaveraguilar@gmail.com</a></b>.</p>

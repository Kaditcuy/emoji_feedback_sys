# 🧠 Emoji Feedback System (EFS)

##  Overview

The Emoji Feedback System (EFS) is an innovative web application designed to analyze customer sentiments using emojis as tokens.  
By leveraging AI-powered sentiment analysis, EFS enables users to rate restaurants and generate insightful reports, facilitating data-driven decisions for businesses and enhancing user experiences.

🔗 **Live Demo**: [https://emoji-feedback-sys.vercel.app](https://emoji-feedback-sys.vercel.app)

---

##  Features

- **Emoji-Based Sentiment Analysis**: Uses emojis as tokens to assess customer sentiments.
- **Restaurant Rating System**: Allows users to rate their dining experiences.
- **Automated Report Generation**: Produces detailed sentiment reports based on user feedback for registered restaurant admin.
- **User-Friendly Interface**: Intuitive design for seamless interaction.
- **Real-Time Analytics**: Instantaneous processing and feedback.

---

## 🛠️ Technologies Used

- **Frontend**: NextJs
- **Backend**: NextJs App Router
- **Database**: MySQl on Railway
- **AI Model**: Custom-trained sentiment analysis model  
- **Deployment**: Vercel

---

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/emoji-feedback-sys.git
cd emoji-feedback-sys


npm install
mysql -u root -p -e "CREATE DATABASE emoji_feedback;"
mysql -u root -p emoji_feedback < emoji_feedback.sql
npm start

By default, the server runs at http://localhost:8000




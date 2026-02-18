Here’s your updated `README.md` with a clean, dedicated screenshot section. Just paste this into your repo and drop images into a `/screenshots` folder.

````md
# Chatter

A real-time chat application built with Node.js, Express, and Socket.IO.

Chatter enables instant communication between multiple users using WebSockets. It is lightweight, scalable, and serves as a solid foundation for building advanced real-time applications.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 🛠 Prerequisites

Make sure you have **Node.js** installed:

https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
````

---

### 💻 Installation

Clone the repository:

```bash
git clone https://github.com/effazrayhan/Chatter.git
cd Chatter
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

## 🧠 How It Works

* **Express** handles server-side logic and routing.
* **Socket.IO** enables real-time, bidirectional communication.
* When one client sends a message, the server broadcasts it to all connected users instantly.

---

## 🎯 Features

* Real-time messaging
* Instant message broadcasting
* Clean and simple architecture
* Easy to extend with authentication, rooms, or databases

---

## 📸 Screenshots


### Chat Interface

![Chat UI](screenshots/2026-02-18 15-04-05.png)
)
<img width="1366" height="768" alt="Screenshot from 2026-02-18 15-04-05" src="https://github.com/user-attachments/assets/ecd2b169-aac6-4454-ba68-0232a87ac10f" />


<img width="1366" height="768" alt="Screenshot from 2026-02-18 15-04-19" src="https://github.com/user-attachments/assets/ca5cd9c8-1678-4964-b2ee-047df0dd6db7" />
<img width="1366" height="768" alt="Screenshot from 2026-02-18 15-04-33" src="https://github.com/user-attachments/assets/f4337a24-d06b-4581-8b3b-de20d7933a3b" />
## 📁 Project Structure

```
server.js        # Main server file
public/          # Frontend files (HTML, CSS, JS)
package.json     # Project metadata and dependencies
```

---

## 🔮 Future Improvements

* User authentication system
* Private chat rooms
* Persistent chat history (MongoDB / SQLite)
* Typing indicators
* Online/offline status

---


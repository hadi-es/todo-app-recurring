# 📝 Todo App with Recurring Tasks

A minimalist, fast, and elegant todo application with support for recurring tasks, dark mode, and local storage persistence.

![Screenshot](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

✅ **Add, Edit, Delete Tasks** - Full CRUD operations
✅ **Recurring Tasks** - Daily, weekly, or monthly recurring tasks that auto-reset
✅ **Dark Mode** - Toggle between light and dark themes (persisted in localStorage)
✅ **Smart Filtering** - Filter by All, Active, Completed, or Recurring tasks
✅ **Real-time Stats** - Track total, completed, and recurring tasks
✅ **Local Storage** - All data persists in your browser
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **No Dependencies** - Pure vanilla JavaScript + Tailwind CSS
✅ **Fast & Lightweight** - Minimal bundle size

## 🚀 Quick Start

### Option 1: Online (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/hadi-es/todo-app-recurring.git
   cd todo-app-recurring

2. Open index.html in your browser (or use Live Server)

bash
# If you have Python 3
python -m http.server 8000

# If you have Node.js
npx http-server
Open http://localhost:8000 in your browser

Option 2: Try It Online
Deploy on Netlify | Deploy on Vercel

📖 How to Use
Adding a Task
Type your task in the input field
(Optional) Select a recurring option: None, Daily, Weekly, or Monthly
Click "Add Task" or press Enter
Managing Tasks
Complete: Click the checkbox to mark as complete
Edit: Click the pencil icon to edit the task text
Delete: Click the trash icon to remove the task
Filtering
Use the filter buttons to view:

All - All tasks
Active - Incomplete tasks
Completed - Completed tasks
Recurring - Tasks set to repeat
Dark Mode
Click the moon icon in the top right to toggle dark mode. Your preference is saved!

Recurring Tasks
Recurring tasks automatically reset to incomplete based on the frequency:

Daily: Resets every day
Weekly: Resets every 7 days
Monthly: Resets every 30 days
🏗️ Project Structure
Code
todo-app-recurring/
├── index.html       # Main HTML structure
├── styles.css       # Tailwind + custom styles
├── app.js           # Main application logic
├── README.md        # This file
├── .gitignore       # Git ignore rules
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions workflow
💾 Data Storage
All data is stored in your browser's localStorage:

Tasks list
Dark mode preference
No data is sent to any server. Your data is completely private!

🔧 Technologies Used
Vanilla JavaScript - No frameworks or build tools
Tailwind CSS - Utility-first CSS framework (via CDN)
HTML5 - Semantic markup
localStorage API - Client-side data persistence
🎨 Customization
Change Colors
Edit index.html and replace Tailwind color classes:

blue-500 → purple-500, green-500, etc.
Add More Recurring Options
In app.js, modify the recurring select options and logic in checkRecurringTasks().

Disable Dark Mode
Remove the dark mode toggle button from index.html.

📱 Browser Support
Chrome/Edge: ✅ Latest versions
Firefox: ✅ Latest versions
Safari: ✅ Latest versions
Mobile browsers: ✅ All modern versions
Requires localStorage support (available in all modern browsers)

🤝 Contributing
Contributions are welcome! Here's how:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🐛 Found a Bug?
If you find a bug, please create an issue with:

Description of the bug
Steps to reproduce
Expected behavior
Actual behavior
💡 Feature Requests
Have an idea? Create a feature request and we'll discuss it!

🙌 Acknowledgments
Tailwind CSS - Amazing CSS framework
Heroicons - Beautiful SVG icons
📊 Stats
![GitHub stars](https://img.shields.io/github/stars/hadi-es/todo-app-recurring?style=flat) ![GitHub issues](https://img.shields.io/github/issues/hadi-es/todo-app-recurring?style=flat) ![GitHub forks](https://img.shields.io/github/forks/hadi-es/todo-app-recurring?style=flat)

Made with ❤️ by hadi-es

# 📝 Advanced To-Do List Application

A feature-rich, object-oriented to-do list application with persistent storage, priority management, due dates, and data export/import capabilities.

## ✨ Key Features

### Core Functionality
- **Add Tasks**: Create tasks with descriptions, priority levels, and due dates
- **Mark as Done/Pending**: Click on any task to toggle completion status
- **Delete Tasks**: Remove tasks you no longer need
- **Persistent Storage**: All tasks are saved to local storage automatically

### Advanced Features
- **Priority Levels**: Assign Low, Medium, or High priority to each task
  - Visual color coding (Green = Low, Orange = Medium, Red = High)
  - Automatic sorting by priority
  
- **Due Dates**: Set deadlines for your tasks
  - Overdue warnings with visual indicators
  - "Due today" and "Due tomorrow" smart labels
  - Days remaining countdown
  
- **Smart Filtering**: View tasks by status
  - All tasks
  - Pending only
  - Completed only
  
- **Data Export/Import**:
  - Export to JSON format
  - Export to CSV format (Excel compatible)
  - Import from JSON or CSV files
  - Backup and restore your entire task list

- **Real-time Statistics**: Track your productivity
  - Total tasks count
  - Pending tasks
  - Completed tasks

## 🛠️ Technologies Used

- **HTML5**: Modern semantic structure
- **CSS3**: Responsive design with animations
- **JavaScript (ES6+)**: Object-oriented programming
  - Task class for individual tasks
  - ToDoList class for managing collections
  - LocalStorage API for persistence
  - File API for import/export
    
## 🚀 How to Use

### Adding a Task
1. Enter task description in the input box
2. Select priority level (Low/Medium/High)
3. Optionally set a due date
4. Click "Add Task" button

### Managing Tasks
- **Complete**: Click anywhere on the task to mark as done
- **Delete**: Click the × button
- **Filter**: Use All/Pending/Completed buttons to filter view

### Exporting Your Data
1. Click "Export JSON" for a JSON backup file
2. Click "Export CSV" for an Excel-compatible spreadsheet
3. Files will download with the current date in the filename

### Importing Data
1. Click "Import" button
2. Select a previously exported JSON or CSV file
3. Confirm to replace current tasks
4. Your tasks will be restored

## 📊 Priority System

Tasks are automatically sorted by:
1. **Completion status** (pending tasks first)
2. **Priority level** (High → Medium → Low)
3. **Due date** (earliest deadlines first)

### Visual Indicators
- **Green border**: Low priority
- **Orange border**: Medium priority  
- **Red border**: High priority
- **Strike-through**: Completed tasks
- **⚠️ Red text**: Overdue tasks

## 💾 Data Persistence

All tasks are automatically saved to browser's LocalStorage:
- Saves after every add, delete, or toggle action
- Persists across browser sessions
- No server or login required
- Data stays on your device

## 📁 File Formats

### JSON Format
```json
[
  {
    "id": 1675234567890,
    "description": "Complete project report",
    "priority": "high",
    "dueDate": "2026-02-15",
    "completed": false,
    "createdAt": "2026-02-01T10:30:00.000Z"
  }
]
```

### CSV Format
```csv
ID,Description,Priority,Due Date,Completed,Created At
1675234567890,"Complete project report",high,2026-02-15,false,2026-02-01T10:30:00.000Z
```

## 🎯 Use Cases

- **Project Management**: Track tasks with deadlines and priorities
- **Daily Planning**: Organize daily todos with priority filtering
- **Goal Tracking**: Monitor progress with completion statistics
- **Team Coordination**: Export tasks to share with others
- **Data Backup**: Regularly export your task list for safekeeping

## 🔧 Technical Highlights

✅ **Object-Oriented Design**: Clean Task and ToDoList classes  
✅ **LocalStorage Integration**: Automatic data persistence  
✅ **File I/O**: JSON and CSV export/import  
✅ **Smart Sorting**: Multi-level task prioritization  
✅ **Date Handling**: Due date tracking with overdue detection  
✅ **Responsive UI**: Works on desktop and mobile  
✅ **No Dependencies**: Pure vanilla JavaScript  


## 📂 Project Structure

```
├── index.html      # Main HTML structure
├── style.css       # Responsive styling
├── script.js       # OOP JavaScript logic
└── README.md       # Documentation
```

## 🔮 Future Enhancements

- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Task search functionality
- [ ] Dark mode toggle
- [ ] Task notes/descriptions
- [ ] Subtasks support
- [ ] Calendar view
- [ ] Cloud sync
- [ ] Mobile app version

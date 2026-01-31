// Task Class - Represents a single task
class Task {
    constructor(description, priority = 'medium', dueDate = null) {
        this.id = Date.now() + Math.random(); // Unique ID
        this.description = description;
        this.priority = priority; // 'low', 'medium', 'high'
        this.dueDate = dueDate;
        this.completed = false;
        this.createdAt = new Date().toISOString();
    }

    toggle() {
        this.completed = !this.completed;
    }

    isOverdue() {
        if (!this.dueDate || this.completed) return false;
        return new Date(this.dueDate) < new Date();
    }

    getDaysUntilDue() {
        if (!this.dueDate) return null;
        const today = new Date();
        const due = new Date(this.dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    toJSON() {
        return {
            id: this.id,
            description: this.description,
            priority: this.priority,
            dueDate: this.dueDate,
            completed: this.completed,
            createdAt: this.createdAt
        };
    }

    static fromJSON(json) {
        const task = new Task(json.description, json.priority, json.dueDate);
        task.id = json.id;
        task.completed = json.completed;
        task.createdAt = json.createdAt;
        return task;
    }
}

// ToDoList Class - Manages all tasks
class ToDoList {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.loadFromLocalStorage();
        this.render();
        this.updateStats();
    }

    addTask() {
        const inputBox = document.getElementById('input-box');
        const priority = document.getElementById('priority').value;
        const dueDate = document.getElementById('due-date').value || null;

        if (inputBox.value.trim() === '') {
            alert('Please enter a task description!');
            return;
        }

        const task = new Task(inputBox.value.trim(), priority, dueDate);
        this.tasks.push(task);

        // Clear inputs
        inputBox.value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = 'medium';

        this.saveToLocalStorage();
        this.render();
        this.updateStats();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveToLocalStorage();
        this.render();
        this.updateStats();
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.toggle();
            this.saveToLocalStorage();
            this.render();
            this.updateStats();
        }
    }

    filterTasks(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        this.render();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        const taskList = document.getElementById('tasklist');
        taskList.innerHTML = '';

        const filteredTasks = this.getFilteredTasks();

        // Sort by priority (high -> medium -> low) and then by due date
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        filteredTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1; // Completed tasks go to bottom
            }
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return 0;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `priority-${task.priority}`;
            if (task.completed) {
                li.classList.add('checked');
            }

            // Task description
            const description = document.createElement('div');
            description.className = 'task-description';
            description.textContent = task.description;

            // Task metadata (priority, due date)
            const meta = document.createElement('div');
            meta.className = 'task-meta';

            const priorityBadge = document.createElement('span');
            priorityBadge.className = `priority-badge priority-${task.priority}-badge`;
            priorityBadge.textContent = task.priority;
            meta.appendChild(priorityBadge);

            if (task.dueDate) {
                const dueInfo = document.createElement('span');
                dueInfo.className = 'due-date-info';
                const daysUntil = task.getDaysUntilDue();
                
                if (task.isOverdue()) {
                    dueInfo.classList.add('overdue');
                    dueInfo.textContent = `⚠️ Overdue: ${task.dueDate}`;
                } else if (daysUntil === 0) {
                    dueInfo.textContent = `📅 Due Today`;
                } else if (daysUntil === 1) {
                    dueInfo.textContent = `📅 Due Tomorrow`;
                } else if (daysUntil > 1) {
                    dueInfo.textContent = `📅 Due in ${daysUntil} days`;
                } else {
                    dueInfo.textContent = `📅 ${task.dueDate}`;
                }
                
                meta.appendChild(dueInfo);
            }

            li.appendChild(description);
            li.appendChild(meta);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.deleteTask(task.id);
            };
            li.appendChild(deleteBtn);

            // Toggle completed on click
            li.onclick = (e) => {
                if (e.target !== deleteBtn) {
                    this.toggleTask(task.id);
                }
            };

            taskList.appendChild(li);
        });
    }

    updateStats() {
        const total = this.tasks.length;
        const pending = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        document.getElementById('total-tasks').textContent = total;
        document.getElementById('pending-tasks').textContent = pending;
        document.getElementById('completed-tasks').textContent = completed;
    }

    saveToLocalStorage() {
        const data = JSON.stringify(this.tasks.map(task => task.toJSON()));
        localStorage.setItem('todoListData', data);
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('todoListData');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                this.tasks = parsed.map(json => Task.fromJSON(json));
            } catch (e) {
                console.error('Error loading tasks:', e);
                this.tasks = [];
            }
        }
    }

    // Export to JSON
    exportToJSON() {
        const dataStr = JSON.stringify(this.tasks.map(task => task.toJSON()), null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `todo-list-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Export to CSV
    exportToCSV() {
        const headers = ['ID', 'Description', 'Priority', 'Due Date', 'Completed', 'Created At'];
        const rows = this.tasks.map(task => [
            task.id,
            `"${task.description.replace(/"/g, '""')}"`, // Escape quotes
            task.priority,
            task.dueDate || '',
            task.completed,
            task.createdAt
        ]);

        const csv = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const dataBlob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `todo-list-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    }

    // Import from file (JSON or CSV)
    importFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                
                if (file.name.endsWith('.json')) {
                    this.importFromJSON(content);
                } else if (file.name.endsWith('.csv')) {
                    this.importFromCSV(content);
                } else {
                    alert('Unsupported file format. Please use JSON or CSV.');
                }
            } catch (error) {
                alert('Error importing file: ' + error.message);
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    importFromJSON(content) {
        const data = JSON.parse(content);
        
        if (confirm('This will replace all existing tasks. Continue?')) {
            this.tasks = data.map(json => Task.fromJSON(json));
            this.saveToLocalStorage();
            this.render();
            this.updateStats();
            alert('Tasks imported successfully!');
        }
    }

    importFromCSV(content) {
        const lines = content.trim().split('\n');
        const tasks = [];

        // Skip header row
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            // Simple CSV parsing (handles quoted fields)
            const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
            
            if (matches && matches.length >= 6) {
                const task = new Task(
                    matches[1].replace(/^"|"$/g, '').replace(/""/g, '"'), // description
                    matches[2].trim(), // priority
                    matches[3].trim() || null // dueDate
                );
                task.id = parseFloat(matches[0]);
                task.completed = matches[4].trim() === 'true';
                task.createdAt = matches[5].trim();
                tasks.push(task);
            }
        }

        if (confirm(`Import ${tasks.length} tasks? This will replace all existing tasks.`)) {
            this.tasks = tasks;
            this.saveToLocalStorage();
            this.render();
            this.updateStats();
            alert('Tasks imported successfully!');
        }
    }
}

// Initialize the app
const todoList = new ToDoList();
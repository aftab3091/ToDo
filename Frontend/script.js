const API = "http://127.0.0.1:8000/tasks/";

function loadTasks() {
    fetch(API)
    .then(res => res.json())
    .then(data => {
        let output = "";
        if (data.length === 0) {
            output = '<div class="empty-state"><div class="empty-state-icon">📝</div><p>No tasks yet. Add one to get started!</p></div>';
        } else {
            data.forEach(task => {
                const priorityClass = `priority-${task.priority.toLowerCase()}`;
                const statusClass = `status-${task.status.toLowerCase()}`;
                output += `
                <div class="task-card">
                    <div class="task-header">
                        <div class="task-title">${task.title}</div>
                        <span class="task-priority ${priorityClass}">${task.priority}</span>
                    </div>
                    <div class="task-description">${task.description}</div>
                    <div class="task-meta">
                        <span class="task-status ${statusClass}">${task.status}</span>
                        <div class="task-actions">
                            <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
                        </div>
                    </div>
                </div>
                `;
            });
        }
        document.getElementById("taskList").innerHTML = output;
    })
    .catch(err => {
        console.error("Error loading tasks:", err);
        document.getElementById("taskList").innerHTML = '<div class="empty-state"><p>Error loading tasks. Make sure the backend is running.</p></div>';
    });
}

function addTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    
    if (!title) {
        alert("Please enter a task title");
        return;
    }

    const data = {
        title: title,
        description: description,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    };

    fetch(API + "add/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to add task");
        return res.json();
    })
    .then(() => {
        // Clear input fields
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("priority").value = "High";
        document.getElementById("status").value = "Pending";
        loadTasks();
    })
    .catch(err => {
        console.error("Error adding task:", err);
        alert("Error adding task. Make sure the backend is running.");
    });
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        fetch(API + "delete/" + id + "/", {
            method: "DELETE"
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to delete task");
            loadTasks();
        })
        .catch(err => {
            console.error("Error deleting task:", err);
            alert("Error deleting task");
        });
    }
}

loadTasks();
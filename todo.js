const { createApp } = Vue;

(generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}),
  createApp({
    data() {
      return {
        newTodo: "",
        editTodo: "",
        editIndex: -1,
        todos: JSON.parse(localStorage.getItem("todos")) || [],
      };
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() === "") return;
        this.todos.unshift({
          id: generateUUID(),
          text: this.newTodo,
        });
        this.newTodo = "";
        this.saveTodo();
      },
      editTask(index) {
        this.editIndex = index;
        this.editTodo = this.todos[index].text;
      },
      saveEdit(index) {
        if (this.editTodo.trim()) {
          this.todos[index].text = this.editTodo;
          this.editIndex = -1;
          this.editTodo = "";
          this.saveTodo();
        }
      },
      cancelEdit() {
        this.editIndex = -1;
        this.editTodo = "";
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
        this.saveTodo();
      },
      saveTodo() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
    },
  }).mount("#app");

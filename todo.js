const { createApp } = Vue;

createApp({
  data() {
    return {
      newTodo: "",
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === "") return;
      this.todos.unshift({ id: this.todos.length + 1, text: this.newTodo });
      this.newTodo = "";
      this.saveTodo();
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

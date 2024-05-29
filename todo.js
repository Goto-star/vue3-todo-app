const { createApp, ref } = Vue

createApp({
  setup() {
    const fetchSavedTodos = () => {
      const savedTodos = localStorage.getItem('todos')
      return savedTodos ? JSON.parse(savedTodos) : []
    }

    const newTodo = ref('')
    const editTodo = ref('')
    const editIndex = ref(-1)
    const todos = ref(fetchSavedTodos())

    const addTodo = () => {
      if (newTodo.value.trim() === '') return
      todos.value.push({
        id: uuid.v4(),
        text: newTodo.value,
        done: false,
      })
      console.log('After adding todo:', JSON.stringify(todos.value))
      newTodo.value = ''
      saveTodo()
    }

    const editTask = (index) => {
      editIndex.value = index
      editTodo.value = todos.value[index].text
    }

    const saveEdit = (index) => {
      if (editTodo.value.trim()) {
        todos.value[index].text = editTodo.value
        editIndex.value = -1
        editTodo.value = ''
        saveTodo()
      }
    }

    const cancelEdit = () => {
      editIndex.value = -1
      editTodo.value = ''
    }

    const removeTodo = (index) => {
      todos.value.splice(index, 1)
      saveTodo()
    }

    const saveTodo = () => {
      localStorage.setItem('todos', JSON.stringify(todos.value))
    }

    return {
      newTodo,
      editTodo,
      editIndex,
      todos,
      addTodo,
      editTask,
      saveEdit,
      cancelEdit,
      removeTodo,
    }
  },
}).mount('#app')

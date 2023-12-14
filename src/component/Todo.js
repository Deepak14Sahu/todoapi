import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, CloseButton, ListGroup } from "react-bootstrap";


const baseURL = 'http://127.0.0.1:8000/api/todo/'
export const Todo = () => {
  // State variable
  const [formInputData, setFormInputData] = useState({
    id: null,
    title: "",
    description: "",
  });
  const [todos, setTodos] = useState([])

  // Fetch todos from API
  const fetchTodos = () => {
    fetch(baseURL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }
        return res.json();
      })
      .then(json => {
        setTodos(json);
      })
      .catch(() => alert("some error occured! please refresh"))

  }

  // Add a new todo
  const addNewTodo = () => {
    try {
      fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputData)
      })
        .then(res => {
          if (res.ok) {
            fetchTodos()
            setFormInputData({ title: '', description: '' })
            alert("New todo added");
          }
        })
    } catch (error) {
      throw new Error('Failed to add todo');
    }
  }

  // Update an existing todo
  const updateTodo = () => {
    try {
      fetch(`${baseURL}${formInputData.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputData)
      })
        .then(res => {
          if (res.ok) {
            fetchTodos()
            setFormInputData({ title: '', description: '' })
            alert("Todo updated successfully");
          }
        })
    } catch (error) {
      throw new Error('Failed to update todo');
    }
  }

  // Delete a todo
  const handleDelete = (id) => {
    try {
      fetch(`${baseURL}${id}/`, { method: "DELETE" })
        .then(res => {
          if (res.ok) {
            fetchTodos()
            alert("Todo removed")
          }
        })
    } catch (error) {
      throw new Error('Failed to delete todo');
    }
  }

  // Handle editing a todo
  const handleEdit = (todo) => setFormInputData(todo)

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormInputData({ ...formInputData, [name]: value });
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    formInputData.id ? updateTodo() : addNewTodo(formInputData)
  };

  // Fetch todos on initial render
  useEffect(() => fetchTodos(), []);

  // Render todo component
  return (
    <>
      {/* Todo form  */}
      <Form className="my-3 " onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formInputData.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter the title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            placeholder=" Enter the description"
            value={formInputData.description}
            onChange={handleChange}
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {formInputData.id ? "Update" : "Add"}
        </Button>
      </Form>

      {/* Todo List showing */}

      <h1>Todos</h1>
      {todos.length > 0 ? (
        <ListGroup>
          {todos.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{todo.title}</div>
                {todo.description}
              </div>
              <div className="align-self-center">
                <Button
                  className="mx-2"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </Button>
                <CloseButton onClick={() => handleDelete(todo.id)} />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div>No todos available</div>
      )}
    </>
  )
}

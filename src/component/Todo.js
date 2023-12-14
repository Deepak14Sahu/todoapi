import { useCallback, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, CloseButton, ListGroup } from "react-bootstrap";

export const Todo = () => {
  const [formInputData, setFormInputData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [todos, setTodos] = useState([])
  const baseURL = 'http://127.0.0.1:8000/api/todo/'

  const fetchTodos = useCallback(() => {
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

  }, [])

  const addNewTodo = useCallback(() => {
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
  }, [formInputData, fetchTodos])
  const updateTodo = useCallback(() => {
    try {
      fetch(baseURL + formInputData.id + "/", {
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
  }, [formInputData, fetchTodos])
  const handleDelete = (id) => {
    try {
      fetch(baseURL + id + "/", { method: "DELETE" })
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

  const handleEdit = useCallback((todo) => setFormInputData(todo), [setFormInputData])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormInputData({ ...formInputData, [name]: value });
  }, [formInputData, setFormInputData]);

  const handleButtonClick = (e) => {
    e.preventDefault()
    formInputData.id ? updateTodo() : addNewTodo(formInputData)
  };

  useEffect(() => fetchTodos(), [fetchTodos]);

  return (
    <>
      {/* Todo form  */}
      <Form className="my-3 " onSubmit={handleButtonClick}>
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

import { useEffect, useState } from "react";
import { Button, CloseButton, ListGroup } from "react-bootstrap";

const ListTodo = ({ setFormInputData }) => {

    const [Todos, setTodos] = useState([])

    const FetchTodo = () => {
        fetch("http://127.0.0.1:8000/api/todo/", { method: "GET" })
            .then(res => (res.json()))
            .then(json => setTodos(json))
            .catch(err => console.log(err))

    }

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/api/todo/${id}/`, { method: "DELETE" })
            .then(res => {
                if (res.ok) {
                    FetchTodo()
                    console.log("Todo Deleted Successfully")
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        FetchTodo()
    }, [])

    const handleEdit = (todo) => {
        setFormInputData(todo)
    }


    const renderedTodo = Todos.map((todo) => (
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
                    disabled={todo.completed}
                    className="mx-2"
                    onClick={() => handleEdit(todo)}
                >
                    Edit
                </Button>
                <CloseButton onClick={() => handleDelete(todo.id)} />
            </div>
        </ListGroup.Item>
    ));

    return (
        <>
            <h1>Todos</h1>
            {Todos.length > 0 ? (
                <ListGroup>{renderedTodo}</ListGroup>
            ) : (
                <div>No todos available</div>
            )}
        </>
    );
};

export default ListTodo;
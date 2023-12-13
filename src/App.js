import { Container, Navbar } from "react-bootstrap";
import ListTodo from "./Component/ListTodo";
import AddTodo from "./Component/AddTodo";
import { useState } from "react";

function App() {
  const [formInputData, setFormInputData] = useState({
    id: "",
    title: "",
    description: "",
  });
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand bg="light">Todo App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <AddTodo formInputData={formInputData} setFormInputData={setFormInputData} />
        <hr />
        <ListTodo setFormInputData={setFormInputData} />
      </Container>
    </>
  );
}

export default App;
import { Container, Navbar } from "react-bootstrap";
import { Todo } from "./component/Todo";

function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand bg="light">Todo App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Todo />
      </Container>
    </>
  );
}

export default App;
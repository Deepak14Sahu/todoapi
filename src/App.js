import { Container, Navbar } from "react-bootstrap";
import { Todo } from "./component/Todo";

const App = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand bg="light" className="mx-5">Todo App</Navbar.Brand>
      </Navbar>
      <Container>
        <Todo />
      </Container>

    </>
  );
}
export default App;

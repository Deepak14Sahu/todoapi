import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useCallback } from "react";

const BaseURL = 'http://127.0.0.1:8000/api/todo/'

const updateTodo = (formInputData) => {

    fetch(BaseURL + formInputData.id + "/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputData)
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))


}

const newTodo = (formInputData) => {
    fetch(BaseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputData)
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))

}

const AddTodo = ({ formInputData, setFormInputData }) => {


    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setFormInputData({ ...formInputData, [name]: value });
    }, [formInputData, setFormInputData]);

    const handleButtonClick = () => {
        formInputData.id ? updateTodo(formInputData) : newTodo(formInputData)
    };

    return (
        <Form className="my-3 ">
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
            <Button variant="primary" type="submit" onClick={handleButtonClick}>
                {formInputData.id ? "Update" : "Add"}
            </Button>
        </Form>
    );
};

export default AddTodo;
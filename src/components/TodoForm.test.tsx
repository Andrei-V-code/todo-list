import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import TodoForm from "../components/TodoForm";

describe("TodoForm", () => {
    test("onSubmit event called", () => {
        const handleSubmit = jest.fn();
        render(<TodoForm saveTodo={handleSubmit}  />);
        const inputElement: HTMLInputElement = screen.getByRole('textbox');
        const form = screen.getByRole('form', { name: /Form/i });
        expect(inputElement).toBeInTheDocument();
        expect(form).toBeInTheDocument();
        expect(inputElement.value).toBe('');
        fireEvent.change(inputElement, { target: { value: 'John Doe' } });
        expect(inputElement.value).toBe('John Doe');
        fireEvent.submit(form);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith("John Doe");
        expect(inputElement.value).toBe('');
    })
})
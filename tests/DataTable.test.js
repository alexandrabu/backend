import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from '../components/DataTable';

const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com", department: "Engineering" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Marketing" }
];

const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" }
];

test('renders table with data', () => {
    render(<DataTable data={mockData} columns={columns} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
});

test('filters data correctly', () => {
    render(<DataTable data={mockData} columns={columns} />);

    const searchInput = screen.getByPlaceholderText("Search by Name");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
});

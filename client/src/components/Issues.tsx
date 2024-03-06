import { Issue } from "../types/interface";
import { Button, Table } from "@radix-ui/themes";

const Issues = ({ issues }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue: Issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>{issue.id}</Table.RowHeaderCell>
            <Table.Cell>{issue.issue}</Table.Cell>
            <Table.Cell className="flex gap-2">
              <Button className="mr-2 bg-red-500 ">Update</Button>
              <Button color="red">Delete</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default Issues;

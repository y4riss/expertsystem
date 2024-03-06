import { Issue } from "../types/interface";
import { Button } from "@radix-ui/themes";
const Issues = ({ issues }) => {
  return (
    <table className="table-auto w-fit ">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Issue</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue: Issue) => (
          <tr key={issue.id}>
            <td className="border px-4 py-2">{issue.id}</td>
            <td className="border px-4 py-2">{issue.issue}</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Update
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Issues;

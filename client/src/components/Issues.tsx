import { Issue } from "../types/interface";
import axios from "axios";
import UpdateIssueModal from "./Modals/UpdateIssueModal";
const Issues = ({ issues, symptoms }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/rules/issue/${id}`);
      alert("Issue deleted successfully");
      window.location.reload();
    } catch (error) {
      alert("Error deleting issue");
    }
  };
  return (
    <div className="relative overflow-x-auto w-3/4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue: Issue) => (
            <tr
              key={issue.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{issue.id}</td>
              <td className="px-6 py-4">{issue.issue}</td>
              <td className="px-6 py-4 flex gap-2">
                <UpdateIssueModal issue_param={issue} symptoms={symptoms} />
                <button
                  className="btn "
                  onClick={() =>
                    (
                      document.getElementById(
                        `update_issue_modal_${issue.id}`
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(issue.id)}
                  className="btn bg-red-800 text-white border-none hover:bg-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Issues;

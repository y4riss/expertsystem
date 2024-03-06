import { Symptom } from "../types/interface";
import axios from "axios";
const Symptoms = ({ symptoms }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/rules/symptom/${id}`);
      alert("Symptom deleted successfully");
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
          {symptoms.map((symptom: Symptom) => (
            <tr
              key={symptom.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{symptom.id}</td>
              <td className="px-6 py-4">{symptom.symptom}</td>
              <td className="px-6 py-4 flex gap-2">
                <button className="btn ">Update</button>
                <button
                  onClick={() => handleDelete(symptom.id)}
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

export default Symptoms;

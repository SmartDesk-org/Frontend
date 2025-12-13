import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../redux/slices/employeeSlice";

export default function EmployeesPage() {
  const { list } = useSelector((s) => s.employees);
  const dispatch = useDispatch();

  const addDummy = () => {
    dispatch(
      addEmployee({
        id: Date.now(),
        name: "New Employee",
        email: "new@corp.com",
        isActive: true,
      })
    );
  };

  return (
    <div>
      <h3>Employees</h3>
      <button className="btn btn-primary mb-3" onClick={addDummy}>
        Add Employee
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

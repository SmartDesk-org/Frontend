import { useSelector } from "react-redux";

export default function CompanySubPage() {
  const { plan, expiry, usage } = useSelector((s) => s.compSub);

  return (
    <div>
      <h3>Subscription</h3>
      <p>Plan: <b>{plan}</b></p>
      <p>Expiry: {expiry}</p>

      <h5>Usage</h5>
      <ul>
        <li>Employees: {usage.employees}</li>
        <li>Desks: {usage.desks}</li>
      </ul>

      <button className="btn btn-warning">Upgrade Plan</button>
    </div>
  );
}

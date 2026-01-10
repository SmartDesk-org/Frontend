import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCompanyOverview } from "../../redux/slices/companySlice";
import RenewSubscriptionModal from "../../components/companyAdmin/RenewSubscriptionModal";

export default function CompanySubPage({ companyId }) {
  const dispatch = useDispatch();
  const { overview, loadingOverview } = useSelector((s) => s.company);

  const [showRenew, setShowRenew] = useState(false);

  useEffect(() => {
  
    dispatch(fetchSingleCompanyOverview());
  }, [companyId, dispatch]);

  if (loadingOverview) return <p>Loading...</p>;
  if (!overview) return <p>No data</p>;

  const {
    companyName,
    desksCount,
    desksLimit,
    employeesCount,
    employeesLimit,
    floorsCount,
    floorsLimit,
    meetingRoomsCount,
    meetingRoomsLimit,
  } = overview;

  return (
    <div className="container py-4">
      <h3>Company Overview</h3>

      <div className="card p-3 mb-3">
        <p><b>Company:</b> {companyName}</p>

        <p>
          <b>Desks:</b> {desksCount} / {desksLimit}
        </p>

        <p>
          <b>Employees:</b> {employeesCount} / {employeesLimit}
        </p>

        <p>
          <b>Floors:</b> {floorsCount} / {floorsLimit}
        </p>

        <p>
          <b>Meeting Rooms:</b> {meetingRoomsCount} / {meetingRoomsLimit}
        </p>
      </div>
      <button
        className="btn btn-warning"
        onClick={() => setShowRenew(true)}
      >
        Renew Subscription
      </button>

      {showRenew && (
        <RenewSubscriptionModal
          expiryDate={overview.subscriptionEndDate}
          onClose={() => setShowRenew(false)}
          companyId={overview.companyId}
        />
      )}
    </div>
  );
}

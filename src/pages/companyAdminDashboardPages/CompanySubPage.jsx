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

  return (
    <div className="container py-4">
      <h3>Subscription</h3>

      <div className="card p-3 mb-3">
        <p><b>Plan:</b> {overview.subscriptionName}</p>
        <p>
          <b>Expiry:</b>{" "}
          {new Date(overview.subscriptionEndDate).toDateString()}
        </p>
        <p><b>Status:</b> {overview.subscriptionStatus}</p>
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
        />
      )}
    </div>
  );
}

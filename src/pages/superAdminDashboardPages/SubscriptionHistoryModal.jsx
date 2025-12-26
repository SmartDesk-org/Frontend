import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistories, clearHistories } from "../../redux/slices/companySlice";

export default function SubscriptionHistoryModal({ company, onClose }) {
  const dispatch = useDispatch();

  const { histories, loadingHistories, error } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    if (company?.companyId) {
      dispatch(fetchHistories(company.companyId));
    }

    return () => {
      dispatch(clearHistories());
    };
  }, [dispatch, company]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return <span className="badge bg-success">Paid</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "failed":
        return <span className="badge bg-danger">Failed</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Subscription History – {company.name}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {loadingHistories && <p>Loading subscription history...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loadingHistories && histories.length === 0 && (
              <p>No subscription history found.</p>
            )}

            {!loadingHistories && histories.length > 0 && (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Plan</th>
                      <th>Amount Paid</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {histories.map((h, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">
                          {h.subscriptionName}
                        </td>
                        <td>₹ {h.amountPaid}</td>
                        <td>
                          {h.startDate
                            ? new Date(h.startDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>
                          {h.endDate
                            ? new Date(h.endDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>{getStatusBadge(h.status)}</td>
                        <td>{h.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

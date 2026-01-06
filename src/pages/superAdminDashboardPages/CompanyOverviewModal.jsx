import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyOverview,
  clearOverview,
} from "../../redux/slices/companySlice";

export default function CompanyOverviewModal({ company, onClose }) {
  const dispatch = useDispatch();
  const { overview, loadingOverview, error } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    if (company?.companyId) {
      dispatch(fetchCompanyOverview(company.companyId));
    }

    return () => {
      dispatch(clearOverview());
    };
  }, [company, dispatch]);

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Company Overview – {company.name}
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {loadingOverview && <p>Loading overview...</p>}

            {error && <p className="text-danger">{error}</p>}

            {overview && (
              <div className="row g-3">
                <OverviewItem
                  label="Employees"
                  used={overview.employeesCount}
                  limit={overview.employeesLimit}
                />
                <OverviewItem
                  label="Floors"
                  used={overview.floorsCount}
                  limit={overview.floorsLimi}
                />
                <OverviewItem
                  label="Desks"
                  used={overview.desksCount}
                  limit={overview.desksLimit}
                />
                <OverviewItem
                  label="Meeting Rooms"
                  used={overview.meetingRoomsCount}
                  limit={overview.meetingRoomsLimi}
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable item ---------- */

function OverviewItem({ label, used, limit }) {
  const percent =
    limit > 0 ? Math.round((used / limit) * 100) : 0;

  return (
    <div className="col-md-6">
      <div className="border rounded p-3">
        <div className="d-flex justify-content-between">
          <strong>{label}</strong>
          <span>
            {used} / {limit}
          </span>
        </div>

        <div className="progress mt-2">
          <div
            className={`progress-bar ${
              percent >= 90 ? "bg-danger" : "bg-success"
            }`}
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>
      </div>
    </div>
  );
}

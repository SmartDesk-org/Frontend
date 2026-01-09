import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitRenewal,
  resetRenewalState,
} from "../../redux/slices/companySlice";

export default function RenewSubscriptionModal({ onClose, expiryDate }) {
  const dispatch = useDispatch();

  const {
    loadingRenewal,
    renewalSuccess,
    error,
  } = useSelector((s) => s.company);

  const [isYearly, setIsYearly] = useState(true);
  const [months, setMonths] = useState(1);

  const handleSubmit = () => {
    dispatch(
      submitRenewal({
        expirationYear: isYearly ? 1 : 0,
        expirationMonth: isYearly ? 0 : months,
      })
    );
  };

  /* ================= SUCCESS STATE ================= */

  if (renewalSuccess) {
    return (
      <div className="modal-backdrop show">
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content p-4 text-center">
              <h5>Renewal Created</h5>
              <p>Please proceed to payment.</p>

              <button
                className="btn btn-success"
                onClick={() => {
                  dispatch(resetRenewalState());
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= FORM ================= */

  return (
    <div className="modal-backdrop show">
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content p-4">
            <h5>Renew Subscription</h5>

            <p className="text-muted">
              New plan will start after expiry:{" "}
              <b>{new Date(expiryDate).toDateString()}</b>
            </p>

            {/* YEARLY */}
            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isYearly}
                onChange={(e) => setIsYearly(e.target.checked)}
              />
              <label className="form-check-label">
                Renew for 1 Year
              </label>
            </div>

            {/* MONTHLY */}
            {!isYearly && (
              <>
                <label className="mt-2">Months</label>
                <select
                  className="form-select"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} month{i + 1 > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </>
            )}

            {error && (
              <p className="text-danger mt-2">{error}</p>
            )}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loadingRenewal}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loadingRenewal}
              >
                {loadingRenewal ? "Processing..." : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

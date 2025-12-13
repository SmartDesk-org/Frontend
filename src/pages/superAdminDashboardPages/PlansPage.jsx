// src/pages/Plans/PlansPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../../redux/slices/subscriptionSlice";
import AddPlanModal from "../../components/plans/AddPlanModal";
import EditPlanModal from "../../components/plans/EditPlanModal";
import DeleteConfirmModal from "../../components/plans/DeleteConfirmModal";

export default function PlansPage() {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector(
    (state) => state.subscription
  );

  const [showAdd, setShowAdd] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [deletePlan, setDeletePlan] = useState(null);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mb-4">Manage Plans</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          Plans List
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            Add New Plan
          </button>
        </div>

        <div className="card-body">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && plans?.length === 0 && <p>No plans available</p>}

          {!loading && plans?.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Monthly</th>
                    <th>Yearly</th>
                    <th>Description</th>
                    <th>Limits</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id}>
                      <td>{plan.id}</td>
                      <td>{plan.subscriptionName}</td>
                      <td>₹{plan.priceMonthly}</td>
                      <td>₹{plan.priceYearly}</td>
                      <td>{plan.description}</td>
                      <td>
                        Desk: {plan.deskLimit}<br />
                        Employee: {plan.employeeLimit}<br />
                        Floor: {plan.floorLimit}<br />
                        Meeting: {plan.meetingRoomLimit}
                      </td>
                      <td>
                        {plan.isActive ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => setEditPlan(plan)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeletePlan(plan)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>

      {showAdd && <AddPlanModal onClose={() => setShowAdd(false)} />}
      {editPlan && (
        <EditPlanModal
          plan={editPlan}
          onClose={() => setEditPlan(null)}
        />
      )}
      {deletePlan && (
        <DeleteConfirmModal
          plan={deletePlan}
          onClose={() => setDeletePlan(null)}
        />
      )}
    </div>
  );
}

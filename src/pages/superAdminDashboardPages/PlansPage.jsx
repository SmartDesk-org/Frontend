import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlans,
  changePlanStatus,
} from "../../redux/slices/subscriptionSlice";
import AddPlanModal from "../../components/plans/AddPlanModal";
import EditPlanModal from "../../components/plans/EditPlanModal";
import DeleteConfirmModal from "../../components/plans/DeleteConfirmModal";
import { 
  Layers, Plus, Edit, Trash2, CheckCircle, XCircle, 
  Monitor, Users, Layout, Activity, Power, AlertCircle 
} from "lucide-react";

export default function PlansPage() {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.subscription);

  const [showAdd, setShowAdd] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [deletePlan, setDeletePlan] = useState(null);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const toggleStatus = (id) => {
    dispatch(changePlanStatus(id));
  };

  // Helper for Status Badge (Plain Text + Dot)
  const getStatusBadge = (isActive) => {
    if (isActive) {
      return (
        <span className="inline-flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 bg-green-400 animate-pulse"></span>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 text-gray-600 text-xs font-bold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 bg-gray-600"></span>
        Inactive
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-10 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-neutral-800/50 pb-6">
            <div>
                <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                    <Layers size={14} /> Subscription Management
                </div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                    Manage Plans
                </h1>
            </div>
            
            <button 
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase text-xs tracking-wider transition-all"
            >
                <Plus size={16} />
                <span>Add Plan</span>
            </button>
        </div>

        {loading && (
            <div className="py-12 text-center text-cyan-400 font-mono animate-pulse text-sm">
                LOADING_PLAN_DATA...
            </div>
        )}

        {error && (
            <div className="py-12 text-center text-red-500 font-mono text-sm">
                ERROR: {error}
            </div>
        )}

        {/* --- LIST SECTION --- */}
        {!loading && plans?.length > 0 && (
            <div>
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 px-2 py-3 border-b border-neutral-800 text-[10px] font-bold text-gray-600 uppercase tracking-widest font-mono">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-3">Plan Details</div>
                    <div className="col-span-2">Pricing</div>
                    <div className="col-span-4">Resource Limits</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-neutral-900">
                    {plans.map((plan) => (
                        <div key={plan.id} className="grid grid-cols-1 md:grid-cols-12 px-2 py-6 items-center gap-4 hover:bg-neutral-900/40 transition-colors group">
                            
                            {/* ID */}
                            <div className="hidden md:block col-span-1 text-gray-600 font-mono text-xs">
                                #{plan.id}
                            </div>

                            {/* Plan Name & Type */}
                            <div className="col-span-1 md:col-span-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-white font-bold text-base">{plan.subscriptionName}</h3>
                                    <span className="text-[10px] text-gray-500 font-mono uppercase border border-neutral-800 px-1">
                                        {plan.typeName}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col gap-4 md:gap-0">
                                <div>
                                    <span className="text-cyan-400 font-mono text-base font-bold">₹{plan.priceMonthly}</span>
                                    <span className="text-[9px] text-gray-600 uppercase ml-1">/ Mo</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 font-mono text-xs">₹{plan.priceYearly}</span>
                                    <span className="text-[9px] text-gray-700 uppercase ml-1">/ Yr</span>
                                </div>
                            </div>

                            {/* Resource Limits (Grid) */}
                            <div className="col-span-1 md:col-span-4">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4">
                                    <LimitItem icon={<Monitor size={10}/>} label="Desks" value={plan.maxDesks} />
                                    <LimitItem icon={<Users size={10}/>} label="Users" value={plan.maxEmployees} />
                                    <LimitItem icon={<Layers size={10}/>} label="Floors" value={plan.maxFloors} />
                                    <LimitItem icon={<Layout size={10}/>} label="Rooms" value={plan.maxMeetingRooms} />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="col-span-1 md:col-span-1">
                                {getStatusBadge(plan.isActive)}
                            </div>

                            {/* Actions */}
                            <div className="col-span-1 md:col-span-1 flex justify-end gap-3 opacity-60 md:opacity-40 md:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => toggleStatus(plan.id)}
                                    className={`transition-colors ${
                                        plan.isActive 
                                        ? "text-gray-600 hover:text-white" 
                                        : "text-green-500 hover:text-green-400"
                                    }`}
                                    title={plan.isActive ? "Deactivate" : "Activate"}
                                >
                                    <Power size={16} />
                                </button>
                                
                                <button
                                    onClick={() => setEditPlan(plan)}
                                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                                    title="Edit"
                                >
                                    <Edit size={16} />
                                </button>

                                <button
                                    onClick={() => setDeletePlan(plan)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {!loading && plans?.length === 0 && (
            <div className="py-20 text-center text-gray-700 font-mono text-xs uppercase tracking-widest">
                No_Plans_Configured
            </div>
        )}

      </div>

      {/* Modals */}
      {showAdd && <AddPlanModal onClose={() => setShowAdd(false)} />}
      {editPlan && <EditPlanModal plan={editPlan} onClose={() => setEditPlan(null)} />}
      {deletePlan && <DeleteConfirmModal plan={deletePlan} onClose={() => setDeletePlan(null)} />}
    </div>
  );
}

/* --- Helper Component for Limits (Simplified) --- */
function LimitItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-600">{icon}</span>
            <div className="flex flex-col leading-none">
                <span className="text-[8px] text-gray-600 uppercase font-bold">{label}</span>
                <span className="text-[10px] text-gray-400 font-mono">{value}</span>
            </div>
        </div>
    );
}
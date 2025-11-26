import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsersById } from "../../redux/admin/manageuserSlice.js";
import { useParams, useNavigate } from "react-router-dom";
import { User, Mail, Calendar, Shield, ArrowLeft, X } from "lucide-react";

function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUser, loading, error } = useSelector((state) => state.manageUsers);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    dispatch(GetUsersById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100">
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
          <User className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Failed to load</h2>
          <p className="text-red-600 mt-1 mb-4">{error}</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!singleUser) return null;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A";

  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
        
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

          {/* Top Navigation */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium p-4"
          >
            <ArrowLeft size={18} /> Back
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-center px-6 py-6 flex flex-col items-center">
            <img
              src={singleUser.profileImage}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md cursor-pointer hover:scale-105 transition"
              onClick={() => setShowImageModal(true)}
            />
            <h1 className="text-2xl font-bold text-white mt-3">{singleUser.name}</h1>
            <p className="text-blue-100 text-sm break-all">{singleUser.email}</p>
          </div>

          {/* Content (fits without scroll) */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 overflow-hidden">

            <DetailItem icon={<User />} label="Full Name" value={singleUser.name} />
            <DetailItem icon={<Mail />} label="Email Address" value={singleUser.email} />
            <DetailItem icon={<Calendar />} label="Created At" value={formatDate(singleUser.createdAt)} />
            <DetailItem icon={<Shield />} label="User ID" value={singleUser._id} mono />

          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative w-[90vw] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white bg-white/20 p-2 rounded-full hover:bg-white/30"
              onClick={() => setShowImageModal(false)}
            >
              <X size={24} />
            </button>
            <img src={singleUser.profileImage} className="w-full rounded-lg shadow-xl" alt="Full View" />
          </div>
        </div>
      )}
    </>
  );
}

function DetailItem({ icon, label, value, mono }) {
  return (
    <div className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg overflow-hidden">
      <div className="bg-gray-200 p-2 rounded-lg shrink-0">{icon}</div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-gray-500">{label}</p>
        <p
          className={`mt-1 text-gray-800 font-semibold break-words ${
            mono ? "font-mono bg-white px-3 py-2 border rounded-md text-xs" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default UserDetails;

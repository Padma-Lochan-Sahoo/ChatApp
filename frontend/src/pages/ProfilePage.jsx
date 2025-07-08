import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Mail,
  User,
  Check,
  X,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [fullName, setFullName] = useState(authUser.fullName || "");
  const [bio, setBio] = useState(authUser.bio || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
  };

  const handleSave = async () => {
    await updateProfile({
      ...(previewImg && { profilePic: previewImg }),
      ...(fullName !== authUser.fullName && { fullName }),
      ...(bio !== authUser.bio && { bio }),
    });
    if (previewImg) setSelectedImg(previewImg);
    setPreviewImg(null);
  };

  const handleCancel = () => {
    setPreviewImg(null);
    setFullName(authUser.fullName);
    setBio(authUser.bio || "");
  };

  useEffect(() => {
    if (authUser?.profilePic) {
      setSelectedImg(authUser.profilePic);
    }
  }, [authUser]);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
                <div className="bg-base-300 rounded-xl p-6 shadow-lg space-y-10">
        {/* 🔙 Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-primary-content transition-all duration-300"
          >
            <ArrowLeftCircle className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-primary border border-primary hover:bg-primary hover:text-primary-content transition-all duration-300"
          >
            <ArrowRightCircle className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span>Chat</span>
          </button>
        </div>



          {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-primary">Profile</h1>
          <p className="mt-2 text-sm text-base-content/70">Update Your Profile</p>
        </div>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={previewImg || selectedImg || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-primary transition-all duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            {(previewImg || fullName !== authUser.fullName || bio !== authUser.bio) && (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isUpdatingProfile}
                  className="btn btn-sm btn-primary rounded-full flex items-center gap-1 transition-all duration-300 hover:scale-105"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isUpdatingProfile}
                  className="btn btn-sm btn-ghost border rounded-full flex items-center gap-1 transition-all duration-300 hover:scale-105"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}

            <p className="text-sm text-zinc-400 text-center">
              {isUpdatingProfile
                ? "Saving..."
                : previewImg
                ? "Click save to apply changes"
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400">Bio / About</label>
              <textarea
                rows={3}
                className="textarea textarea-bordered w-full"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
              />
              <p className="text-xs text-zinc-500 text-end">{bio.length}/300</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-base-200 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4 text-primary">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;

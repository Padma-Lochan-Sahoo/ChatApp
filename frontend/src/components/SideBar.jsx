import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-100 transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full px-4 py-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <span className="font-semibold text-base hidden lg:block">Contacts</span>
        </div>

        {/* Toggle Online Only */}
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm text-base-content/80">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({Math.max(onlineUsers.length - 1, 0)} online)
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full px-4 py-2.5 flex items-center gap-3 transition-all duration-200 group ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-inset ring-base-300"
                  : "hover:bg-base-200"
              }`}
            >
              {/* Avatar */}
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 rounded-full object-cover border border-base-300"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2 ring-base-100 animate-pulse" />
                )}
              </div>

              {/* Info */}
              <div className="hidden lg:block flex-1 min-w-0 text-left">
                <p className="font-medium truncate">{user.fullName}</p>
                <p
                  className={`text-xs ${
                    onlineUsers.includes(user._id)
                      ? "text-green-500 font-medium"
                      : "text-zinc-500"
                  }`}
                >
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-sm text-zinc-500 py-4">No users found.</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

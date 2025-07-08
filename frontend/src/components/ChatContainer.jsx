import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => {
            const isSender = message.senderId === authUser._id;
            return (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                {/* Avatar */}
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        isSender
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Timestamp (hovered) */}
                <div
                  className="chat-header mb-1 text-xs text-zinc-400 hover:text-zinc-200 transition-opacity"
                  title={new Date(message.createdAt).toLocaleString()}
                >
                  {formatMessageTime(message.createdAt)}
                </div>

                {/* Bubble */}
                <div
                  className={`chat-bubble break-words px-4 py-2 rounded-2xl shadow-md max-w-xs sm:max-w-sm ${
                    isSender
                      ? "bg-primary text-primary-content"
                      : "bg-base-300 text-base-content"
                  }`}
                >
                  {/* Optional image */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="w-full max-w-[250px] rounded-lg mb-2 shadow"
                    />
                  )}

                  {/* Text message */}
                  {message.text && <p>{message.text}</p>}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

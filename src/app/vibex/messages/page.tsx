"use client";

import { useState, useRef } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { MOCK_USERS, MOCK_CONVERSATIONS } from "@/lib/vibex-data";
import { Send, ArrowLeft, Image, Camera, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

type View = "list" | "chat";

export default function MessagesPage() {
  const { isLoggedIn, user, social, sendMessage } = useVibex();
  const [view, setView] = useState<View>("list");
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [msgInput, setMsgInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allConvos = MOCK_CONVERSATIONS;
  const userConvos = social.conversations;

  const openChat = (userId: string) => {
    setActiveChatUserId(userId);
    setView("chat");
    setMsgInput("");
  };

  const handleSend = () => {
    if (!msgInput.trim() || !activeChatUserId) return;
    sendMessage(activeChatUserId, msgInput.trim());
    setMsgInput("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (!isLoggedIn) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <MessageCircle size={48} className="mb-4 text-zinc-700" />
          <p className="mb-4 text-zinc-500">Sign up to message friends</p>
          <Link href="/vibex/signup" className="rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-black">
            Join VibeX
          </Link>
        </div>
      </>
    );
  }

  const chatUser = activeChatUserId ? MOCK_USERS.find((u) => u.id === activeChatUserId) : null;
  const activeConvo = activeChatUserId
    ? allConvos.find((c) => c.participants.some((p) => p.id === activeChatUserId))
    : null;
  const userMsgs = activeChatUserId
    ? userConvos.find((c) => c.recipientId === activeChatUserId)?.messages || []
    : [];
  const allMessages = [
    ...(activeConvo?.messages || []),
    ...userMsgs,
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Chat view
  if (view === "chat" && chatUser) {
    return (
      <div className="flex flex-col h-screen bg-[#0a0a0f]">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl px-4 py-3">
          <button onClick={() => setView("list")} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10">
            <ArrowLeft size={18} />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl">
            {chatUser.avatar}
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">{chatUser.displayName}</div>
            <div className="text-[10px] text-zinc-500">@{chatUser.username} · Lv.{chatUser.level}</div>
          </div>
          <Link href="/vibex/friends" className="text-xs text-[#00f0ff]">Profile</Link>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
          {allMessages.length === 0 && (
            <div className="text-center text-zinc-600 text-sm pt-20">
              Start a conversation with {chatUser.displayName}!
            </div>
          )}
          {allMessages.map((msg) => {
            const isMine = msg.senderId === user?.id || msg.senderId === "u1";
            return (
              <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    isMine
                      ? "bg-gradient-to-r from-[#00f0ff]/20 to-[#7b61ff]/20 border border-[#00f0ff]/20"
                      : "bg-white/[0.06] border border-white/10"
                  }`}
                >
                  {msg.sharedFilterId && (
                    <Link
                      href={`/vibex/filters/${msg.sharedFilterId}`}
                      className="mb-1 flex items-center gap-1.5 rounded-lg bg-[#ff00e5]/10 border border-[#ff00e5]/20 px-2 py-1 text-[10px] text-[#ff00e5]"
                    >
                      <Camera size={10} />
                      Shared a filter
                    </Link>
                  )}
                  {msg.text && <p>{msg.text}</p>}
                  <div className={`text-[9px] mt-1 ${isMine ? "text-[#00f0ff]/50" : "text-zinc-600"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Image size={16} className="text-zinc-400" />
            </button>
            <input
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!msgInput.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] text-black disabled:opacity-30 hover:scale-110 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Conversation list
  const filteredConvos = allConvos.filter((c) => {
    if (!search) return true;
    return c.participants.some((p) => p.username.toLowerCase().includes(search.toLowerCase()) || p.displayName.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black flex items-center gap-2">
            <MessageCircle size={20} className="text-[#00f0ff]" />
            Messages
          </h1>
          <span className="rounded-full bg-[#ff00e5]/20 px-2.5 py-0.5 text-xs font-bold text-[#ff00e5]">
            {allConvos.reduce((sum, c) => sum + c.unreadCount, 0)} unread
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none"
          />
        </div>

        {/* Conversations */}
        <div className="space-y-1">
          {filteredConvos.map((convo) => {
            const other = convo.participants.find((p) => p.id !== "u1");
            if (!other) return null;
            return (
              <button
                key={convo.id}
                onClick={() => openChat(other.id)}
                className="w-full flex items-center gap-3 rounded-xl p-3 hover:bg-white/5 transition-all text-left"
              >
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
                    {other.avatar}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0a0a0f] bg-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{other.displayName}</span>
                    <span className="text-[10px] text-zinc-600">
                      {new Date(convo.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500 truncate pr-2">
                      {convo.lastMessage?.senderId === "u1" ? "You: " : ""}
                      {convo.lastMessage?.text || "Shared media"}
                    </p>
                    {convo.unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff00e5] px-1 text-[10px] font-bold text-white">
                        {convo.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick message users */}
        <div>
          <h3 className="mb-2 text-xs font-bold text-zinc-400">People you know</h3>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {MOCK_USERS.filter((u) => u.id !== "u1").map((u) => (
              <button
                key={u.id}
                onClick={() => openChat(u.id)}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl hover:ring-2 hover:ring-[#00f0ff]/50 transition-all">
                  {u.avatar}
                </div>
                <span className="text-[10px] text-zinc-500 font-medium">{u.username.slice(0, 8)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

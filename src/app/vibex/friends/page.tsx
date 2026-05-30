"use client";

import { useState } from "react";
import { VibexHeader } from "@/components/vibex/VibexHeader";
import { useVibex } from "@/lib/vibex-context";
import { MOCK_USERS, MOCK_FRIEND_REQUESTS } from "@/lib/vibex-data";
import type { VibexUser } from "@/lib/vibex-types";
import { UserPlus, UserCheck, UserX, Users, Search, Shield, Globe, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";

type Tab = "friends" | "requests" | "discover";

function UserCard({
  u,
  isFollowing,
  isFriend,
  onToggleFollow,
  onAddFriend,
  onRemoveFriend,
}: {
  u: VibexUser;
  isFollowing: boolean;
  isFriend: boolean;
  onToggleFollow: () => void;
  onAddFriend: () => void;
  onRemoveFriend: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/5 transition-all">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
        {u.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{u.displayName}</span>
          <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] text-zinc-500">Lv.{u.level}</span>
        </div>
        <div className="text-xs text-zinc-500">@{u.username} · {u.country}</div>
        <div className="flex items-center gap-3 mt-1 text-[10px] text-zinc-600">
          <span>{u.wins}W / {u.losses}L</span>
          <span>{u.coins.toLocaleString()} coins</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {isFriend ? (
          <button
            onClick={onRemoveFriend}
            className="flex items-center gap-1 rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-[10px] font-bold text-red-400 hover:bg-red-500/20"
          >
            <UserX size={10} />
            Unfriend
          </button>
        ) : (
          <button
            onClick={onAddFriend}
            className="flex items-center gap-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-2.5 py-1 text-[10px] font-bold text-[#00f0ff] hover:bg-[#00f0ff]/20"
          >
            <UserPlus size={10} />
            Add Friend
          </button>
        )}
        <button
          onClick={onToggleFollow}
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
            isFollowing
              ? "bg-white/5 border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/20"
              : "bg-[#7b61ff]/10 border border-[#7b61ff]/20 text-[#7b61ff] hover:bg-[#7b61ff]/20"
          }`}
        >
          {isFollowing ? <><UserCheck size={10} /> Following</> : <><UserPlus size={10} /> Follow</>}
        </button>
      </div>
    </div>
  );
}

export default function FriendsPage() {
  const { isLoggedIn, social, toggleFollow, addFriend, removeFriend } = useVibex();
  const [tab, setTab] = useState<Tab>("friends");
  const [search, setSearch] = useState("");
  const [handledRequests, setHandledRequests] = useState<Record<string, "accepted" | "rejected">>({});

  if (!isLoggedIn) {
    return (
      <>
        <VibexHeader />
        <div className="flex flex-col items-center justify-center p-8 pt-32 text-center">
          <Users size={48} className="mb-4 text-zinc-700" />
          <p className="mb-4 text-zinc-500">Sign up to connect with friends</p>
          <Link href="/vibex/signup" className="rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] px-6 py-2.5 text-sm font-bold text-black">
            Join VibeX
          </Link>
        </div>
      </>
    );
  }

  const friendUsers = MOCK_USERS.filter((u) => social.friends.includes(u.id));
  const allOtherUsers = MOCK_USERS.filter((u) => u.id !== "u1");
  const pendingRequests = MOCK_FRIEND_REQUESTS.filter((r) => !handledRequests[r.id]);

  const filtered = allOtherUsers.filter((u) => {
    if (!search) return true;
    return u.username.toLowerCase().includes(search.toLowerCase()) || u.displayName.toLowerCase().includes(search.toLowerCase());
  });

  const handleRequest = (reqId: string, userId: string, action: "accept" | "reject") => {
    setHandledRequests((prev) => ({ ...prev, [reqId]: action === "accept" ? "accepted" : "rejected" }));
    if (action === "accept") {
      addFriend(userId);
    }
  };

  return (
    <>
      <VibexHeader />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black flex items-center gap-2">
            <Users size={20} className="text-[#7b61ff]" />
            Friends
          </h1>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>{social.following.length} following</span>
            <span>·</span>
            <span>{social.friends.length} friends</span>
          </div>
        </div>

        {/* Privacy indicator */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          {social.isPublic ? (
            <><Globe size={14} className="text-green-400" /><span className="text-xs text-zinc-400">Public Profile — everyone can see your activity</span></>
          ) : (
            <><Shield size={14} className="text-yellow-400" /><span className="text-xs text-zinc-400">Private Profile — only friends can see your activity</span></>
          )}
          <Link href="/vibex/profile" className="ml-auto text-[10px] text-[#00f0ff] flex items-center gap-0.5">
            Settings <ChevronRight size={10} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-white/5 p-1">
          {([
            { key: "friends" as Tab, label: "Friends", count: friendUsers.length },
            { key: "requests" as Tab, label: "Requests", count: pendingRequests.length },
            { key: "discover" as Tab, label: "Discover", count: null },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                tab === t.key ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t.label}
              {t.count !== null && t.count > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                  t.key === "requests" ? "bg-[#ff00e5]/20 text-[#ff00e5]" : "bg-white/10 text-zinc-400"
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#00f0ff]/50 focus:outline-none"
          />
        </div>

        {/* Friends tab */}
        {tab === "friends" && (
          <div className="space-y-2">
            {friendUsers.length === 0 ? (
              <div className="text-center py-8">
                <Users size={32} className="mx-auto mb-2 text-zinc-700" />
                <p className="text-sm text-zinc-500">No friends yet</p>
                <p className="text-xs text-zinc-600 mt-1">Accept requests or add people from Discover</p>
              </div>
            ) : (
              friendUsers.filter((u) => !search || u.username.toLowerCase().includes(search.toLowerCase()) || u.displayName.toLowerCase().includes(search.toLowerCase())).map((u) => (
                <UserCard
                  key={u.id}
                  u={u}
                  isFollowing={social.following.includes(u.id)}
                  isFriend={true}
                  onToggleFollow={() => toggleFollow(u.id)}
                  onAddFriend={() => {}}
                  onRemoveFriend={() => removeFriend(u.id)}
                />
              ))
            )}
          </div>
        )}

        {/* Requests tab */}
        {tab === "requests" && (
          <div className="space-y-2">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus size={32} className="mx-auto mb-2 text-zinc-700" />
                <p className="text-sm text-zinc-500">No pending requests</p>
              </div>
            ) : (
              pendingRequests.map((req) => (
                <div key={req.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
                      {req.from.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{req.from.displayName}</div>
                      <div className="text-xs text-zinc-500">@{req.from.username} · Lv.{req.from.level} · {req.from.country}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleRequest(req.id, req.from.id, "accept")}
                      className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b61ff] py-2 text-xs font-bold text-black hover:scale-[1.02] transition-all"
                    >
                      <UserCheck size={12} /> Accept
                    </button>
                    <button
                      onClick={() => handleRequest(req.id, req.from.id, "reject")}
                      className="flex-1 flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 py-2 text-xs text-zinc-400 hover:text-red-400 hover:border-red-500/20"
                    >
                      <UserX size={12} /> Decline
                    </button>
                    <Link
                      href="/vibex/messages"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
                    >
                      <MessageCircle size={14} className="text-zinc-400" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Discover tab */}
        {tab === "discover" && (
          <div className="space-y-2">
            {filtered.map((u) => (
              <UserCard
                key={u.id}
                u={u}
                isFollowing={social.following.includes(u.id)}
                isFriend={social.friends.includes(u.id)}
                onToggleFollow={() => toggleFollow(u.id)}
                onAddFriend={() => addFriend(u.id)}
                onRemoveFriend={() => removeFriend(u.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

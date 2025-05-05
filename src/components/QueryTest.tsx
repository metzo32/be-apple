"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// 1. 유저 목록 불러오기
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("데이터 로딩 실패");
  return res.json();
}

// 2. 유저 추가 요청 (가짜 API, 실제로는 저장되지 않음)
async function addUser(newUser: { name: string }) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) throw new Error("유저 추가 실패");
  return res.json();
}

export default function UserList() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  // useQuery로 유저 리스트 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // useMutation으로 유저 추가
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // 유저 추가 후 목록 refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setName(""); // 입력 초기화
    },
  });

  const handleAddUser = () => {
    if (name.trim()) {
      mutation.mutate({ name });
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  return (
    <div>
      <h2>유저 목록</h2>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={name}
          placeholder="새 유저 이름"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAddUser} disabled={mutation.isPending}>
          {mutation.isPending ? "추가 중..." : "유저 추가"}
        </button>

        {mutation.isError && <p style={{ color: "red" }}>에러 발생!</p>}
        {mutation.isSuccess && <p style={{ color: "green" }}>추가 완료!</p>}
      </div>
    </div>
  );
}

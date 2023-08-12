"use client";

import type { FormEvent } from "react";

export function AIForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = new FormData(e.currentTarget);
    async function get() {
      const body = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.get("prompt"),
        }),
      });

      return body.json();
    }

    get();
  };
  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        name="prompt"
        placeholder="What's happening?"
        className="bg-inherit border border-gray-500 rounded-sm px-1 placeholder-gray-500"
      />
      <button className=" cursor-pointer border-fuchsia-200">Send</button>
    </form>
  );
}

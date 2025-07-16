"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/auth/register", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);
        

  return (
    <div>foo
    </div>
  );
}

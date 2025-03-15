"use client";
import { useState } from "react";
import Head from "next/head";
import AppBar from "./appbar";
import Drawer from "./drawer";

export default function MainLayout({
  title = "Welcome To Admin Panel",
  children = <></>,
  className = "bg-[#f1f5f9]",
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer open={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <main
        className={`min-h-screen ${className}`}
        style={{
          marginLeft: isOpen ? "280px" : "72px",
          width: isOpen ? "calc(100vw - 280px)" : "calc(100vw - 72px)",
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <AppBar />
        {/* ✅ Fix: Add children here */}
        <div style={{ padding: "20px" }}>{children}</div>
      </main>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import styles from "./InstallAppButton.module.css";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallAppButton() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // ✅ derive values instead of storing in state
  const isIOS =
    typeof window !== "undefined" &&
    /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

  const isStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true);

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();

    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  if (isStandalone) return null;

  if (isIOS) {
    return (
      <div className={styles.installHint}>
        <strong>Install Rentulator</strong>
        <span>Tap Share → Add to Home Screen</span>
      </div>
    );
  }

  if (!installPrompt) return null;

  return (
    <button onClick={handleInstall} className={styles.installBtn}>
      Install App
    </button>
  );
}
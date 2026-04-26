// hooks/useNotification.ts
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types";

export const useNotification = (messages: Message[]) => {
  const [previousCount, setPreviousCount] = useState(messages.length);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  // طلب إذن الإشعارات
  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  // تسجيل أول تفاعل للمستخدم
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        setCanPlaySound(true);
        console.log("✅ User interacted - sound can now play");
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const audioUrl = "https://assets.mixkit.co/active_storage/sfx/259/259-preview.mp3";
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.5;
    
    console.log("🎵 Audio element created");
  }, []);

  const playSoundSafe = async () => {
    if (!audioRef.current) {
      console.log("❌ Audio element not ready");
      return false;
    }

    if (!canPlaySound && !hasInteractedRef.current) {
      console.log("🔇 Sound blocked: User hasn't interacted with page yet");
      return false;
    }

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      console.log("✅ Sound played successfully");
      return true;
    } catch (error) {
      const err = error as Error;
      console.log("❌ Audio playback error:", err.name, err.message);
      
      if (err.name === "NotAllowedError") {
        console.log("🔇 Autoplay blocked - waiting for user interaction");
      }
      return false;
    }
  };

  useEffect(() => {
    if (messages.length > previousCount) {
      const latestMessage = messages[0];
      setNewMessage(latestMessage);
      
      playSoundSafe();
      
      if (Notification.permission === "granted") {
        new Notification("📬 رسالة جديدة", {
          body: `من: ${latestMessage.firstName} ${latestMessage.lastName}`,
          icon: "/favicon.ico",
        });
      }
      
      setTimeout(() => setNewMessage(null), 5000);
    }
    setPreviousCount(messages.length);
  }, [messages.length]);

  return { 
    newMessage, 
    setNewMessage, 
    requestNotificationPermission,
    canPlaySound 
  };
};
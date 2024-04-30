import { useEffect, useState } from "react";
import io from "socket.io-client";

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketUrl = `${import.meta.env.VITE_SOCKET_URL}`; // Adjust URL based on your setup
    const newSocket = io(socketUrl);

    newSocket.on("connect", () => {
      console.log("WebSocket connected");
    });

    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit("new-announcement", message.payload);
    }
  };

  return { socket, sendMessage };
};

export default useWebSocket;

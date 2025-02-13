import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages: ", messages);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div ref={lastMessageRef} key={message._id}>
            <Message message={message} />
          </div>
        ))}
      {/* loading(skeleton) */}
      {loading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}{" "}
      {/* if no messages*/}
      {!loading && messages.length === 0 && (
        <div className="w-full h-full flex justify-center items-center text-center text-white text-xl font-semibold">
          <p>Send a message to start the conversation.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;

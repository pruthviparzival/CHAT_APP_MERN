import { useEffect } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations, setConversations } = useGetConversations();
  const { searchedConversations } = useConversation();
  useEffect(() => {
    if (searchedConversations) {
      setConversations(searchedConversations);
    } else {
      useGetConversations().getConversations();
    }
  }, [searchedConversations, setConversations]);

  // console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.length === 0 && !loading && (
        <div className="text-center text-white text-2xl">No users found</div>
      )}
      {conversations.map((conversation, idx) => {
        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        );
      })}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;

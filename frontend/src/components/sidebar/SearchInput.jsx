import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSearchedConversations } = useConversation();
  const { conversations } = useGetConversations();

  useEffect(() => {
    if (conversations) {
      const filteredConversations = conversations.filter((c) =>
        c.fullName.toLowerCase().startsWith(search.toLowerCase())
      );
      setSearchedConversations(filteredConversations);
    }
  }, [search, conversations, setSearchedConversations]);

  return (
    <form className="flex items-center w-full justify-between gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IoSearchSharp className="w-6 h-6 outline-none text-white" />
    </form>
  );
};
export default SearchInput;

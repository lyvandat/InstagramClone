import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { PlusIcon } from "@heroicons/react/24/solid";

// minifaker: dummy data
import { name, array, email } from "minifaker";
import "minifaker/locales/en";

import AvatarCircle from "../ui/AvatarCircle";

// ***để hide scrollbar thì cần cài thêm package npm install tailwind-scrollbar-hide và dùng class scrollbar-hide
const Stories: React.FC = () => {
  const { data: session } = useSession();

  const [users, setUsers] = useState<
    {
      uid?: string | null;
      name?: string | null;
      username?: string | null;
      image?: string | null;
      email?: string | null;
    }[]
  >([]);

  useEffect(() => {
    const data: {
      uid?: string | null;
      name?: string | null;
      username?: string | null;
      image?: string | null;
      email?: string | null;
    }[] = array(20, () => {
      const fullName = name({ locale: "en" });
      const username = fullName.split(" ").join("").toLowerCase();
      return {
        uid: Math.random().toString(),
        name: fullName,
        username: username,
        email: email(),
        image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      };
    });

    setUsers(data);
  }, [session]);

  return (
    <section className="px-6 py-5 mb-4 bg-white overflow-auto scrollbar-hide rounded-lg border border-gray-300 shadow-sm">
      <ul className="flex">
        {session && (
          <li
            key={session?.user.uid}
            className="relative p-[1px] border-red-400 border-2 rounded-full flex items-center mr-5"
          >
            <AvatarCircle
              src={session?.user.image}
              width={60}
              height={60}
              alt={session?.user.name}
              className="w-[60px] h-[60px]"
            />
            <h3 className="absolute mt-[2px] top-full left-0 w-full max-w-[68px] text-[12px] text-center truncate">
              {session?.user.username}
            </h3>
            <div className="absolute w-full h-full left-[0px] top-0 flex items-center justify-center bg-gray-900/70 hover:brightness-110 rounded-full z-1 cursor-pointer">
              <PlusIcon className="h-6 text-white font-semibold stroke stroke-white opacity-80 hover:opacity-100" />
            </div>
          </li>
        )}
        {users?.map((user) => {
          return (
            <li
              key={user.uid}
              className="relative p-[1px] border-red-400 border-2 rounded-full flex items-center mr-5"
            >
              <AvatarCircle
                src={user.image}
                width={60}
                height={60}
                alt={user.name}
                className="w-[60px] h-[60px]"
              />
              <h3 className="absolute mt-[2px] top-full left-0 w-full max-w-[68px] text-[12px] text-center truncate">
                {user.username}
              </h3>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Stories;

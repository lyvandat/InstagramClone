// *** Need test: nếu user ko login thì phần user ở more hiển thị ntn.

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import MiniProfile from "../item/MiniProfile";

// fake user data
import { array, name, email } from "minifaker";
import "minifaker/locales/en";

const More: React.FC = () => {
  const [moreUsers, setMoreUsers] = useState<
    {
      uid: string;
      name: string;
      username: string;
      email: string;
      image: string;
    }[]
  >([]);

  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    const fakeUsers = array(8, () => {
      const fullName = name();
      const username = fullName.split(" ").join("").toLowerCase();
      return {
        uid: Math.random().toString(),
        name: fullName,
        username,
        email: email(),
        image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      };
    });

    setMoreUsers(fakeUsers);
  }, []);

  return (
    <section className="col-span-1 hidden md:block pt-6">
      <MiniProfile user={session?.user} button="Switch" />
      <div className="flex items-center mt-4 mb-3">
        <p className="text-sm font-semibold text-gray-500 mr-auto capitalize">
          Suggestions for you
        </p>
        <button className="capitalize text-gray-900 font-medium text-[12px]">
          See All
        </button>
      </div>
      <ul className="">
        {moreUsers.map((user) => (
          <MiniProfile
            key={user.uid}
            user={user}
            className="mb-4 items-center"
          />
        ))}
      </ul>
    </section>
  );
};

export default More;

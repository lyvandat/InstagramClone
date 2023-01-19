import { sign } from "crypto";
import { signIn } from "next-auth/react";
import AvatarCircle from "../ui/AvatarCircle";

const MiniProfile: React.FC<{
  user?: {
    uid?: string | null;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    email?: string | null;
  };
  button?: string;
  className?: string;
}> = ({
  user = {
    uid: Math.random().toString(),
    name: "defaultName",
    username: "Defaultusername",
    image:
      "https://th.bing.com/th/id/R.fc15c272ac709ac76e60d0898f65c3b6?rik=OQgMi36FGaP4fA&pid=ImgRaw&r=0",
    email: "defaultEmail",
  },
  button = "Follow",
  className = "",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <AvatarCircle
        src={
          user.image
            ? user.image
            : "https://th.bing.com/th/id/R.fc15c272ac709ac76e60d0898f65c3b6?rik=OQgMi36FGaP4fA&pid=ImgRaw&r=0"
        }
        width={60}
        height={60}
        alt=""
        className={`${
          button === "Switch" ? "w-[60px] h-[60px]" : "w-[32px] h-[32px]"
        }`}
      />
      <div className="ml-3">
        <h3
          className={`text-sm font-semibold ${
            button === "Switch" ? "mt-1" : ""
          }`}
        >
          {user.name}
        </h3>
        <h3 className="text-sm text-gray-500 max-w-[170px] truncate">
          {user.email}
        </h3>
      </div>
      <button
        onClick={() => {
          if (button === "Switch") signIn();
        }}
        className="text-sm text-blue-500 self-center ml-auto"
      >
        {button}
      </button>
    </div>
  );
};

export default MiniProfile;

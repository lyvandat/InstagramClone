import Image from "next/image";
import React from "react";

const AvatarCircle: React.FC<{
  src?: string | null;
  width: number;
  height: number;
  alt?: string | null;
  className: string;
  onClick?: () => void;
}> = ({
  src = "https://th.bing.com/th/id/R.fc15c272ac709ac76e60d0898f65c3b6?rik=OQgMi36FGaP4fA&pid=ImgRaw&r=0",
  width = 60,
  height = 60,
  alt = "",
  className = "",
  onClick = () => {
    return;
  },
}) => {
  return (
    <div
      onClick={onClick}
      className={`shrink-0 cursor-pointer rounded-full overflow-hidden ${className}`}
    >
      <Image
        src={src ? src : ""}
        width={width}
        height={height}
        alt={alt ? alt : ""}
        className="rounded-full object-center"
        layout="responsive"
      />
    </div>
  );
};

export default AvatarCircle;

import React, { useRef, useState, forwardRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { FaceSmileIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

import AvatarCircle from "../ui/AvatarCircle";
import Accordian from "../ui/Accordian";

const Caption = forwardRef<HTMLTextAreaElement>((props, ref) => {
  const { data: session } = useSession();
  const [enteredCaption, setEnteredCaption] = useState("");
  const imageSrc = session?.user.image;
  const username = session?.user.username;

  const countLengthText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredCaption(e.target.value);
  };

  let displayCaptionLength: string | number = enteredCaption.length;

  if (enteredCaption.length >= 1000) {
    displayCaptionLength = `${Math.floor(enteredCaption.length / 1000)},${
      enteredCaption.length % 1000
    }`;
  }

  return (
    <div>
      {/* form */}
      <div className="bg-white">
        {/* info */}
        <div className="px-4 pt-4 pb-2 flex items-center">
          <AvatarCircle
            src={imageSrc}
            width={40}
            height={40}
            alt=""
            className="w-[30px] h-[30px]"
          />
          <h2 className="font-semibold text-sm ml-3">{username}</h2>
        </div>
        <textarea
          value={enteredCaption}
          onInput={countLengthText}
          maxLength={2200}
          placeholder="Write a caption..."
          ref={ref}
          className="w-full h-[156px] px-4 overflow-y-auto outline-none border-none focus:ring-0"
        ></textarea>
        {/* emoji */}
        <div className="w-full flex px-4 justify-between text-gray-500 mb-3">
          <FaceSmileIcon className="h-6" />
          <span className="text-[13px] font-medium opacity-80 self-end hover:text-black hover:opacity-1 cursor-pointer">
            {" "}
            {displayCaptionLength}/2,200
          </span>
        </div>
      </div>

      {/* Location */}
      <div>
        <div className="flex justify-between items-center border-y">
          <input
            placeholder="Add a location..."
            className="w-full py-3 px-4 h-full outline-none focus:border-none focus:ring-0"
          />
          <MapPinIcon className="mr-4 h-5" />
        </div>
      </div>

      {/* accordian */}
      <Accordian
        Icon={<ChevronDownIcon className="h-5 mr-4" />}
        title="Accessibility"
      >
        <p className="text-[12px] leading-[16px] text-gray-500">
          Alt text describes your photos for people with visual impairments. Alt
          text will be automatically created for your photos or you can choose
          to write your own.
        </p>
        <div className="h-[44px] w-[44px]">
          <Image
            src={imageSrc ? imageSrc : ""}
            width={44}
            height={44}
            objectFit="cover"
            layout="responsive"
          />
        </div>
        <input type="text" placeholder="Write alt text..." />
      </Accordian>
      <Accordian
        Icon={<ChevronDownIcon className="h-5 mr-4" />}
        title="Advanced settings"
      ></Accordian>
    </div>
  );
});

export default Caption;

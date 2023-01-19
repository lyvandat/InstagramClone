import React from "react";
import Image from "next/image";

const Accordian: React.FC<{
  title: string;
  Icon: JSX.Element;
  children?: React.ReactNode;
}> = ({ title, Icon, children }) => {
  return (
    <div>
      <div className="flex justify-between items-center py-3 border-b border-gray-300">
        <h2 className="ml-4">{title}</h2>
        {Icon}
      </div>
      <div className="h-0 overflow-hidden">{children}</div>
    </div>
  );
};

{
  /* <p className="text-[12px] leading-[16px] text-gray-500">
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
<input type="text" placeholder="Write alt text..." /> */
}

export default Accordian;

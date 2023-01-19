import React from "react";
import { useRouter } from "next/router";
const Test: React.FC = () => {
  const router = useRouter();
  console.log(router.query);
  return <div></div>;
};

export default Test;

import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import More from "./More";
import Posts from "./Posts";
import Stories from "./Stories";

import { db } from "../../firebase";

type post = {
  id: string;
  image: string;
  imagePost: string;
  name: string;
  caption: string;
};

const Section: React.FC<{ posts: post[] }> = (props) => {
  const { data: session } = useSession();
  return (
    <main
      className={`grid ${
        session
          ? "md:grid-cols-3 md:max-w-4xl grid-cols-2 max-w-3xl"
          : "grid-cols-2 max-w-2xl"
      } mx-auto pt-20`}
    >
      <div className="col-span-2 md:mr-6 p-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts posts={props.posts} />
      </div>
      {/* Follow more */}
      {session && <More />}
    </main>
  );
};

export default Section;

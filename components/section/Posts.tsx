import Post from "../item/Post";

type post = {
  id: string;
  image: string;
  imagePost: string;
  name: string;
  caption: string;
};

// const DUMMY_POST = [
//   {
//     id: "1",
//     image:
//       "https://th.bing.com/th/id/R.4b1ce3e0b06194eddf4ab55e5318e100?rik=%2ffyQUwTTkdNWnw&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20140630192147%2ftouch-of-magic%2fimages%2fa%2fa9%2fSunny-l-landscape-nature-panorama-scene-scenic-chan-1247830.jpg&ehk=cIUvJKGnWQ7nGhMxHcstWGFn9WY3wlZx44Bd6oIFo7I%3d&risl=&pid=ImgRaw&r=0",
//     name: "Ly_van_dat_123",
//     caption: "hello everyone from youtube and zalo",
//   },
//   {
//     id: "2",
//     image:
//       "https://th.bing.com/th/id/R.4b1ce3e0b06194eddf4ab55e5318e100?rik=%2ffyQUwTTkdNWnw&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20140630192147%2ftouch-of-magic%2fimages%2fa%2fa9%2fSunny-l-landscape-nature-panorama-scene-scenic-chan-1247830.jpg&ehk=cIUvJKGnWQ7nGhMxHcstWGFn9WY3wlZx44Bd6oIFo7I%3d&risl=&pid=ImgRaw&r=0",
//     name: "Myhejine",
//     caption: "Quán bánh ướt lòng gà ngon nức mũi",
//   },
// ];

const Posts: React.FC<{ posts: post[] }> = (props) => {
  return (
    <section className="">
      <ul className="">
        {props.posts?.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </ul>
    </section>
  );
};

export default Posts;

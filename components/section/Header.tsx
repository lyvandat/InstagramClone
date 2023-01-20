import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

import { MagnifyingGlassIcon, HomeIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftRightIcon,
  FolderPlusIcon,
  MagnifyingGlassCircleIcon,
  HeartIcon,
  BookmarkSquareIcon,
  PhotoIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import AvatarCircle from "../ui/AvatarCircle";
import Modal from "../modal/Modal";
import Caption from "../item/Caption";
// tu tao file
import { ModalState } from "../../models/redux";
import { ModalActions } from "../../store/modal-slice";
import { db, storage } from "../../firebase";

// authentication

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captionTextRef = useRef<HTMLTextAreaElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const imageSrc = session?.user?.image;
  const showModal = useSelector(
    (state: { modal: ModalState }) => state.modal.show
  );

  const signInHomePageHandler = () => {
    signIn();
  };

  const signOutHomePageHandler = () => {
    signOut();
  };

  const showModalNewPost = () => {
    dispatch(ModalActions.open());
  };

  const closeModalNewPost = () => {
    dispatch(ModalActions.close());

    setIsLoading((prevState) => false);
    setSelectedFile((prevState) => null);
  };

  const selectImageFromComputer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files![0]) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target!.result);
    };
  };

  const clickShareButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;

    setIsLoading((prevState) => true);

    const postRef = collection(db, "posts");
    const dataRef = await addDoc(postRef, {
      name: session?.user.name,
      username: session?.user.username,
      image: session?.user.image,
      caption: captionTextRef.current!.value,
      timestamp: serverTimestamp(),
    });

    if (typeof selectedFile === "string") {
      const imageRef = ref(storage, `posts/${dataRef.id}/image`);
      uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          const imageLink = await getDownloadURL(snapshot.ref);

          updateDoc(doc(db, "posts", dataRef.id), {
            imageLink,
          });
        }
      );
    }

    closeModalNewPost();
  };

  return (
    <React.Fragment>
      {showModal && (
        <Modal className="h-[570px]" onClick={closeModalNewPost}>
          <h3 className="px-4 flex justify-between font-semibold text-base text-center py-2 border-b border-gray-300">
            {selectedFile && <ArrowLeftIcon className="h-6" />}
            <p className="text-center w-full">Create new post</p>
            {selectedFile && (
              <button
                disabled={!selectedFile || isLoading}
                onClick={clickShareButton}
                className="text-blue-400 hover:text-blue-600 text-thin text-sm disabled:cursor-not-allowed disabled:hover:text-blue-400"
              >
                Share
              </button>
            )}
          </h3>
          <div className="flex">
            <div className="w-[530px] h-[90%] flex flex-col items-center">
              {!selectedFile ? (
                //  left content
                <React.Fragment>
                  <div className="mt-44 flex justify-center">
                    <BookmarkSquareIcon className="relative right-[-16px] h-[72px] font-thin stroke rotate-[-3deg] fill-white stroke" />
                    <PhotoIcon className="relative left-[-16px] top-[12px] h-[72px] font-thin stroke rotate-[5deg] fill-white stroke" />
                  </div>
                  <h2 className="text-gray-900 text-[22px] font-light mt-4 mb-5">
                    Drag photos and videos here
                  </h2>
                  <input
                    onChange={selectImageFromComputer}
                    ref={fileInputRef}
                    type="file"
                    hidden
                  />
                  <button
                    onClick={() => {
                      fileInputRef!.current!.click();
                    }}
                    className="text-white text-sm font-semibold bg-blue-500/90 px-[10px] pt-1 pb-[6px] rounded-[4px]"
                    type="button"
                  >
                    Select from computer
                  </button>
                </React.Fragment>
              ) : (
                <div className="w-full">
                  <Image
                    src={selectedFile}
                    alt="upload image"
                    width={530}
                    height={530}
                    layout="responsive"
                    objectFit="cover"
                    className="max-w-full max-h-full"
                    onClick={() => {
                      setSelectedFile("");
                    }}
                  />
                </div>
              )}
            </div>
            {/* right content */}
            <div
              className={`bg-white ${
                selectedFile ? "w-[340px]" : "w-[0px] overflow-hidden"
              } transition-all duration-100 ease-out`}
            >
              <Caption ref={captionTextRef} />
            </div>
          </div>
        </Modal>
      )}
      <section className="fixed left-0 top-0 border-b border-gray-300 bg-white shadow-sm w-full z-10">
        <div className="mx-auto max-w-5xl flex flex-row items-center p-2 ">
          <div className="flex items-center">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
              alt="instagram-logo"
              width={112}
              height={42}
              onClick={(e: React.MouseEvent) => {
                router.push("/");
              }}
            />
          </div>

          <div className="hidden sm:flex mr-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute items-center justify-self-center">
            <MagnifyingGlassIcon className="text-gray-500 absolute h-6 w-5 left-4" />
            <input
              type="text"
              placeholder="Search"
              className="py-[6px] font-thin text-base bg-gray-200/60 w-[270px] pl-12 border-none rounded-md focus:ring-0"
            ></input>
          </div>
          <div className="flex items-center ml-auto sm:ml-none">
            {session && router.pathname === "/" && (
              <div className="flex">
                <HomeIcon className="header-icon" />
                <ChatBubbleLeftRightIcon className="header-icon" />
                <FolderPlusIcon
                  onClick={showModalNewPost}
                  className="header-icon"
                />
                <MagnifyingGlassCircleIcon className="header-icon" />
                <HeartIcon className="header-icon" />
              </div>
            )}

            {session?.user && (
              <AvatarCircle
                src={
                  imageSrc
                    ? imageSrc
                    : "https://th.bing.com/th/id/R.fc15c272ac709ac76e60d0898f65c3b6?rik=OQgMi36FGaP4fA&pid=ImgRaw&r=0"
                }
                width={40}
                height={40}
                alt=""
                className="w-[30px] h-[30px]"
                onClick={signOutHomePageHandler}
              />
            )}

            {!session?.user && (
              <button
                onClick={signInHomePageHandler}
                className="px-4 py-2 text-gray-900 bg-gray-200 rounded-xl font-semibold hover:bg-gray-400 hover:brightness-110 whitespace-nowrap"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Header;

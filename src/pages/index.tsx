import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetStaticProps } from "next";
import { getSortedPostsData } from "@/utils/posts";
import { PostInfo } from "@/types/types";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ posts }: { posts: PostInfo[] }) {
  return (
    <>
      <Head>
        <title>Create Next App11111</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* <div>Onboarding 대기 7월3일 OT 12시 30분 오후 시작 </div> */}
        {posts.map(({ id, title, date }: PostInfo) => (
          <Link href={`posts/${id}`} key={id}>
            {title}
            <br />
            {date}
          </Link>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllSortedPostsData } from "@/utils/posts";
import { PostMeta } from "@/types/types";
import styles from "@/styles/Home.module.scss";

const meta_Headerdata = {
  title: "Next.js Blog",
  description: "Next.js로 만든 블로그 입니다 ",
};

interface Props {
  allPostsData: PostMeta[];
}

export default function Home({ allPostsData }: Props) {
  console.log(allPostsData);
  return (
    <>
      <Head>
        <title>Create Next App11111</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        {allPostsData.map((post, index) => (
          <Link href={`/${post.id}`} key={index} className={styles.card}>
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <p>{post.date}</p>
            <p>Read More</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getAllSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

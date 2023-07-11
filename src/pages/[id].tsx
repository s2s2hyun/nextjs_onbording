import { PostData } from "@/types/types";
import { getAllSortedPostsData, getPostData } from "@/utils/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import styles from "@/styles/sass/styles.module.scss";

interface BlogPostPageProps {
  postData: PostData;
}

export default function BlogPostPage({ postData }: BlogPostPageProps) {
  console.log(postData, " postData : 는 현재 뭐가 나오고있어 ");
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{postData.title}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsData = await getAllSortedPostsData();
  const paths = allPostsData.map((data) => ({
    params: { id: data.id }, // 각 페이지에 필요한 파라미터를 지정
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const id = params?.id as string;
  const postData = await getPostData(id);

  return {
    props: {
      postData,
    },
  };
};

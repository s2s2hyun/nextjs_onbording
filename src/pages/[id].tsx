import { PostData } from "@/types/types";
import { getAllSortedPostsData, getPostData } from "@/utils/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import styles from "@/styles/sass/styles.module.scss";

interface BlogPostPageProps {
  postData: PostData;
}
// <div className={styles.content}>는 포스트의 내용을 나타내는 부분입니다. dangerouslySetInnerHTML 속성을 사용하여
//  HTML 문자열을 동적으로 설정합니다. 이는 해당 포스트의 HTML 내용을 그대로 출력하기 위해 사용됩니다.
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

// getStaticPaths 함수를 통해서 , 이 함수는 동적 라우팅을 위해 필요한 경로를 생성합니다.
// getAllSotrtedPostsData 함수를 통해 모든 포스트 데이터를 가져옵니다.
// map 함수를 사용하여 , 각 포스트의 id 를 사용하여 경로 객체를 생성합니다. 이렇게 생성된  경로들은 동적 라우팅에 사용됩니다.
// { paths, fallback: false }; 를 반환하며 생성된 경로와 fallback 값을 설정합니다. 여기서는 fallback 을 false 로 설정하여
// 없는 경로로 접근시 404 페이지로 처리 되도록 합니다.

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsData = await getAllSortedPostsData();
  const paths = allPostsData.map((data) => ({
    params: { id: data.id }, // 각 페이지에 필요한 파라미터를 지정
  }));

  return { paths, fallback: false };
};

// getStaticProps 함수는 빌드 시점에 페이지에 필요한 데이터를 가져옵니다. params 를 사용하여 요청된 포스트의 id 를 추출합니다.
// getPostData 함수를 사용하여 id 에 해당하는 포스트 데이터를 가져옵니다.
// postData 를 props 객체에 담아 반환합니다.

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

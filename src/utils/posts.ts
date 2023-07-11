import { PostData, PostMeta } from "@/types/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";

// 변수에 현재 작업 디렉토리의 경로와 '__posts' 폴더를 합쳐서 할당합니다.

const postsDir = path.join(process.cwd(), "__posts");

// getAllSortedPostsData()  함수는 '__posts' 폴더에 모든 파일의 이름을 가져와서 '.md' 확장자를 제거한후
// 각 파일의 내용을 읽어 옵니다. matter 패키지를 사용하여 파일 내용을 파싱하고 , 필요한 데이터와 함께 PostMeta 객체로 반환합니다.
// 이렇게 모든 포스트 데이터는 날짜를 기준으로 정렬되어 리턴됩니다.

export function getAllSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return { id, ...matterResult.data } as PostMeta;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// getPostData 함수는 주어진 ID 를 기반으로 해당 포스트 데이터를 가져옵니다.
// ID 를 사용하여 해당 포스트의 '.md' 파일의 전체 경로를 결정하고 , 파일 내용을 읽어옵니다.
// 그리고 matter 패키지를 사용하여 파일 내용을 파싱하고 , remark , remarkHtml 을 사용하여 Markdown 파일 내용을 HTML 로 변환합니다.
// 이렇게 변환된 HTML 내용과 필요한 데이터를 포함한 PostData  객체로 반환합니다.

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedResult = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedResult.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as PostData;
}

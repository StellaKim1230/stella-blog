import { Disqus } from "gatsby-plugin-disqus"
// type Props = {
//   siteUrl: string
//   path: string
//   title: string
// }
const Comment = (siteUrl, path, title) => {
  const config = {
    url: `${siteUrl}${path}`, // 페이지 주소
    identifier: path, // 페이지의 유니크한 값
    title, // 페이지 제목
  }
  return <Disqus config={config} />
}

export default Comment

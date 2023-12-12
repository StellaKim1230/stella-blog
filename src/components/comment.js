import { Disqus, CommentCount } from "gatsby-plugin-disqus"

const Comment = () => {
  const config = {
    url,
    identifier,
    title,
  }

  // return <Disqus config={config} />
  return (
    <>
      <CommentCount config={disqusConfig} placeholder={"..."} />
      /* Post Contents */
      <Disqus config={disqusConfig} />
    </>
  )
}

export default Comment

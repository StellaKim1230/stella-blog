/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Twitter from "../assets/twitter.svg"
import Github from "../assets/github.svg"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
            catchphrase
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile Pic"
      />
      <div>
        <>
          <p style={{ alignItems: "center" }}>
            {author?.catchphrase || null} Written by&nbsp;
            <strong>{author?.name}</strong>
          </p>
          <p>{author?.summary || null}</p>
        </>
        <a
          href={`https://twitter.com/${social?.twitter || ``}`}
          target="_blank"
          style={{ height: 30 }}
        >
          <Twitter />
        </a>
        <a
          href={`https://github.com/${social?.github || ``}`}
          target="_blank"
          style={{ height: 30 }}
        >
          <Github />
        </a>
      </div>
    </div>
  )
}

export default Bio

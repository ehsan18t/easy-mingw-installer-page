import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './markdown.css'

const Markdown = ({ url }) => {
  const [markdown, setMarkdown] = React.useState('')
  const axiosConfig = {
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  }
  React.useEffect(() => {
    axios.get(url, axiosConfig).then((res) => setMarkdown(res.data))
  }, [url])
  return ReactDom.render(
    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>,
    document.body
  )
}

export default Markdown

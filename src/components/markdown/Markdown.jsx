import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import './markdown.css';

const Markdown = ({ markdown, className }) => {
  return (
    <ReactMarkdown className={className} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;

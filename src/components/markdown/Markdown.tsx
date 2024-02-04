import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import './markdown.css';

type MarkdownProps = {
  markdown: string;
  className?: string;
};

const Markdown = ({ markdown, className }: MarkdownProps) => {
  return (
    <ReactMarkdown className={className} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;

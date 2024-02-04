type TextSectionProps = {
  title: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
};

const TextSection = ({ title, content, backgroundColor, textColor }: TextSectionProps) => {
  const sectionStyle = {
    backgroundColor: backgroundColor || 'bg-gray-100',
    color: textColor || 'text-gray-700',
  };

  return (
    <section
      className={`border border-gray-300 px-2 py-10  md:px-4 lg:px-6 ${sectionStyle.backgroundColor}`}>
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className={`text-justify text-lg ${sectionStyle.color}`}>{content}</p>
      </div>
    </section>
  );
};

export default TextSection;

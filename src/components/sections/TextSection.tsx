const TextSection = ({ title, content, backgroundColor, textColor }) => {
  const sectionStyle = {
    backgroundColor: backgroundColor || 'bg-gray-100',
    color: textColor || 'text-gray-700',
  };

  return (
    <div
      className={`border border-gray-300 px-2 py-10  md:px-4 lg:px-6 ${sectionStyle.backgroundColor}`}>
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className={`text-justify text-lg ${sectionStyle.color}`}>{content}</p>
      </div>
    </div>
  );
};

export default TextSection;

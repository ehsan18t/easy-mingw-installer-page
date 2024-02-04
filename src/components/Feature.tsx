type FeatureProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function Feature({ title, description, icon }) {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center justify-center rounded-full bg-blue-500 p-4 text-2xl text-white'>
        {icon}
      </div>
      <div>
        <h3 className='mb-2 text-lg font-semibold'>{title}</h3>
        <p className='text-justify text-gray-700'>{description}</p>
      </div>
    </div>
  );
}

import { FaBoxOpen, FaCheckCircle, FaCode } from 'react-icons/fa';

const Feature = ({ title, description, icon }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center rounded-full bg-blue-500 p-4 text-2xl text-white">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-justify text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="mb-6 mt-6 flex flex-col justify-between">
      <h2 className="mb-8 text-center text-3xl font-semibold">Features</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Feature
          title="Easy Installation"
          description="Simplify the process of setting up MinGW with just two clicks."
          icon={<FaCheckCircle />}
        />
        <Feature
          title="Latest GCC Version"
          description="Get access to the latest version of GCC for enhanced development."
          icon={<FaCode />}
        />
        <Feature
          title="Essential Packages"
          description="Included essential packages to kickstart your production environment."
          icon={<FaBoxOpen />}
        />
        {/* Add more Feature components here */}
      </div>
    </div>
  );
};

export default Features;

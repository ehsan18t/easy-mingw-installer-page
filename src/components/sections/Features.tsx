import { Feature } from '@/components';
import { FaBoxOpen, FaCheckCircle, FaCode } from 'react-icons/fa';

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
      </div>
    </div>
  );
};

export default Features;

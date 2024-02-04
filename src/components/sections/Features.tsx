import { FaBoxOpen, FaCheckCircle, FaCode } from 'react-icons/fa';

import { Feature } from '@/components';

const Features = () => {
  return (
    <section className="mx-4 mb-6 mt-6 flex flex-col justify-between md:mx-8 lg:mx-12">
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
    </section>
  );
};

export default Features;

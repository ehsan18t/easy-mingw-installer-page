'use client';

type JumpButtonProps = {
  jumpRef: string;
  children: React.ReactNode;
  className?: string;
};

export default function JumpButton({ jumpRef, children, className }: JumpButtonProps) {
  const jumpTo = (id: string) => {
    const relevantElement = document.getElementById(id);
    relevantElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button onClick={() => jumpTo(jumpRef)} className={className}>
      {children}
    </button>
  );
}

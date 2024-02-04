'use client';

export default function JumpButton({ jumpRef, children, className }) {
  const jumpTo = (id) => {
    const relevantElement = document.getElementById(id);
    relevantElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button onClick={() => jumpTo(jumpRef)} className={className}>
      {children}
    </button>
  );
}

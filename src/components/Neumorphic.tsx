import React from 'react';
import { useTactileAudio } from '../hooks/useTactileAudio';

interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'elevated' | 'recessed' | 'pill';
  soundType?: 'thock' | 'click' | 'nav' | 'toggle';
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  variant = 'pill',
  soundType = 'thock',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const { playSound } = useTactileAudio();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound(soundType as 'thock' | 'click' | 'nav' | 'toggle');
    if (onClick) onClick(e);
  };

  const baseClasses =
    'rounded-full transition-all duration-300 ease-in-out bg-slate-800 text-slate-200 border border-slate-700 focus-neu outline-none cursor-pointer';

  let variantClasses = '';
  if (variant === 'elevated') {
    variantClasses =
      'shadow-lg hover:bg-slate-700 hover:text-cyan-400 hover:border-cyan-900 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] active:translate-y-[2px] active:shadow-none';
  } else if (variant === 'pill') {
    variantClasses =
      'shadow-md hover:bg-slate-700 hover:text-cyan-400 active:translate-y-[1px] active:shadow-none';
  } else {
    variantClasses =
      'shadow-[inset_5px_5px_15px_#080e1c,inset_-5px_-5px_15px_#161f36] hover:bg-slate-700';
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const NeumorphicContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'elevated' | 'recessed';
  borderRadius?: string;
}> = ({ children, className = '', variant = 'recessed', borderRadius = 'rounded-[24px]' }) => {
  const shadowClass =
    variant === 'elevated'
      ? 'shadow-[0_8px_30px_rgb(0,0,0,0.4)]'
      : 'shadow-[inset_5px_5px_15px_#080e1c,inset_-5px_-5px_15px_#161f36]';

  return (
    <div className={`${borderRadius} bg-slate-900 border border-slate-800 ${shadowClass} ${className}`}>
      {children}
    </div>
  );
};

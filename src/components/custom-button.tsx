import clsx from 'clsx';
import React from 'react';
import '../index.css';

interface CustomButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: 'green' | 'red' | 'blue' | 'none';
  fullWidth?: boolean;
}

export default function CustomButton(props: CustomButtonProps) {
  const { children, onClick, color, fullWidth } = props;

  const computedWidth = fullWidth ? 'w-full' : '';
  const computedTextColor = color === 'none' ? 'text-black' : 'text-white';

  let computedColor = '';
  switch (color) {
    case 'green':
      computedColor = 'bg-green-600';
      break;
    case 'red':
      computedColor = 'bg-red-600';
      break;
    case 'blue':
      computedColor = 'bg-blue-600';
      break;
    default:
      computedColor = 'bg-none';
      break;
  }

  return (
    <button
      className={clsx(
        computedWidth,
        computedColor,
        computedTextColor,
        'p-2 px-5 rounded-md shadow-md'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

CustomButton.defaultProps = {
  color: 'none',
  fullWidth: false,
};

import React from 'react';

export default function ThemeToggle() {

    function ToggleTheme() {
      const body = document.querySelector('body');
        body.classList.toggle('dark-mode');
    }

  return (
    <div className='absolute fixed top-3 right-5 z-10'>
      <label className="relative inline-flex items-center cursor-pointer ">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={ToggleTheme}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-grey-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
      </label>
    </div>
  );
}

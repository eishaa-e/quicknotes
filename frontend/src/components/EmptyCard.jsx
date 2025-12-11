import React from 'react';
import { MdStickyNote2 } from 'react-icons/md';

const EmptyCard = ({ message }) => {
    return (
        <div className='flex flex-col items-center justify-center mt-20 opacity-60'>
            <div className="w-24 h-24 flex items-center justify-center bg-slate-200 rounded-full mb-5 text-slate-500">
                <MdStickyNote2 className="text-5xl" />
            </div>

            <p className='w-2/3 text-base font-medium text-slate-700 text-center leading-7 mt-2'>
                {message}
            </p>
        </div>
    )
}

export default EmptyCard;

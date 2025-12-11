import React, { useState } from 'react';
import { X } from 'lucide-react';

const InputTag = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-2 text-xs font-medium text-slate-900 bg-slate-100 px-3 py-1 rounded">
                            # {tag}
                            <button onClick={() => { handleRemoveTag(tag) }} className="hover:text-red-500">
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    className="text-sm bg-transparent border border-slate-300 px-3 py-2 rounded outline-none focus:border-primary transition-colors"
                    placeholder="Add tags"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={inputValue}
                />

                <button
                    className="w-9 h-9 flex items-center justify-center rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    onClick={addNewTag}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default InputTag;

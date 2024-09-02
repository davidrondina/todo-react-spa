import React from 'react'

const TextInput = ({ label, type = 'text', onInputChange, placeholder = '' }) => {
    return (
        <label className="flex flex-col gap-y-1">
            <span className="font-semibold text-sm text-gray-700">{label}</span>
            <input onChange={onInputChange} type={type} name="name" placeholder={placeholder} className="px-2 py-1.5 border border-gray-300 rounded-lg" />
        </label>
    )
}

export default TextInput
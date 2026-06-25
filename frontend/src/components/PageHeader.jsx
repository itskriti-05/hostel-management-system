import React from 'react'

const PageHeader = ({title}) => {
     const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
      <div className="mb-6">
      <h1 className="text-lg font-semibold text-[#083067] dark:text-white">
        {title}
      </h1>
      <p className="text-sm text-gray-400 mt-1">{today}</p>
    </div>
  )
}

export default PageHeader
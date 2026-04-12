import React from 'react'

function FAQnavFooter() {
  return (
    <nav className="faq-bottom-nav fixed left-1/2 bottom-[18px] -translate-x-1/2 w-[min(75%,320px)] bg-[#d4d4d4] rounded-[22px] flex justify-evenly items-center py-4 px-5 box-borde" aria-label="Bottom navigation">
                <div className="faq-nav-icon text-[2rem]" aria-hidden="true">📅</div>
                <div className="faq-nav-icon text-[2rem]" aria-hidden="true">✔</div>
            </nav>
  )
}

export default FAQnavFooter




import { FAQItemProps } from '../../utils/props/faq';
import React, { useState } from "react";
function FAQItem({ id, question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleItem() {
    setIsOpen(!isOpen);
  }

  return (
    <article className="faq-item" key={id}>
                <button
                    className="faq-question-row"
                    type="button"
                    onClick={() => toggleItem(String(id): }
                    aria-expanded={isOpen}
                >
                    <span className="faq-question-text">
                        {question}
                    </span>
                    <span className={`faq-arrow ${isOpen ? "open" : ""}`}>
                        ›
                    </span>
                </button>

                {isOpen && (
                    <p className="faq-answer">{answer}</p>
                )}
            </article>
        );
}

export default FAQItem;
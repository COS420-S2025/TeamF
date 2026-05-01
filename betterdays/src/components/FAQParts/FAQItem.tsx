
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
                    data-testid="faqbutton"
                    type="button"
                    onClick={() => toggleItem() }
                    aria-expanded={isOpen}
                >
                    <span data-testid="question" className="faq-question-text">
                        {question}
                    </span>
                    <span data-testid="arrow" className={`faq-arrow ${isOpen ? "open" : ""}`}>
                        ›
                    </span>
                </button>

                {isOpen && (
                    <p data-testid="answer" className="faq-answer">{answer}</p>
                )}
            </article>
        );
}

export default FAQItem;
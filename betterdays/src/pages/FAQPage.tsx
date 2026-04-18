import React, { useState } from "react";
import { faqItems } from "../utils/easyData/faq";
import FAQHeader from "../components/FAQParts/FAQHeader"; //I got started on some of the components, have't ran working tests so might not work but the idea is their.
import FAQItem from "../components/FAQParts/FAQItem"; //Here is where the Item is being worked on. I think it is appropriate to run the loop in the page.
import FAQnavFooter from "../components/FAQParts/FAQnavFooter";
const FAQPage: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    function toggleItem(id: number): void {
        setOpenId((currentId) => (currentId === id ? null : id));
    }

    /*<button className="faq-menu-button" aria-label="Open menu" type="button">
                    <span />
                    <span />
                    <span />
                </button>*/
    return (
        <div className="faq-page min-h-screen bg-[#f2f2f2] text-[#111111] flex flex-col pb-[120px] box-border">
            <FAQHeader />

            <section className="faq-list" aria-label="Frequently asked questions" style={{ borderTop: '1px solid #000', padding: '0 24px' }}>
    {faqItems.map((item) => {
        const isOpen = openId === item.id;

        return (
            // <article className="faq-item" key={item.id}>
            //     <button
            //         className="faq-question-row"
            //         type="button"
            //         onClick={() => toggleItem(item.id)}
            //         aria-expanded={isOpen}
            //     >
            //         <span className="faq-question-text">
            //             {item.question}
            //         </span>
            //         <span className={`faq-arrow ${isOpen ? "open" : ""}`}>
            //             ›
            //         </span>
            //     </button>

            //     {isOpen && (
            //         <p className="faq-answer">{item.answer}</p>
            //     )}
            // </article>
            <article key={item.id} style={{ borderBottom: '1px solid #000' }}>
                <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                    }}
                >
                    <span style={{ fontSize: '24px', fontWeight: 400, color: '#111111' }}>
                        {item.question}
                    </span>
                    <span style={{
                        fontSize: '24px',
                        color: '#111111',
                        display: 'inline-block',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                    }}>
                        ›
                    </span>
                </button>
                {isOpen && (
                    <p style={{
                        margin: 0,
                        paddingBottom: '20px',
                        fontSize: '16px',
                        lineHeight: 1.6,
                        maxWidth: '520px',
                        color: '#111111',
                    }}>
                        {item.answer}
                    </p>
                )}
            </article>
        );
    })}
</section>

            <FAQnavFooter />
        </div>
    );
}

export default FAQPage;
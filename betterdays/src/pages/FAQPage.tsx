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

            <section className="faq-list" aria-label="Frequently asked questions">
    {faqItems.map((item) => {
        const isOpen = openId === item.id;

        return (
            <article className="faq-item" key={item.id}>
                <button
                    className="faq-question-row"
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                >
                    <span className="faq-question-text">
                        {item.question}
                    </span>
                    <span className={`faq-arrow ${isOpen ? "open" : ""}`}>
                        ›
                    </span>
                </button>

                {isOpen && (
                    <p className="faq-answer">{item.answer}</p>
                )}
            </article>
            //This entire article can just be replaced with the component I made I just though I would leave it to you becuase I am not certain I got it to work.
            //The idea is a parent encompasses 3 "cards" or n-cards if n% ≠ 0, each card is named with an id and each parent also
            //So their is a lot of create freedom to work with here. This is an intro bento-box style page. 
            //Or make it whatever you want. Who cares, the freedom is there.
            //I also am currently learning tailwind so... I saw FAANG has found css to be almost entirely obsolete becuase it adds complexity so I would not bother trying to 
            //learn it in this project and go straight to tailwind. It is the same thing aside from the nomenclature and animations - I think.
        );
    })}
</section>

            <FAQnavFooter />
        </div>
    );
}

export default FAQPage;
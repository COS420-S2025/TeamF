import React, { useState } from "react";
import "./FAQPage.css";

type FAQItem = {
    id: number;
    question: string;
    answer: string;
};

const faqItems: FAQItem[] = [
    {
        id: 1,
        question: "How do I add a new task?",
        answer:
            "Open the Tasks page, create a new task entry, and save it so it appears in your task list.",
    },
    {
        id: 2,
        question: "How do I view my events?",
        answer:
            "Use the Calendar page to switch between month, week, and day views to see your scheduled events.",
    },
    {
        id: 3,
        question: "Can I connect tasks to calendar events?",
        answer:
            "That is the long-term goal of the app. Tasks and calendar features are being built so they can work together in one place.",
    },
    {
        id: 4,
        question: "Will this app work on phones?",
        answer:
            "Yes. This interface is being designed with phone-sized screens in mind so navigation and page layouts stay simple and readable.",
    },
    {
        id: 5,
        question: "Can I edit or remove items later?",
        answer:
            "That depends on which feature is implemented, but the intended workflow is to let users update or delete tasks and events as needed.",
    },
    {
        id: 6,
        question: "Where can I get help using the app?",
        answer:
            "Use this FAQ page as a quick reference for common questions about navigation, tasks, and calendar behavior.",
    },
];

export default function FAQPage(): React.JSX.Element {
    const [openId, setOpenId] = useState<number | null>(null);

    function toggleItem(id: number): void {
        setOpenId((currentId) => (currentId === id ? null : id));
    }

    return (
        <div className="faq-page">
            <header className="faq-header">
                <button className="faq-menu-button" aria-label="Open menu" type="button">
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="faq-title">FAQ</h1>
            </header>

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
                                <span className="faq-question-text">{item.question}</span>
                                <span className={`faq-arrow ${isOpen ? "open" : ""}`}>
                                    ›
                                </span>
                            </button>

                            {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
                        </article>
                    );
                })}
            </section>

            <nav className="faq-bottom-nav" aria-label="Bottom navigation">
                <div className="faq-nav-icon" aria-hidden="true">📅</div>
                <div className="faq-nav-icon" aria-hidden="true">✔</div>
            </nav>
        </div>
    );
}
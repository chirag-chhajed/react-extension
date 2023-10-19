import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

const faq = [
  {
    question: "What are the keyboard shortcuts?",
    answer:
      "Keyboard shortcuts are essential for efficient use of Swift Search. You can use Ctrl + Shift + 1 to access the command search for your sites and Ctrl + Shift + 2 to access the sites dashboard. These shortcuts help you navigate through the extension seamlessly.",
  },
  {
    question: "Why is it necessary to make an account?",
    answer:
      "Creating an account with Swift Search offers multiple advantages. It provides us with accurate user statistics, enables multi-browser support, and allows data synchronization across devices. Your account enhances your experience and makes it more convenient.",
  },
  {
    question: "Are there any limitations?",
    answer:
      "Every software has its limitations, and Swift Search is no exception. Due to certain content script restrictions, the command search functionality might not work on specific webpages like your new tab page and the Chrome tab pages. In such cases, you can utilize the extension popup to access your sites.",
  },
  {
    question: "Can I customize the keyboard shortcuts?",
    answer:
      'Yes, you can! In most cases, you can customize the keyboard shortcuts according to your preferences. Simply go to chrome://extensions or your browser&#39;s specific extension settings page. Look for the "keyboard shortcuts" section, and there you can personalize the shortcuts to better suit your needs.',
  },
];

const FAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <div className="flex flex-col gap-2">
        {faq.map((item, index) => (
          <AccordionItem
            className="px-2 rounded-md shadow-sm bg-card text-card-foreground shadow-primary"
            key={index}
            value={item.question}
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </Accordion>
  );
};

export default FAQ;

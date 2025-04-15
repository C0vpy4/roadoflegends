import React, { useState } from "react";
import { SameText, TitleText } from "../shared";

interface ProgrammProps {
  text: string;
  about: any[];
}

export const ProgrammElement = ({ text, about }: ProgrammProps) => {
  // State to track which items are expanded
  const [showFullList, setShowFullList] = useState(false);

  // Determine how many items to show initially (e.g., first 3 items)
  const initialItemsToShow = 2;
  const hasMoreItems = about.length > initialItemsToShow;

  // Get the items to display based on current state
  const displayedItems = showFullList
    ? about
    : about.slice(0, initialItemsToShow);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10">
      <TitleText text="Программа" className="mb-2 sm:mb-3 md:mb-4" />
      <SameText text={text} className="mb-6 sm:mb-8 md:mb-10" />

      <div className="space-y-3 sm:space-y-4">
        {displayedItems.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm p-4 sm:p-5 rounded-md shadow-sm"
          >
            <div className="text-white text-sm sm:text-base">
              {typeof item === "string" ? item : JSON.stringify(item)}
            </div>
          </div>
        ))}

        {hasMoreItems && (
          <button
            onClick={() => setShowFullList(!showFullList)}
            className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors duration-200 focus:outline-none w-full sm:w-auto"
          >
            {showFullList
              ? "Показать меньше"
              : `Показать все (${about.length})`}
          </button>
        )}
      </div>
    </div>
  );
};

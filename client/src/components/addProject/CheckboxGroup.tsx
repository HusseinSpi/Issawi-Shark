import React from "react";

interface CheckboxGroupProps {
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  categories,
  selectedCategories,
  handleCategoryChange,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      Categories
    </label>
    <div className="mt-1">
      {categories.map((category) => (
        <div className="flex items-center mb-2" key={category}>
          <input
            type="checkbox"
            id={category.toLowerCase()}
            name="categories"
            value={category}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            onChange={() => handleCategoryChange(category)}
            checked={selectedCategories.includes(category)}
          />
          <label
            htmlFor={category.toLowerCase()}
            className="ml-2 block text-sm text-gray-700"
          >
            {category}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default CheckboxGroup;

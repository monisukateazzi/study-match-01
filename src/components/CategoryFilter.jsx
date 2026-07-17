import React from 'react';

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ["All", "Focus", "Memory", "Productivity", "Understanding", "Exam Preparation"];

    return (
        <div className="filter-container">
              <label htmlFor="category-select" className="filter-label">Filter by Category:</label>
                    <select
                            id="category-select"
                                    value={selectedCategory}
                                            onChange={(e) => onCategoryChange(e.target.value)}
                                                    className="filter-select"
                                                          >
                                                                  {categories.map((category) => (
                                                                            <option key={category} value={category}>
                                                                                        {category}
                                                                                                  </option>
                                                                                                          ))}
                                                                                                                </select>
                                                                                                                    </div>
                                                                                                                      );
                                                                                                                      }
import React from 'react';
import styles from './styles/LeftSidebar.module.scss';
import { useNavigate } from 'react-router-dom'; 

function LeftSidebar({
  selectedCategory,
  onSelectCategory,
  sortOrder,
  onSortOrderChange,
  searchQuery,
  onSearchChange
}) {
  const categories = [
    "All Categories",
    "Tech & Programming",
    "Business & Finance",
    "Health & Fitness",
    "Travel & Adventure",
    "Lifestyle & Fashion",
    "Food & Cooking",
  ];
  
  const sortOptions = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
  ];

  return (
    <div className={styles.leftSidebar}>
     
      <div className={styles.searchBar}>
        <h3 className={styles.subtitle}>Search</h3>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.filterSection}>
        <h3 className={styles.subtitle}>Sort By</h3>
        <div className={styles.categorySelect}>
          <select
            name="sortOrder"
            value={sortOrder || "latest"}
            onChange={(e) => onSortOrderChange(e.target.value)}
            className={styles.sortInput}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
          
      <div className={styles.filterSection}>
        <h3 className={styles.subtitle}>Category</h3>
        <div className={styles.categorySelect}>
          <select
            name="Category"
            value={selectedCategory || ""}
            onChange={(e) =>
              onSelectCategory(e.target.value === "All Categories" ? null : e.target.value)
            }
            className={styles.categoryInput}
          >
            {categories.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;

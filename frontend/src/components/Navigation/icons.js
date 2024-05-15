import React, { useState } from "react";

const iconData = [
  { icon: <i className="fas fa-bed"></i>, label: 'Bed', tag: 'sleep' },
  { icon: <i className="fas fa-house-user"></i>, label: 'Home', tag: 'home' },
  { icon: <i className="fas fa-building"></i>, label: 'Building', tag: 'building' },
  { icon: <i className="fas fa-car"></i>, label: 'Car', tag: 'car' },
  { icon: <i className="fas fa-utensils"></i>, label: 'Utensils', tag: 'food' },
  { icon: <i className="fas fa-swimmer"></i>, label: 'Swimmer', tag: 'swim' },
  { icon: <i className="fas fa-hiking"></i>, label: 'Hiking', tag: 'outdoor' },
  { icon: <i className="fas fa-suitcase"></i>, label: 'Suitcase', tag: 'travel' },
  { icon: <i className="fas fa-dog"></i>, label: 'Dog', tag: 'pet' },
  { icon: <i className="fas fa-biking"></i>, label: 'Biking', tag: 'outdoor' },
  // Add more icons and tags as needed
];

export default function Icons() {
  const [selectedTag, setSelectedTag] = useState('');

  const handleIconClick = (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
  };

  const filteredIcons = selectedTag ? iconData.filter(item => item.tag === selectedTag) : iconData;

  return (
    <div className="icon-bar">
      <div className="icons">
        {iconData.map((item, index) => (
          <div className={`icon ${selectedTag === item.tag ? 'selected' : ''}`} key={index} onClick={() => handleIconClick(item.tag)}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="selected-tag">{selectedTag && `Selected Tag: ${selectedTag}`}</div>
    </div>
  );
}

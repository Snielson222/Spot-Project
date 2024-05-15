import React from "react";

const iconData = [
    { icon: <i className="fas fa-bed"></i>, label: 'Bed', tag: 'sleep' },
    { icon: <i class="fas fa-home"></i>, label: 'Home', tag: 'home' },
    { icon: <i className="fas fa-building"></i>, label: 'Building', tag: 'building' },
    { icon: <i className="fas fa-car"></i>, label: 'Car', tag: 'car' },
    { icon: <i className="fas fa-utensils"></i>, label: 'Utensils', tag: 'food' },
    { icon: <i className="fas fa-swimmer"></i>, label: 'Swimmer', tag: 'swim' },
    { icon: <i className="fas fa-hiking"></i>, label: 'Hiking', tag: 'outdoor' },
    { icon: <i className="fas fa-suitcase"></i>, label: 'Suitcase', tag: 'travel' },
    { icon: <i className="fas fa-dog"></i>, label: 'Dog', tag: 'pet' },
    { icon: <i class="fas fa-bicycle"></i>, label: 'Biking', tag: 'outdoor' },
    { icon: <i class="fas fa-umbrella-beach"></i>, label: 'Beach', tag: 'beach' },
    { icon: <i className="fas fa-mountain"></i>, label: 'Mountain', tag: 'mountain' },
    { icon: <i className="fas fa-camera"></i>, label: 'Photography', tag: 'photography' },
    { icon: <i className="fas fa-paw"></i>, label: 'Pet Friendly', tag: 'pet-friendly' },
    { icon: <i className="fas fa-cocktail"></i>, label: 'Cocktails', tag: 'cocktails' },
    { icon: <i class="fas fa-fish"></i>, label: 'Fishing', tag: 'fishing' },
    { icon: <i className="fas fa-fire"></i>, label: 'Campfire', tag: 'campfire' },
    { icon: <i className="fas fa-spa"></i>, label: 'Spa', tag: 'spa' },
    { icon: <i className="fas fa-golf-ball"></i>, label: 'Golf', tag: 'golf' },
    { icon: <i className="fas fa-music"></i>, label: 'Music', tag: 'music' },
];


const Icons = ({ filterSpotsByDescription }) => {
  const handleIconClick = (tag) => {
    filterSpotsByDescription(tag);
  };

  return (
    <div className="icon-bar">
      <div className="icons">
        {iconData.map((item, index) => (
          <div className="icon" key={index} onClick={() => handleIconClick(item.tag)}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Icons;

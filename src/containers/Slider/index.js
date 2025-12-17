import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer); // Nettoyer le minuteur précédent
  }, [index, byDateDesc]);

  const handleRadioChange = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={event.id}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="event cover" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{new Date(event.date).toLocaleString('default', { month: 'long' })}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
  <div className="SlideCard__pagination">
    {byDateDesc.map((event, radioIdx) => (
      <input
        key={event.id} 
        type="radio"
        name="radio-button"
        checked={index === radioIdx}
        onChange={() => handleRadioChange(radioIdx)}
      />
    ))}
  </div>
</div>
    </div>
  );
};

export default Slider;

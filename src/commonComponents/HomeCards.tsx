import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeCard.css'
import { text } from 'stream/consumers';

interface CardProps {
    cardData: {
        src: string;
        alt: string;
        categoryName:string;
        categoryId: string;
    }[],
    header:string
}

const HomeCards: React.FC<CardProps> = ({ cardData, header }) => {
    const rows = [];
    for (let i = 0; i < cardData.length; i += 2) {
        const row = cardData.slice(i, i + 2);
        rows.push(row);
    }
    return (
  
        <div className="card-container">
            <div style={{textAlign:'center',fontSize:'large'}}>{header}</div>
            <div className="card-grid">
                {rows.map((row, rowIndex) => (
                    <div className="card-row" key={rowIndex}>
                        {row.map((card, index) => (
                            <Link to={`/products/${card.categoryId}`} key={index} className="card-link">
                                <div className="card">
                                    <img src={card.src} alt={card.alt} className="card-image" />
                                    <span className="card-label">{card.alt}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeCards;

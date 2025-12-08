import React from 'react';
import { RecCards } from './RecCards';

export function MainPage({ onOpenDescriptionModal, onOpenAddToListModal }) {
    return (
        <main>
            <div className="header-container">
                <div className="image-row">
                    <img src="/img/study1.jpg" alt="indoor view of a library with cherry blossoms outside of the window" />
                    <img src="/img/study2.jpg" alt="indoor vieww of a public area in the PACCAR building" />
                    <img src="/img/theAve.jpeg" alt="a street view of an orange building with graffities on it" />
                </div>
                <div className="overlay-text">
                    <h1>Rate My Everything</h1>
                </div>
            </div>

            <div className="intro container">
                <p>
                    Come join the community where you get to share and rate everything around you! It could
                    be a spot you found on campus that you enjoy studying at or a favorite restaurant you have
                    near by campus. It could even be just a favourite snack you got from Trader Joes! On this 
                    webpage you can find a rating to literally everything! Come RATE YOUR EVERYTHING!
                </p>
            </div>

            <RecCards onOpenDescriptionModal={onOpenDescriptionModal} onOpenAddToListModal={onOpenAddToListModal} />
        </main>
    )
}
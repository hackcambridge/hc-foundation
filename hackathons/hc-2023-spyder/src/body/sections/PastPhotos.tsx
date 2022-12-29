import React from 'react';
import './PastPhotos.scss';
import AliceCarousel from 'react-alice-carousel';
import PastPhotoItem, { PastPhotoItemProps } from '../components/PastPhotoItem';
import Fade from 'react-reveal';

export type PastPhotosProps = {
    items: PastPhotoItemProps[]
};

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

export default function PastPhotos({items}: PastPhotosProps) {
    return (
        <div className="PastPhotos">
            <Fade left>
                <h1>Looking back</h1>
                <h2>on our past events</h2>
            </Fade>
            <Fade right>
            <AliceCarousel disableButtonsControls mouseTracking touchTracking items={items.map((item, i) => <PastPhotoItem key={i} {...item}/>)} responsive={responsive} controlsStrategy="alternate" />
            </Fade>
        </div>
    );
}

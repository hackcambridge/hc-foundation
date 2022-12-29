import React from 'react';
import './PastPhotoItem.scss';

export type PastPhotoItemProps = {
    photo: string;
    caption: string;
};

export default function PastPhotoItem({photo, caption}: PastPhotoItemProps) {
    return (
        <div className="PastPhotoItem" style={{backgroundImage: `url("${photo}")`}}>
            <div className="past-photo-item__hover">
                {caption}
            </div>
        </div>
    );
}

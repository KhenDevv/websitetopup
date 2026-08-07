import React, { useState } from 'react';
import { Star, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameCard = ({
    slug,
    title,
    image,
    discountPercent,
    rating = 0,
    reviewCount = 0,
    category,
}) => {
    const [imgError, setImgError] = useState(false);

    const hasImage = image && image.trim() !== '' && !imgError;

    return (
        <Link
            to={`/game/${slug || 'item'}`}
            className="group relative block bg-[#141A22] border border-[#232B36] hover:border-[#2E3844] rounded-xl overflow-hidden transition-all duration-150 ease-in-out hover:-translate-y-[2px] cursor-pointer shadow-sm"
        >
            {/* Aspect Ratio 4:5 Image Container */}
            <div className="relative w-full aspect-[4/5] bg-[#171D26] overflow-hidden flex items-center justify-center">
                {/* Optional Discount Badge */}
                {discountPercent && discountPercent > 0 ? (
                    <span className="absolute top-2 right-2 z-10 bg-[#14B8A6] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md">
                        -{discountPercent}%
                    </span>
                ) : null}

                {/* Render Image or Placeholder Fallback */}
                {hasImage ? (
                    <img
                        src={image}
                        alt={title}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    /* Placeholder Fallback (bg fill + centered game title) */
                    <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center bg-[#171D26] group-hover:bg-[#1B222C] transition-colors select-none">
                        <Gamepad2 className="w-8 h-8 text-[#6B7684] mb-2 opacity-60 group-hover:text-[#14B8A6] group-hover:opacity-100 transition-all" />
                        <span className="text-xs font-semibold text-[#6B7684] group-hover:text-[#9AA5B1] transition-colors line-clamp-2 px-1">
                            {title}
                        </span>
                    </div>
                )}
            </div>

            {/* Card Content Block */}
            <div className="p-2.5 space-y-1">
                {/* Title (Single line + ellipsis) */}
                <h3 className="text-xs md:text-sm font-semibold text-[#F5F7FA] truncate group-hover:text-[#14B8A6] transition-colors" title={title}>
                    {title}
                </h3>

                {/* Rating Row */}
                <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
                    <span className="text-[#9AA5B1] font-medium">{rating}</span>
                    <span className="text-[#6B7684]">({reviewCount})</span>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;

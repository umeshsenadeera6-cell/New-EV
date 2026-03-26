"use client";

import { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ReviewForm = ({ stationId, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return toast.error('Please select a rating');
        
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success('Thank you for your review!');
            setRating(0);
            setComment('');
            setLoading(false);
            if (onReviewSubmit) onReviewSubmit();
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-[24px] border border-gray-100">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Leave a Review</h4>
            
            <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="transition-transform hover:scale-125 focus:outline-none"
                    >
                        <Star 
                            className={`w-8 h-8 ${
                                (hover || rating) >= star 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-gray-300'
                            }`} 
                        />
                    </button>
                ))}
            </div>

            <div className="relative mb-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all min-h-[100px] text-sm"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-70"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                        <Send className="w-4 h-4" />
                        Submit Review
                    </>
                )}
            </button>
        </form>
    );
};

export default ReviewForm;

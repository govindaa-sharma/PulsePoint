import React, { useState } from 'react';
import { Star, Send, CheckCircle, MessageCircle, ThumbsUp, ThumbsDown, Heart, AlertTriangle } from 'lucide-react';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [mostHelpful, setMostHelpful] = useState('');
  const [improvements, setImprovements] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [recommendationRating, setRecommendationRating] = useState(0);

  const tiers = [
    'Tier 1: Absolute Fundamentals',
    'Tier 2: Common Medical Crises',
    'Tier 3: Environmental & Injury-Based',
    'Tier 4: Mental Health First Aid'
  ];

  const improvementOptions = [
    'More video content',
    'Interactive quizzes',
    'Mobile app',
    'Offline access',
    'More detailed illustrations',
    'Audio narration',
    'Progress tracking',
    'Certification options',
    'Community forums',
    'Expert Q&A section'
  ];

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoveredRating(value);
  };

  const handleImprovementChange = (improvement) => {
    setImprovements(prev => 
      prev.includes(improvement) 
        ? prev.filter(item => item !== improvement)
        : [...prev, improvement]
    );
  };

  const validateForm = () => {
    const errors = {};
    
    if (rating === 0) {
      errors.rating = 'Please provide a rating';
    }
    
    if (!feedback.trim()) {
      errors.feedback = 'Please provide feedback';
    }
    
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const getRatingText = (rating) => {
    const texts = {
      1: 'Poor - Needs significant improvement',
      2: 'Fair - Some improvements needed',
      3: 'Good - Generally helpful',
      4: 'Very Good - Quite helpful',
      5: 'Excellent - Extremely helpful'
    };
    return texts[rating] || 'Select a rating';
  };

  const StarRating = ({ value, onChange, onHover, error }) => (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            className={`text-3xl transition-colors ${
              star <= (hoveredRating || value)
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className={star <= (hoveredRating || value) ? 'fill-current' : ''} />
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600 text-center">
        {getRatingText(hoveredRating || value)}
      </p>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We truly appreciate you taking the time to help us improve our first aid training platform.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-700">
              Your rating: <span className="font-semibold">{rating}/5 stars</span>
            </p>
            {email && (
              <p className="text-sm text-green-700 mt-1">
                We'll send updates to: {email}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setRating(0);
              setFeedback('');
              setEmail('');
              setMostHelpful('');
              setImprovements([]);
              setRecommendationRating(0);
              setFormErrors({});
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Help Us Improve
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your feedback helps us create better life-saving training experiences. 
              Please share your thoughts about our First Aid Learning Platform.
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Overall Rating */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              How would you rate our platform overall?
            </h3>
            <StarRating 
              value={rating}
              onChange={handleRatingClick}
              onHover={handleRatingHover}
              error={formErrors.rating}
            />
          </div>

          {/* Most Helpful Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Which tier was most helpful to you?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tiers.map((tier) => (
                <label key={tier} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="mostHelpful"
                    value={tier}
                    checked={mostHelpful === tier}
                    onChange={(e) => setMostHelpful(e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-gray-700">{tier}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Recommendation Rating */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              How likely are you to recommend this platform to others?
            </h3>
            <div className="flex justify-center items-center space-x-4">
              <ThumbsDown className="h-6 w-6 text-red-400" />
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRecommendationRating(num)}
                    className={`w-10 h-10 rounded-full border-2 text-sm font-semibold transition-colors ${
                      recommendationRating === num
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <ThumbsUp className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-gray-500">
                {recommendationRating <= 6 ? 'Not likely' : recommendationRating <= 8 ? 'Somewhat likely' : 'Very likely'}
              </span>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Please share your detailed feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What did you like most? What could be improved? Any suggestions for new features or content?"
              className={`w-full p-4 border-2 rounded-lg resize-none h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                formErrors.feedback ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {formErrors.feedback && (
              <p className="text-red-500 text-sm mt-1">{formErrors.feedback}</p>
            )}
          </div>

          {/* Improvement Suggestions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What improvements would you like to see? (Select all that apply)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {improvementOptions.map((option) => (
                <label key={option} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={improvements.includes(option)}
                    onChange={() => handleImprovementChange(option)}
                    className="mr-3 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Email (Optional) */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Email (Optional - for updates and follow-up)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className={`w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                formErrors.email ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              We'll only use your email to send platform updates and respond to your feedback.
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center mx-auto space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">Our Commitment</h3>
          </div>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Your feedback directly influences our platform development. We review every submission 
            and use your insights to enhance our first aid training content and user experience. 
            Together, we're building a resource that saves lives.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2,847</div>
            <div className="text-gray-600">Feedback Submissions</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
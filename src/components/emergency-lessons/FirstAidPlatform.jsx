import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, AlertTriangle, Thermometer, Brain } from 'lucide-react';

const FirstAidPlatform = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const VideoEmbed = ({ videoId, title }) => (
    <div className="aspect-video w-full max-w-md mx-auto mb-4">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="w-full h-full rounded-lg border-2 border-gray-200"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );

  const SectionCard = ({ id, title, icon: Icon, color, children }) => {
    const isExpanded = expandedSections[id];
    
    return (
      <div className={`border-2 border-${color}-200 rounded-xl shadow-lg overflow-hidden mb-6`}>
        <button
          onClick={() => toggleSection(id)}
          className={`w-full p-6 bg-${color}-50 hover:bg-${color}-100 transition-colors flex items-center justify-between text-left`}
        >
          <div className="flex items-center space-x-4">
            <Icon className={`h-8 w-8 text-${color}-600`} />
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-gray-600" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-600" />
          )}
        </button>
        
        {isExpanded && (
          <div className="p-6 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

  const LessonItem = ({ title, content, videos }) => (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-lg font-semibold mb-4 text-gray-800">{title}</h4>
      <div className="prose prose-sm max-w-none mb-4">
        {content}
      </div>
      {videos && videos.length > 0 && (
        <div className="space-y-4">
          <h5 className="font-medium text-gray-700">Video Demonstrations:</h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <VideoEmbed key={index} videoId={video.id} title={video.title} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Emergency First Aid Training
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn life-saving skills with our comprehensive first aid training program. 
              Each lesson includes video demonstrations and step-by-step instructions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Tier 1: Absolute Fundamentals */}
        <SectionCard
          id="tier1"
          title="Tier 1: Absolute Fundamentals (The Must-Knows)"
          icon={Heart}
          color="red"
        >
          <p className="text-gray-600 mb-6 text-lg">
            These are the most common and critical emergencies where immediate action has the highest impact.
          </p>

          <LessonItem
            title="1. CPR & AED Use"
            content={
              <div>
                <p className="mb-3"><strong>Hands-Only CPR Steps:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Check responsiveness and breathing</li>
                  <li>Call 911 and get an AED if available</li>
                  <li>Place heel of hand on center of chest, between nipples</li>
                  <li>Push hard and fast at least 2 inches deep</li>
                  <li>Compress at 100-120 beats per minute</li>
                  <li>Allow complete chest recoil between compressions</li>
                </ul>
                <p className="mb-3"><strong>AED Use:</strong> Turn on, follow voice prompts, ensure no one touches patient during shock.</p>
                <p className="text-sm text-gray-600"><strong>Modified for children/infants:</strong> Use appropriate pad size, less compression depth.</p>
              </div>
            }
            videos={[
              { id: "6V7rYGh2Gl8", title: "Hands-Only CPR Training" },
              { id: "3SuQPCaXNLs", title: "How to Use an AED" }
            ]}
          />

          <LessonItem
            title="2. Choking Rescue (Heimlich Maneuver)"
            content={
              <div>
                <p className="mb-3"><strong>For Adults & Children:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Stand behind person, wrap arms around waist</li>
                  <li>Make a fist with one hand, place above navel</li>
                  <li>Cover with other hand, thrust inward and upward</li>
                  <li>Repeat until object is expelled</li>
                </ul>
                <p className="mb-3"><strong>For Infants:</strong> Hold face down on forearm, give 5 back blows, then 5 chest thrusts.</p>
                <p className="mb-3"><strong>If You're Choking Alone:</strong> Use chair back or counter edge to thrust into abdomen.</p>
              </div>
            }
            videos={[
              { id: "7CgtIgSyAiU", title: "Heimlich Maneuver Adults" },
              { id: "dfE9U-V9PzE", title: "Choking First Aid for Infants" }
            ]}
          />

          <LessonItem
            title="3. Severe Bleeding Control"
            content={
              <div>
                <p className="mb-3"><strong>Steps:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li><strong>Direct Pressure:</strong> Apply firm, continuous pressure with clean cloth</li>
                  <li><strong>Wound Packing:</strong> For deep wounds, pack gauze into wound, maintain pressure</li>
                  <li><strong>Tourniquet:</strong> Apply 2-3 inches above wound on extremities for life-threatening bleeding</li>
                </ul>
                <p className="text-sm text-red-600 font-medium">Myth Busted: Tourniquets are safe when properly applied - they save lives!</p>
              </div>
            }
            videos={[
              { id: "mpQqYu5O5gE", title: "Bleeding Control Techniques" },
              { id: "WLcKKA1CZQY", title: "How to Apply a Tourniquet" }
            ]}
          />

          <LessonItem
            title="4. Stroke Recognition (Act F.A.S.T.)"
            content={
              <div>
                <p className="mb-3"><strong>F.A.S.T. Signs:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-2">
                  <li><strong>Face:</strong> Drooping on one side, uneven smile</li>
                  <li><strong>Arms:</strong> Weakness or numbness, one arm drifts down</li>
                  <li><strong>Speech:</strong> Slurred, strange, or difficulty speaking</li>
                  <li><strong>Time:</strong> Call 911 immediately - every minute matters!</li>
                </ul>
                <p className="text-sm text-orange-600 font-medium">Time is brain tissue - rapid treatment can prevent permanent damage.</p>
              </div>
            }
            videos={[
              { id: "2L1gu66QWhA", title: "FAST Stroke Recognition" },
              { id: "BvBr5WxvjwY", title: "Stroke Signs and Symptoms" }
            ]}
          />

          <LessonItem
            title="5. Heart Attack Recognition"
            content={
              <div>
                <p className="mb-3"><strong>Common Symptoms:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Chest pain or pressure (may feel like squeezing)</li>
                  <li>Pain in arms, neck, jaw, or back</li>
                  <li>Shortness of breath</li>
                  <li>Nausea or vomiting</li>
                  <li>Cold sweat</li>
                  <li>Lightheadedness</li>
                </ul>
                <p className="text-sm text-pink-600 font-medium">Important: Women may experience different symptoms including unusual fatigue, nausea, and back pain.</p>
              </div>
            }
            videos={[
              { id: "54EHaWdLVhc", title: "Heart Attack Signs and Symptoms" },
              { id: "8sZJczSLVJo", title: "Heart Attack in Women" }
            ]}
          />
        </SectionCard>

        {/* Tier 2: Common Medical Crises */}
        <SectionCard
          id="tier2"
          title="Tier 2: Common Medical Crises"
          icon={AlertTriangle}
          color="orange"
        >
          <LessonItem
            title="1. Anaphylaxis (Severe Allergic Reaction)"
            content={
              <div>
                <p className="mb-3"><strong>Signs:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Swelling of face, lips, throat</li>
                  <li>Hives or widespread rash</li>
                  <li>Difficulty breathing or wheezing</li>
                  <li>Rapid, weak pulse</li>
                  <li>Dizziness or fainting</li>
                </ul>
                <p className="mb-3"><strong>EpiPen Use:</strong> Remove safety cap, inject into outer thigh, hold for 10 seconds.</p>
                <p className="text-sm text-red-600 font-medium">Always call 911 even after using epinephrine - symptoms can return!</p>
              </div>
            }
            videos={[
              { id: "I33DQX7BQp4", title: "How to Use an EpiPen" },
              { id: "nzfaUvEF-Zk", title: "Recognizing Anaphylaxis" }
            ]}
          />

          <LessonItem
            title="2. Seizure First Aid"
            content={
              <div>
                <p className="mb-3"><strong>Stay, Safe, Side Approach:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li><strong>Stay:</strong> Stay with the person</li>
                  <li><strong>Safe:</strong> Keep them safe from injury, cushion head</li>
                  <li><strong>Side:</strong> Turn them on their side when convulsions stop</li>
                </ul>
                <p className="mb-3"><strong>Never Do:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Don't restrain them</li>
                  <li>Don't put anything in their mouth</li>
                  <li>Don't give water or food</li>
                </ul>
                <p className="text-sm text-orange-600">Call 911 if seizure lasts over 5 minutes or person doesn't regain consciousness.</p>
              </div>
            }
            videos={[
              { id: "WRooJOgAKlA", title: "Seizure First Aid" },
              { id: "iFk4pD_ST8c", title: "What to Do During a Seizure" }
            ]}
          />

          <LessonItem
            title="3. Diabetic Emergencies"
            content={
              <div>
                <p className="mb-3"><strong>Low Blood Sugar (Hypoglycemia):</strong></p>
                <ul className="list-disc ml-6 mb-3 space-y-1">
                  <li>Symptoms: Shaky, confused, sweaty, irritable</li>
                  <li>Treatment: Give sugar if conscious (juice, candy, glucose tablets)</li>
                </ul>
                <p className="mb-3"><strong>High Blood Sugar (Hyperglycemia):</strong></p>
                <ul className="list-disc ml-6 mb-3 space-y-1">
                  <li>Symptoms: Very thirsty, drowsy, fruity breath</li>
                  <li>Treatment: Needs medical help, don't give sugar</li>
                </ul>
                <p className="text-sm text-blue-600">If person is unconscious, call 911 immediately - don't give anything by mouth.</p>
              </div>
            }
            videos={[
              { id: "iyJNAK8V1nI", title: "Diabetic Emergency First Aid" },
              { id: "WE5QgUGgZSk", title: "Low Blood Sugar Treatment" }
            ]}
          />

          <LessonItem
            title="4. Opioid Overdose Response"
            content={
              <div>
                <p className="mb-3"><strong>Signs of Overdose:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Unresponsive to voice or pain</li>
                  <li>Slow, shallow, or absent breathing</li>
                  <li>Blue lips or fingernails</li>
                  <li>Cold, clammy skin</li>
                </ul>
                <p className="mb-3"><strong>Naloxone (Narcan) Use:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Spray in one nostril or inject in muscle</li>
                  <li>Give rescue breaths if trained</li>
                  <li>Call 911 immediately</li>
                  <li>Be prepared to give second dose after 2-3 minutes</li>
                </ul>
              </div>
            }
            videos={[
              { id: "L8M4mMp6P7A", title: "How to Use Naloxone (Narcan)" },
              { id: "H-8mvS8uibs", title: "Opioid Overdose Response" }
            ]}
          />
        </SectionCard>

        {/* Tier 3: Environmental & Injury-Based */}
        <SectionCard
          id="tier3"
          title="Tier 3: Environmental & Injury-Based Emergencies"
          icon={Thermometer}
          color="green"
        >
          <LessonItem
            title="1. Burn Treatment"
            content={
              <div>
                <p className="mb-3"><strong>Burn Degrees:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li><strong>First-degree:</strong> Red skin, painful (sunburn-like)</li>
                  <li><strong>Second-degree:</strong> Blisters, very painful</li>
                  <li><strong>Third-degree:</strong> White/charred skin, may not be painful</li>
                </ul>
                <p className="mb-3"><strong>Treatment:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Cool with running water for 10-20 minutes</li>
                  <li>Remove jewelry before swelling</li>
                  <li>Cover with sterile gauze</li>
                </ul>
                <p className="text-sm text-red-600"><strong>Never use:</strong> Ice, butter, oils, or home remedies!</p>
              </div>
            }
            videos={[
              { id: "iZbXoNPZgAQ", title: "Burn First Aid Treatment" },
              { id: "D4TZ8R-jTmY", title: "Types of Burns and Treatment" }
            ]}
          />

          <LessonItem
            title="2. Sprains, Fractures, and Falls"
            content={
              <div>
                <p className="mb-3"><strong>R.I.C.E. Method for Sprains:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li><strong>Rest:</strong> Stop activity, avoid weight-bearing</li>
                  <li><strong>Ice:</strong> Apply for 15-20 minutes every 2-3 hours</li>
                  <li><strong>Compression:</strong> Wrap with elastic bandage (not too tight)</li>
                  <li><strong>Elevation:</strong> Raise injured area above heart level</li>
                </ul>
                <p className="mb-3"><strong>Fracture Signs:</strong> Deformity, severe pain, inability to move, numbness</p>
                <p className="text-sm text-green-600"><strong>Splinting:</strong> Use household items like magazines, towels, or boards to immobilize.</p>
              </div>
            }
            videos={[
              { id: "7hC9fAKEPbU", title: "RICE Method for Sprains" },
              { id: "QvkGjnOjCDY", title: "How to Make a Splint" }
            ]}
          />

          <LessonItem
            title="3. Heat Stroke & Exhaustion"
            content={
              <div>
                <p className="mb-3"><strong>Heat Exhaustion:</strong></p>
                <ul className="list-disc ml-6 mb-3 space-y-1">
                  <li>Cool, clammy skin</li>
                  <li>Heavy sweating</li>
                  <li>Weakness, dizziness</li>
                  <li>Treatment: Move to cool area, remove excess clothing, apply cool water</li>
                </ul>
                <p className="mb-3"><strong>Heat Stroke (EMERGENCY):</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Hot, dry skin (may not sweat)</li>
                  <li>High body temperature</li>
                  <li>Confusion, altered mental state</li>
                  <li>Treatment: Cool aggressively, call 911</li>
                </ul>
              </div>
            }
            videos={[
              { id: "0BKFoQoKUhk", title: "Heat Exhaustion vs Heat Stroke" },
              { id: "ZhyEt1WH_G4", title: "Treating Heat-Related Illness" }
            ]}
          />

          <LessonItem
            title="4. Hypothermia"
            content={
              <div>
                <p className="mb-3"><strong>Symptoms:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Shivering (may stop in severe cases)</li>
                  <li>Confusion, slurred speech</li>
                  <li>Drowsiness</li>
                  <li>Weak pulse</li>
                </ul>
                <p className="mb-3"><strong>Treatment:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Move to warm environment</li>
                  <li>Remove wet clothing</li>
                  <li>Wrap in dry blankets</li>
                  <li>Give warm, non-alcoholic drinks if conscious</li>
                </ul>
                <p className="text-sm text-blue-600">Rewarm gradually - avoid direct heat which can cause dangerous heart rhythms.</p>
              </div>
            }
            videos={[
              { id: "2Zqrm2F9Dg8", title: "Hypothermia Treatment" },
              { id: "OEWQ-Ui8x7Q", title: "Cold Weather Safety" }
            ]}
          />
        </SectionCard>

        {/* Tier 4: Mental Health First Aid */}
        <SectionCard
          id="tier4"
          title="Tier 4: Mental Health First Aid"
          icon={Brain}
          color="purple"
        >
          <p className="text-gray-600 mb-6 text-lg">
            A vital component for modern healthcare - supporting mental health emergencies with compassion and knowledge.
          </p>

          <LessonItem
            title="1. Suicide Prevention & Crisis Response"
            content={
              <div>
                <p className="mb-3"><strong>Warning Signs:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Talking about wanting to die or killing themselves</li>
                  <li>Feeling hopeless or having no purpose</li>
                  <li>Feeling trapped or in unbearable pain</li>
                  <li>Increased use of alcohol or drugs</li>
                  <li>Withdrawing from family and friends</li>
                </ul>
                <p className="mb-3"><strong>How to Help:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Ask directly: "Are you thinking about suicide?"</li>
                  <li>Listen without judgment</li>
                  <li>Don't promise to keep it secret</li>
                  <li>Help connect them to professional help</li>
                </ul>
                <div className="bg-purple-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-purple-800">Crisis Resources:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-purple-700">
                    <li>National Suicide Prevention Lifeline: 988</li>
                    <li>Crisis Text Line: Text HOME to 741741</li>
                    <li>Emergency: 911</li>
                  </ul>
                </div>
              </div>
            }
            videos={[
              { id: "c1DGHPVv1mY", title: "How to Help Someone in Crisis" },
              { id: "_RSmJo7v9Lw", title: "Warning Signs of Suicide" }
            ]}
          />

          <LessonItem
            title="2. Panic Attack Support"
            content={
              <div>
                <p className="mb-3"><strong>Panic Attack Signs:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Rapid heartbeat</li>
                  <li>Difficulty breathing</li>
                  <li>Sweating, trembling</li>
                  <li>Feeling of impending doom</li>
                  <li>Derealization (feeling detached)</li>
                </ul>
                <p className="mb-3"><strong>How to Help:</strong></p>
                <ul className="list-disc ml-6 mb-4 space-y-1">
                  <li>Stay calm and speak in a soothing voice</li>
                  <li>Help them focus on slow, deep breathing</li>
                  <li>Use grounding techniques (5-4-3-2-1: 5 things they see, 4 they hear, etc.)</li>
                  <li>Remind them it will pass</li>
                  <li>Don't minimize their experience</li>
                </ul>
                <p className="text-sm text-purple-600"><strong>Breathing technique:</strong> Breathe in for 4, hold for 4, out for 6.</p>
              </div>
            }
            videos={[
              { id: "cEJJ7Tgdhe4", title: "How to Help During Panic Attack" },
              { id: "Qz1RMdCQWpI", title: "Grounding Techniques for Anxiety" }
            ]}
          />
        </SectionCard>

        {/* Footer */}
        <div className="bg-gray-800 text-white rounded-xl p-8 mt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Remember: Call Emergency Services</h3>
            <p className="text-lg mb-4">
              When in doubt, always call <strong>911</strong> (US) or your local emergency number.
              These skills supplement, but don't replace, professional medical care.
            </p>
            <p className="text-sm text-gray-300">
              Regular training and certification through organizations like the American Red Cross 
              or American Heart Association is recommended for comprehensive first aid education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAidPlatform;
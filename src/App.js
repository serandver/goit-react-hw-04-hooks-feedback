import './App.css';
import React, { useState } from 'react';
import Statistics from './components/Statistics/Statistics';
import FEEDBACK_OPTIONS from './resources/options';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Section from './components/Section/Section';
import Notification from './components/Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  };

  const onLeaveFeedback = option => {
    switch (option) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
    }
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={FEEDBACK_OPTIONS}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      {countTotalFeedback() > 0 ? (
        <Section title="Statistic">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message="No feedback given" />
      )}
    </>
  );
}

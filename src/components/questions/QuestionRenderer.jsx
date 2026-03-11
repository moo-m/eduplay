// src/components/questions/QuestionRenderer.jsx
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import AudioQuestion from './AudioQuestion';

export default function QuestionRenderer({
  question,
  onAnswer,
  disabled = false,
  selectedOption = null,
  showCorrect = false,
  onAudioPlay,
  onAudioPause,
  onAudioEnded,
  onAudioTimeUpdate,
}) {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoiceQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedOption={selectedOption}
          showCorrect={showCorrect}
        />
      );
    case 'audio':
      return (
        <AudioQuestion
          question={question}
          onPlay={onAudioPlay}
          onPause={onAudioPause}
          onEnded={onAudioEnded}
          onTimeUpdate={onAudioTimeUpdate}
          disabled={disabled}
        />
      );
    default:
      return <div>نوع السؤال غير مدعوم</div>;
  }
}
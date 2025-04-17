'use client';

import { useState } from 'react';
import {  Lock, CheckCircle, PlayCircle } from 'lucide-react';

type Lesson = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
};

const lessons: Lesson[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Lesson ${i + 1}: Topic ${i + 1}`,
  description: `This is the description for Lesson ${i + 1}. Learn the essentials of Topic ${i + 1} in this lesson.`,
  videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
}));

export default function LessonsPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const markAsComplete = (id: number) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#00426D]">Your Lessons</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {lessons.map((lesson) => {
          const isUnlocked =
            lesson.id === 1 || completedLessons.includes(lesson.id - 1);
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              className={`rounded-lg p-5 shadow-md border transition-all ${
                isUnlocked
                  ? 'bg-white hover:shadow-lg'
                  : 'bg-gray-100 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#2C2C2C]">
                  {lesson.title}
                </h2>
                {isCompleted ? (
                  <CheckCircle className="text-green-500 w-6 h-6" />
                ) : isUnlocked ? (
                  <PlayCircle className="text-blue-600 w-6 h-6" />
                ) : (
                  <Lock className="text-gray-400 w-6 h-6" />
                )}
              </div>

              <p className="text-gray-700 mb-4">{lesson.description}</p>

              {isUnlocked && !isCompleted && (
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={lesson.videoUrl}
                    title={`Lesson ${lesson.id} Video`}
                    allowFullScreen
                    className="w-full h-full rounded-md"
                  />
                </div>
              )}

              {isUnlocked && !isCompleted && (
                <button
                  onClick={() => markAsComplete(lesson.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Mark as Complete
                </button>
              )}

              {isCompleted && (
                <p className="text-green-600 font-medium">Lesson completed</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

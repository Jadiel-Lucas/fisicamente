import { redirect } from "next/navigation";

import { getLesson, getUserProgress } from "@/db/queries";
import { Quiz } from "../quiz";

export default async function LessonIdPage(
  props: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await props.params; // <- await aqui

  const lessonIdNumber = Number(lessonId);

  const [lesson, userProgress] = await Promise.all([
    getLesson(lessonIdNumber),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((c) => c.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      // userSubscription={null}
    />
  );
}

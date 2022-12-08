import { supabase } from "../supabase.js";

export const getQuestions = async () => {
  const { data } = await supabase.from("data").select(`
    questions:question_id (question),
    segments:segment_id (segment_type, segment_description),
    answers:answer_id (answer),
    count,
    percentage
  `);

  return data.map((elem) => {
    return {
      question: elem.questions.question,
      segmentType: elem.segments.segment_type,
      segmentDescription: elem.segments.segment_description,
      answer: elem.answers.answer,
      count: elem.count,
      percentage: elem.percentage,
    };
  });
};

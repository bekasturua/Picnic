import { supabase } from "./parse.js";

export const sendData = async (results) => {
  for (const data of results) {
    const questionId = await sendQuestion(data["Question"]);
    const segmentId = await sendSegment(
      data["Segment Type"],
      data["Segment Description"]
    );
    const answerId = await sendAnswer(data["Answer"]);
    await sendMainData(
      questionId,
      segmentId,
      answerId,
      data["Count"],
      data["Percentage"]
    );
  }
};

const sendQuestion = async (question) => {
  const { data } = await supabase
    .from("questions")
    .select()
    .eq("question", question);

  if (data.length === 0) {
    const { data, error } = await supabase
      .from("questions")
      .insert({ question: question })
      .select();

    return data[0].id;
  }

  return data[0].id;
};

const sendSegment = async (segmentType, segmentDescription) => {
  const { data } = await supabase.from("segments").select().match({
    segment_type: segmentType,
    segment_description: segmentDescription,
  });

  if (data.length === 0) {
    const { data, error } = await supabase
      .from("segments")
      .insert({
        segment_type: segmentType,
        segment_description: segmentDescription,
      })
      .select();

    return data[0].id;
  }

  return data[0].id;
};

const sendAnswer = async (answer) => {
  const { data } = await supabase.from("answers").select().eq("answer", answer);

  if (data.length === 0) {
    const { data, error } = await supabase
      .from("answers")
      .insert({ answer: answer })
      .select();

    return data[0].id;
  }

  return data[0].id;
};

const sendMainData = async (
  questionId,
  segmentId,
  answerId,
  count,
  percentage
) => {
  const { error } = await supabase.from("data").insert({
    question_id: questionId,
    segment_id: segmentId,
    answer_id: answerId,
    count,
    percentage,
  });
};

'use server';

import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import { connectToDatabase } from '../mongoose';

export async function createQuestion(data: any) {
  try {
    // connect to DB
    connectToDatabase();

    // eslint-disable-next-line
    const { title, content, tags, author, path } = data;

    // create a new question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag =
        (await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
          { $setOnInsert: { name: tag }, $push: { question: question._id } },
          { upsert: true, new: true }
        )) || null;
      tagDocuments.push(existingTag);
    }

    // update the question with the tags
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action
    // increment author's reputation by 5 for asking a question

    return question;
  } catch (error) {}
}

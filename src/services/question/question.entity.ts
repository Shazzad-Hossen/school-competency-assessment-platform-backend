import { Request, Response } from 'express';
import { ConfigureContext } from '../../utils/types/configure-context';
import Question from './question.schema';

const createAllowed = new Set(['competency', 'level', 'questionText', 'options', 'correctOptionIndex']);

export const createQuestion = () => async (req: Request, res: Response) => {
  try {
    // Validate that only allowed fields are sent
    const isValid = Object.keys(req.body).every(key => createAllowed.has(key));
    if (!isValid) return res.status(400).send('Invalid body properties');

    const { competency, level, questionText, options, correctOptionIndex } = req.body;

    // Basic field validations
    if (
      !competency ||
      !level ||
      !questionText ||
      !Array.isArray(options) ||
      options.length < 2 ||
      typeof correctOptionIndex !== 'number' ||
      correctOptionIndex < 0 ||
      correctOptionIndex >= options.length
    ) {
      return res.status(400).send('Invalid question data');
    }

    // Create and save the question
    const question = await Question.create({
      competency,
      level,
      questionText,
      options,
      correctOptionIndex,
    });

    res.status(201).send({ message: 'Question created successfully', data: question });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).send('Internal server error');
  }
};




export const getQuestions = () => async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Use paginate method from mongoose-paginate-v2
    const result = await Question.paginate({}, { page, limit, lean: true, sort: { createdAt: -1 } });

    // result contains docs, totalDocs, limit, totalPages, page, etc.
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal server error');
  }
};


export const getAssessmentQuestions = () => async (req: Request, res: Response) => {
  const step = req.query.step as string;
  if (!['1', '2', '3'].includes(step))
    return res.status(400).json({ message: 'Invalid step parameter' });

  const levelMap: Record<string, string[]> = {
    '1': ['A1', 'A2'],
    '2': ['B1', 'B2'],
    '3': ['C1', 'C2'],
  };

  try {
    const questions = await Question.find({ level: { $in: levelMap[step] } });
    res.status(200).json({ data: questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getQuestion = () => async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if(!id) return res.status(400).send('Bad request');
    const question = await Question.findById(id);
    if(!question) return res.status(404).send('Invalid question Id');
    res.status(200).send(question);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal server error');
  }
};


export const updateQuestion = ()=> async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('Bad request');
    const question = await Question.findByIdAndUpdate(id, req.body, { new: true });
    if (!question) return res.status(404).send('Invalid question Id');
    res.status(200).send(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).send('Internal server error');
  }
};


export const deleteQuestion = () => async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('Bad request');

    const deleted = await Question.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send('Question not found');

    res.status(200).send({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).send('Internal server error');
  }
};

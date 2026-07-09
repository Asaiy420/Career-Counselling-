import type { Request, Response } from 'express';
import Career from '../models/career.model';

export const searchCareers = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { q, category, sort, page = '1', limit = '12' } = req.query;

    const filter: Record<string, unknown> = { isActive: true };

    if (q && typeof q === 'string' && q.trim()) {
      filter.$text = { $search: q };
    }

    if (category && typeof category === 'string' && category.trim()) {
      filter.category = category;
    }

    let sortOption: Record<string, 1 | -1> = { title: 1 };
    if (sort === 'salary_high') {
      sortOption = { averageSalary: -1 };
    } else if (sort === 'salary_low') {
      sortOption = { averageSalary: 1 };
    } else if (sort === 'name_desc') {
      sortOption = { title: -1 };
    } else if (sort === 'relevance' && q && typeof q === 'string' && q.trim()) {
      sortOption = { score: { $meta: 'textScore' } };
    }

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    let query = Career.find(filter);

    if (q && typeof q === 'string' && q.trim() && sort === 'relevance') {
      query = Career.find(
        { ...filter, $text: { $search: q } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } });
    } else {
      query = Career.find(filter).sort(sortOption);
    }

    const [careers, total] = await Promise.all([
      query.skip(skip).limit(limitNum).lean(),
      Career.countDocuments(filter),
    ]);

    return res.status(200).json({
      careers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSuggestions = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string' || !q.trim()) {
      return res.status(200).json({ suggestions: [] });
    }

    const careers = await Career.find(
      { isActive: true, title: { $regex: q.trim(), $options: 'i' } },
      { title: 1, category: 1, _id: 1 }
    )
      .sort({ title: 1 })
      .limit(8)
      .lean();

    return res.status(200).json({ suggestions: careers });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCategories = async (
  _req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const categories = await Career.distinct('category', { isActive: true });
    return res.status(200).json({ categories });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCareerById = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { id } = req.params;

    const career = await Career.findOne({ _id: id, isActive: true }).lean();

    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    return res.status(200).json({ career });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
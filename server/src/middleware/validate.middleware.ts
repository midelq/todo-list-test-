import { Request, Response, NextFunction } from 'express';

type ValidationRule = {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
};

export const validateBody = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const rule of rules) {
      const value = req.body[rule.field];

      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      if (value && typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(`${rule.field} must be at least ${rule.minLength} characters`);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(`${rule.field} must not exceed ${rule.maxLength} characters`);
        }
        if (rule.isEmail) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(`${rule.field} must be a valid email`);
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation error', errors });
    }

    next();
  };
};
